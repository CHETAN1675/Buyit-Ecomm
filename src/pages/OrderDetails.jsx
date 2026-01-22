import { getOrderById } from "../Services/orderService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { cancelOrder } from "../Services/orderService";

const OrderDetails = () => {
  const { user } = useSelector(state => state.auth);
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (user) {
      getOrderById(user.uid, id).then(setOrder);
    }
  }, [user, id]);

  const handleCancel = async () => {
  if (!window.confirm("Are you sure you want to cancel this order?")) return;

  try {
    await cancelOrder(user.uid, id);
    setOrder({ ...order, status: "Cancelled" });
    alert("Order cancelled successfully.");
  } catch (err) {
    alert("Failed to cancel order.");
  }
};

    if (!order) return <Container className="mt-4"><p>Loading order details...</p></Container>;

  return (
    <Container className="mt-4">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {id}</p>
      <p><strong>Total: ₹{order.total}</strong></p>
      <p><strong>Date:</strong>{order.date?.toDate? order.date.toDate().toLocaleString():new Date(order.date).toLocaleString()}</p>

      <h3 className="mt-4">Items:</h3>
      
        {order.items.map((item, index) => (
           <Card key={index} className="p-3 mb-2">
          <div className="d-flex align-items-center">
            <img src={item.image} alt={item.name} width={60} className="me-3" />
            <div>
              <p><strong>{item.name}</strong></p>
              <p>Qty: {item.quantity}</p>
              <p>Price per item: ₹{item.price}</p>
              <p>Subtotal: ₹{item.price * item.quantity}</p>
            </div>
            {order.status === "Pending" || order.status === "Processing" ? (
         <button className="btn btn-danger ms-auto mt-3" onClick={handleCancel}>
           Cancel Order
         </button>
          ) : null}

          </div>
        </Card>
        ))}
    </Container>
  );
};

export default OrderDetails;
