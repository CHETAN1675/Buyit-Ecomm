import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart, clearCart } from "../Store/cartSlice";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { placeOrder } from "../Services/orderService";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector(state => state.cart);
  const user  = useSelector(state => state.auth.user);

  const total = items.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const handleOrder = async () => {
     if (!user) return;
    try {
       setLoading(true);
      await placeOrder(user.uid, items, total);
      dispatch(clearCart());
      navigate("/orders");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Something went wrong while placing order");
    }finally {
    setLoading(false);
  };

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
      
      
      <Button
       className="ms-2"
       variant="success"
       disabled={!user}   // button is disabled if user is not logged in
       onClick= {handleOrder}
>
  Place Order
</Button>
 {!user && <p className="mt-2 text-danger">{loading ? "Placing order..." : "Place Order"}</p>}
  </>
  )}
    </Container>
  );
};
}
export default Cart;
