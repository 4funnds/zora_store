import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("zora-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("zora-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...currentCart, product];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => !(item.id === productId && item.selectedSize === size)
      )
    );
  };

  const updateQuantity = (productId, size, newQuantity) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId && item.selectedSize === size
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};