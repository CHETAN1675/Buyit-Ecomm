import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { toggleWishlist } from "../Store/wishlistSlice";
import { addToCart } from "../Store/cartSlice";

const Wishlist = () => {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <Container className="mt-4">
      <h3>Your Wishlist</h3>

      <Row className="mt-3">
        {items.length === 0 && <p>No items in wishlist</p>}

        {items.map((product) => (
          <Col md={3} key={product.id} className="mb-3">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>₹{product.price}</Card.Text>

                <Button
                  variant="dark"
                  className="me-2"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outline-danger"
                  onClick={() => dispatch(toggleWishlist(product))}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Wishlist;
