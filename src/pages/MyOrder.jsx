import { useEffect, useState } from "react";
import { Container, Card, Badge, Image, Spinner } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { getUserOrders } from "../Services/orderService";
import { useNavigate } from "react-router-dom";
import "./MyOrder.css";

const MyOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    loadOrders();
  }, [user]);

  async function loadOrders() {
    setLoading(true);
    const res = await getUserOrders(user.uid);
    setOrders(res);
    setLoading(false);
  }

  const badgeColor = (status) => {
    switch (status) {
      case "Pending": return "warning";
      case "Processing": return "info";
      case "Shipped": return "primary";
      case "Delivered": return "success";
      case "Cancelled": return "danger";
      default: return "secondary";
    }
  };

  return (
    <Container fluid className="mt-4 px-4 myorder-container">
      <h3 className="mb-4">Track Your Order Status</h3>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
          <p className="mt-2">Fetching orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <Card
            key={order.id}
            className="myorder-card shadow"
            onClick={() => navigate(`/orders/${order.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="myorder-order-content">
              <Image src={order.items?.[0]?.image} className="myorder-image" />
              <div className="myorder-details">
                <p><span className="myorder-label">Quantity:</span> {order.items?.length}</p>
                <p>
                  <span className="myorder-label">Status:</span>
                  <Badge bg={badgeColor(order.status)} className="ms-2">
                    {order.status}
                  </Badge>
                </p>
                <p><span className="myorder-label">Total:</span> ₹{order.total}</p>
                <p><span className="myorder-label">Order ID:</span> {order.id}</p>
                <p><span className="myorder-label">Placed On:</span> {order.date ? new Date(order.date).toLocaleString() : "Not available"}</p>
              </div>
            </div>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MyOrder;
