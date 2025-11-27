import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Header from './Components/Layout/Navbar';

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
        </Routes>
 </BrowserRouter>
    )

}

export default App;
