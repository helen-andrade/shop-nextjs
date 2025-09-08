import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

import logoImg from "../assets/logo.svg";
import bagHeader from "../assets/bagHeader.svg";
import remove from "../assets/remove.svg";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";

import { Container, Header, CartButton, Modal } from "../styles/pages/app";
import { useCart, CartProvider } from "../contexts/CartContext";

globalStyles();

function InnerApp({ Component, pageProps }: AppProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart, totalItems, totalPrice } = useCart();

  const handleOpenCartModal = () => setIsCartOpen(true);
  const handleCloseCartModal = () => setIsCartOpen(false);

  async function handleCheckout() {
    try {
      const response = await axios.post("/api/checkout", {
        items: cartItems.map((item) => ({
          price: item.defaultPriceId,
          quantity: 1,
        })),
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch {
      alert("Falha ao redirecionar para o checkout!");
    }
  }

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="Logo" />
        <CartButton onClick={handleOpenCartModal}>
          <Image src={bagHeader} alt="Carrinho" />
          {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </CartButton>
      </Header>

      <Component {...pageProps} />

      {isCartOpen && (
        <Modal>
          <button className="close-btn" onClick={handleCloseCartModal}>
            <Image src={remove} alt="Fechar" />
          </button>
          <h2>Sacola de compras</h2>

          {cartItems.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div className="product" key={item.id}>
                  <div className="product-image">
                    <Image
                      src={item.imageUrl}
                      width={101.94}
                      height={93}
                      alt={item.name}
                    />
                  </div>
                  <div className="product-text">
                    <p className="product-name">{item.name}</p>
                    <p className="product-price">
                      {item.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-summary-wrapper">
                <div className="cart-summary">
                  <span className="quantity-label">Quantidade</span>
                  <span className="quantity-value">
                    {totalItems} {totalItems === 1 ? "item" : "itens"}
                  </span>
                </div>

                <div className="cart-summary">
                  <span className="summary-label">Valor total</span>
                  <span className="summary-value">
                    {totalPrice.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>

                <button className="checkout-btn" onClick={handleCheckout}>
                  Finalizar Compra
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </Container>
  );
}

export default function MyApp(props: AppProps) {
  return (
    <CartProvider>
      <InnerApp {...props} />
    </CartProvider>
  );
}
