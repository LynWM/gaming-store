import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext";
import { WishlistProvider } from "./context/wishlistContext";

import CustomerLayout from "./layouts/customerLayout";
import AdminLayout from "./layouts/adminLayout";

import Homepage from './pages/customer/HomePage'
import CategoryPage from './pages/customer/CategoryPage'

import Signup from './layouts/signup'
import Login from './layouts/login'

import CartPage from './pages/customer/CartPage'
import WishlistPage from './pages/customer/WishlistPage'
import FlashDealsPage from './pages/customer/FlashDealPage'
import ProductDetailPage from './pages/customer/ProductDetailPage'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import SearchResultsPage from "./pages/customer/SearchResultsPage";
import CustomerOrdersPage from "./pages/customer/CustomerOrdersPage";
import CheckoutPage from "./pages/customer/CheckoutPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            
              <Routes>
             
                {/* Customer pages */}
                <Route element={<CustomerLayout />}>
                  <Route path="/" element={< Homepage />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/flash-deals" element={<FlashDealsPage />} />
                  <Route path="/products/:productId" element={<ProductDetailPage />} />
                  <Route path="/:slug" element={<CategoryPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/orders" element={<CustomerOrdersPage/>}/>
                  <Route path="/checkout" element={<CheckoutPage />}/>
                </Route>

                {/* Admin pages */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="orders" element={<AdminOrders />} />
                </Route>
              </Routes>
            
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter> 
  );
}

export default App;