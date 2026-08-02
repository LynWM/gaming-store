import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const toggleWishlist = useCallback((product) => {
    if (!user?.id) {
      navigate('/login', { state: { message: 'Please log in to save items to your wishlist' } });
      return;
    }
    setItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  }, [user, navigate]);

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