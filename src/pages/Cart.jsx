import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart, clearCart } from "../Store/cartSlice";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);

  const total = items.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <Container className="mt-4">
      <h3>Shopping Cart</h3>

      {items.length === 0 && <p>Your cart is empty.</p>}

      {items.map(item => (
        <Row key={item.id} className="border p-2 mb-2 align-items-center">
          <Col md={4}>{item.name}</Col>
          <Col md={2}>₹{item.price}</Col>
          <Col md={3}>
            <Form.Control
              type="number"
              min="1"
              value={item.quantity}
              onChange={e =>
                dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
              }
            />
          </Col>
          <Col md={2}>₹{item.price * item.quantity}</Col>
          <Col md={1}>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              X
            </Button>
          </Col>
        </Row>
      ))}

      {items.length > 0 && (
        <>
          <h4>Total: ₹{total}</h4>
          <Button variant="danger" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
