import { createContext, useContext, useState, useCallback } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  const toggleWishlist = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId) => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  const totalItems = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        totalItems,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);