import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const CartButton = styled("button", {
  background: "none",
  border: "none",
  cursor: "pointer",
  position: "relative",

  "& .badge": {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#00B37E",
    color: "#fff",
    borderRadius: "50%",
    padding: "4px 6px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  "&:hover .badge": {
    backgroundColor: "#00e191",
  },
});

export const Modal = styled("div", {
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  width: 450,
  backgroundColor: "#202024",
  color: "#fff",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  zIndex: 1000,
  boxShadow: "-8px 0 24px rgba(0,0,0,0.3)",
  overflowY: "auto",
  gap: "0.75rem",

  "& .close-btn": {
    alignSelf: "flex-end",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "color 0.2s ease",
  },

  "& h2": {
    margin: "0.5rem 0 1rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },

  "& .product": {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "1rem",
    width: "100%",
    padding: "0.5rem 0",

    "& .product-image": {
      flexShrink: 0,
      width: "70px",
      height: "70px",
      borderRadius: "8px",
      padding: "0.25rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",

      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "6px",
      },
    },

    "& .product-text": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: "0.5rem",
      flex: 1,

      "& .product-name": {
        fontSize: "1.1rem",
      },

      "& .product-price": {
        fontWeight: 700,
        fontSize: "1.1rem",
      },

      "& .remove-btn": {
        background: "none",
        border: "none",
        fontWeight: 700,
        color: "#00875F",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "color 0.2s ease",
        "&:hover": { color: "#00B37E" },
      },
    },
  },

  "& .cart-summary-wrapper": {
    marginTop: "auto",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
    width: "100%",

    "& .cart-summary": {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "1.2rem",
      fontWeight: 400,
      margin: 0,
    },

    "& .quantity-label, & .quantity-value": {
      fontSize: "0.9rem",
    },
  },

  "& .checkout-btn": {
    marginTop: "2rem",
    backgroundColor: "#00875F",
    color: "#fff",
    border: "none",
    padding: "0.75rem",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "1rem",
    transition: "background 0.2s ease, filter 0.2s ease",
    "&:hover": { backgroundColor: "#00B37E" },
    "&:active": { filter: "brightness(0.95)" },
  },
});
