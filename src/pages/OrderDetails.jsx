import { getOrderById } from "../Services/orderService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderDetails = () => {
  const { user } = useSelector(state => state.auth);
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (user) {
      getOrderById(user.uid, id).then(setOrder);
    }
  }, [user, id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Details</h2>
      <p>Total: ₹{order.total}</p>
      <p>Date: {new Date(order.date).toLocaleString()}</p>
      <h3>Items:</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} x {item.quantity} — ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
