import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart, clearCart } from "../Store/cartSlice";
import { Offcanvas, Button, Form, Image } from "react-bootstrap";
import { placeOrder } from "../Services/orderService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Cart = ({ show, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector(state => state.cart);
  const user = useSelector(state => state.auth.user);

  const total = items.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const handleOrder = async () => {
    if (!user) {
      alert("Please login to place an order.");
      return;
    }
    try {
      setLoading(true);
      await placeOrder(user.uid, items, total);
      dispatch(clearCart());
      navigate("/orders");
      handleClose();
    } catch {
      alert("Something went wrong while placing order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {items.length === 0 && <p>Your cart is empty.</p>}

        {items.map(item => (
          <div key={item.id} className="d-flex align-items-center border-bottom pb-2 mb-2">
            <Image src={item.image} alt={item.title} width="60" height="60" rounded />

            <div className="ms-3 flex-grow-1">
              <h6 className="m-0">{item.title}</h6>
              <small className="text-muted">₹{item.price}</small>
              <Form.Control
                className="mt-1"
                type="number"
                min="1"
                value={item.quantity}
                onChange={e =>
                  dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                }
              />
            </div>

            <div className="text-end">
              <b>₹{item.price * item.quantity}</b>
              <br />
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                X
              </Button>
            </div>
          </div>
        ))}

        {items.length > 0 && (
          <>
            <h5 className="mt-3">Total: ₹{total}</h5>

            {!showPayment ? (
              <>
                <Button variant="danger" onClick={() => dispatch(clearCart())}>
                  Clear Cart
                </Button>

                <Button
                  className="ms-2"
                  variant="success"
                  disabled={!user}
                  onClick={() => setShowPayment(true)}
                >
                  Proceed to Payment
                </Button>

                {!user && <p className="mt-2 text-danger">Please login to place an order.</p>}
              </>
            ) : (
              <div className="mt-3 p-3 border rounded">
                <h6>Payment Method</h6>
                <Form.Check
                  type="radio"
                  label="Cash on Delivery"
                  checked
                  readOnly
                />
                <div className="d-flex gap-2 mt-3">
                <Button
                  variant="success"
                  disabled={loading}
                  onClick={handleOrder}
                >
                  {loading ? "Placing order..." : "Confirm Order (COD)"}
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => setShowPayment(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
