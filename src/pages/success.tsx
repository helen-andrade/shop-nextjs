import { GetServerSideProps } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface Product {
  name: string;
  imageUrl: string;
}

interface SuccessProps {
  customerName: string;
  products: Product[];
}

export default function Success({ customerName, products }: SuccessProps) {
  const items = products || [];

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <div style={{ display: "flex", gap: "1rem" }}>
          {items.map((product) => (
            <ImageContainer key={product.name}>
              <Image
                src={product.imageUrl}
                width={120}
                height={110}
                alt={product.name}
              />
            </ImageContainer>
          ))}
        </div>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{" "}
          <strong>{items.length} camisetas</strong> já está a caminho da sua
          casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = query.session_id as string | undefined;

  if (!sessionId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name ?? "Cliente";

  const products =
    session.line_items?.data.map(
      (item) => item.price?.product as Stripe.Product
    ) || [];

  const formattedProducts = products.map((product) => ({
    name: product.name,
    imageUrl: product.images[0],
  }));

  return {
    props: {
      customerName,
      products: formattedProducts,
    },
  };
};
