import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Header from './Components/Layout/Navbar';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import Addresses from './pages/Addresses';


function App() {
    return(
        <BrowserRouter>
         <Header/>
        <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/products' element={<Products/>}/>
          {/* separate route for logged out user  */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
         <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
         <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        {/* for logged in users only */}
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>}/>
        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    )

}

export default App;
