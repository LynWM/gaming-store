import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext";
import { WishlistProvider } from "./context/wishlistContext";

import CustomerLayout from "./layouts/customerLayout";
import AdminLayout from "./layouts/adminLayout";

import Homepage from './pages/customer/homepage'
import CategoryPage from './pages/customer/CategoryPage'
import SearchResults from './pages/customer/SearchResults'
import Signup from './layouts/signup'
import Login from './layouts/login'
import CartPage from './pages/customer/CartPage'
import WishlistPage from './pages/customer/WishlistPage'


function App() {
  return (
    <AuthProvider>
       <BrowserRouter>
          <Routes>
            
            {/* Customer pages */}
            <Route element={<CustomerLayout />}>
              <Route path="/" element={< Homepage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/:slug" element={<CategoryPage />} />
            </Route>
      <CartProvider>
        <WishlistProvider>
        <BrowserRouter>
           <Routes>
             
             {/* Customer pages */}
             <Route element={<CustomerLayout />}>
               <Route path="/" element={< Homepage />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/login" element={<Login />} />
               <Route path="/:slug" element={<CategoryPage />} />
               <Route path="/cart" element={<CartPage />} />
               <Route path="/wishlist" element={<WishlistPage />} />
             </Route>

           {/* Admin pages */}
           <Route path="/admin" element={<AdminLayout />}>
           </Route>
         </Routes>
       </BrowserRouter>
       </WishlistProvider>
      </CartProvider>
    </AuthProvider>
   
  );
}

export default App;