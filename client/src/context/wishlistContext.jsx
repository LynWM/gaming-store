import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { api } from "../services/api";
import { useAuth } from "./authContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    api.getWishlist(user.id).then((data) => {
      setItems((data || []).map((item) => ({ ...item, id: item.product_id, wishlistId: item.wishlist_id })));
    }).catch(() => {});
  }, [user?.id]);

  const toggleWishlist = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        if (user?.id) {
          const target = prev.find((item) => item.id === product.id);
          if (target?.wishlistId) {
            api.removeFromWishlist(user.id, target.wishlistId).catch(() => {});
          }
        }
        return prev.filter((item) => item.id !== product.id);
      }
      if (user?.id) {
        api.addToWishlist(user.id, { product_id: product.id }).catch(() => {});
      }
      return [...prev, { ...product, wishlistId: Date.now() }];
    });
  }, [user?.id]);

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