import { createContext, ReactNode, useContext, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  defaultPriceId: string;
}

interface CartContextData {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(item: CartItem) {
    setCartItems((state) => [...state, item]);
  }

  function removeFromCart(id: string) {
    setCartItems((state) => state.filter((item) => item.id !== id));
  }

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
