import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";




const Header = () => {
  const { user, logout } = useAuth();
  const { items } = useSelector(state => state.cart);
  const { items: wishlistItems } = useSelector(state => state.wishlist);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">BuyIt.com</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/wishlist">
                <FaHeart color="red" style={{ marginRight: "5px" }} />
                 Wishlist ({wishlistItems.length})
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">Cart({items.length})</Nav.Link>
                <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
