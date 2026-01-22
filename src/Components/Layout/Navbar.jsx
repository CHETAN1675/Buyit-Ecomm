import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { FaHeart , FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import Cart from "../../pages/Cart";
import logo from "../../../assests/logo.png";

import "./Navbar.css";

const Header = () => {
  const { user, logout } = useAuth();
  const { items } = useSelector(state => state.cart);
  const { items: wishlistItems } = useSelector(state => state.wishlist);
  const [showCart, setShowCart] = useState(false);


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-between">
          
          {/* Left Side Navigation */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ color: "white" }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ color: "white" }}>About</Nav.Link>
            <Nav.Link as={Link} to="/products" style={{ color: "white" }}>Products</Nav.Link>
          </Nav>

          {/* Centered Brand Name */}
        <Navbar.Brand
         as={Link}
         to="/"
         className="mx-auto d-flex align-items-center gap-2"
         style={{ color: "white", flex: 1, justifyContent: "center" }}
        >
         <img
           src={logo}
           alt="BuyIt Logo"
           height="40"
           className="d-inline-block align-top"
        />
          <span>BuyIt.com</span>
        </Navbar.Brand>


          {/* Right Side Navigation */}
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/wishlist" style={{ color: "white" }}>
                  <FaHeart color="red" style={{ marginRight: "5px" }} />
                  Wishlist ({wishlistItems.length})
                </Nav.Link>
                <Nav.Link className="nav-cart" onClick={() => setShowCart(true)}>
                <FaShoppingCart className="cart-icon" />
               {items.length > 0 && <span className="cart-badge">{items.length}</span>}
                </Nav.Link>
                 <Nav.Link as={Link} to="/myorders" style={{ color: "white" }}>
                 My Orders
               </Nav.Link>
                <Nav.Link as={Link} to="/profile" style={{ color: "white" }}>Profile</Nav.Link>
                <Nav.Link onClick={logout} style={{ color: "white" }}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: "white" }}>Login</Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ color: "white" }}>Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Cart show={showCart} handleClose={() => setShowCart(false)} />
    </Navbar>
    
  );
};

export default Header;
