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

function App() {
    return(
        <BrowserRouter>
         <Header/>
        <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
 </BrowserRouter>
    )

}

export default App;
