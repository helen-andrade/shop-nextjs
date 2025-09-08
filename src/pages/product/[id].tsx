import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { useCart } from "../../contexts/CartContext";
import { ImageContainer, ProductContainer, ProductDetails } from "../product";

interface ProductData {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  defaultPriceId: string;
}

interface ProductProps {
  product: ProductData | null;
}

export default function Product({ product }: ProductProps) {
  const { addToCart } = useCart();

  if (!product) return <p>Produto não encontrado.</p>;

  function handleAddToCart() {
    if (product) {
      addToCart(product);
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt={product.name}
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>

          <p>{product.description}</p>

          <button onClick={handleAddToCart}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 10,
  });

  const paths = products.data.map((product) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<ProductProps> = async ({
  params,
}) => {
  if (!params?.id || typeof params.id !== "string")
    return { props: { product: null } };

  try {
    const product = await stripe.products.retrieve(params.id, {
      expand: ["default_price"],
    });
    const price = product.default_price as Stripe.Price;

    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: (price.unit_amount || 0) / 100,
          description: product.description || "",
          defaultPriceId: price.id,
        },
      },
      revalidate: 3600,
    };
  } catch {
    return { props: { product: null } };
  }
};
