import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../Components/ProtectedRoute";
import PublicRoute from "../Components/PublicRoute";

// Lazy page imports
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const Cart = lazy(() => import("../pages/Cart"));
const Profile = lazy(() => import("../pages/Profile"));
const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const OrderDetails = lazy(() => import("../pages/OrderDetails"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const About = lazy(() => import("../pages/About"));
const ProductDetails = lazy(()=>import("../pages/ProductDetails"));
const MyOrder = lazy(()=>import("../pages/MyOrder"));

const PageRoutes = () => {
  return (
   <Suspense fallback={<div className="loader-container"><div className="spinner"></div></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />

        {/* public */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

        {/* protected */}
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/myorders" element={<ProtectedRoute><MyOrder/></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        

      </Routes>
    </Suspense>
  );
};

export default PageRoutes;
