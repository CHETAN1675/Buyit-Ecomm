import { Container, Navbar,Nav} from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ()=>{
    return(
<Navbar bg="light" expand="lg">
    <Container >
        <Navbar.Brand>BuyIt.com</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
        <Nav className="ms-auto">
             <Nav.Link  as={Link} to="/">Home</Nav.Link>
             <Nav.Link as={Link} to="/products">Products</Nav.Link>
             <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
             <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
             <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
    );
}
export default Header;