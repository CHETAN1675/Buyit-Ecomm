import { useEffect, useState } from "react";
import { getUserOrders } from "../Services/orderService";
import { useSelector } from "react-redux";
import { Container, Table } from "react-bootstrap";

const Orders = () => {
  const user = useSelector(state => state.auth.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      getUserOrders(user.uid).then(setOrders);
    }
  }, [user]);

  return (
    <Container className="mt-4">
      <h3>Your Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total</th>
              <th>Items</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>₹{order.total}</td>
                <td>{order.items.length}</td>
                <td>{order.status}</td>
                <td>{new Date(order.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Orders;
