import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { api } from "../services/api";
import { useAuth } from "./authContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    api.getCart(user.id).then((data) => {
      setItems((data || []).map((item) => ({ ...item, id: item.product_id, cartId: item.cart_id })));
    }).catch(() => {});
  }, [user?.id]);

  const syncWithServer = useCallback(async (nextItems) => {
    if (!user?.id) return;
    const payload = nextItems.map((item) => ({ product_id: item.id, quantity: item.quantity }));
    try {
      await api.addToCart(user.id, { product_id: payload[0]?.product_id, quantity: payload[0]?.quantity || 1 });
    } catch {
      // ignore sync failures and keep UI responsive
    }
  }, [user?.id]);

  const addToCart = useCallback((product) => {
    setItems((prev) => {
      const next = prev.some((item) => item.id === product.id)
        ? prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { ...product, quantity: 1 }];
      syncWithServer(next);
      return next;
    });
  }, [syncWithServer]);

  const removeFromCart = useCallback(async (productId) => {
    const target = items.find((item) => item.id === productId);
    if (user?.id && target?.cartId) {
      await api.removeFromCart(user.id, target.cartId);
    }
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, [items, user?.id]);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);