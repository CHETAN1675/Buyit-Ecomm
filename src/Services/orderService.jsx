const DB_URL = "https://buyite-comm-default-rtdb.firebaseio.com";

export const placeOrder = async (uid, items, total) => {
  const order = {
    items,
    total,
    createdAt: new Date().toISOString()
  };

  const res = await fetch(`${DB_URL}/orders/${uid}.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  return res.json(); 
};

export const fetchOrders = async (uid) => {
  const res = await fetch(`${DB_URL}/orders/${uid}.json`);
  const data = await res.json();
  if (!data) return [];

  return Object.entries(data).map(([id, order]) => ({
    id,
    ...order
  }));
};

export const getUserOrders = async (uid) => {
  const res = await fetch(`${DB_URL}/orders/${uid}.json`);
  const data = await res.json();

  if (!data) return [];

  return Object.entries(data).map(([id, order]) => ({
    id,               // Firebase order ID
    items: order.items,
    total: order.total,
    status: order.status || "Pending",
    date: order.createdAt
  }));
};


export const getOrderById = async (userId, orderId) => {
  const url = `https://buyite-comm-default-rtdb.firebaseio.com/orders/${userId}/${orderId}.json`;

  const res = await fetch(url);
  const data = await res.json();

  return data ? data : null;
};

export const cancelOrder = async (userId, orderId) => {
  const url = `https://buyite-comm-default-rtdb.firebaseio.com/orders/${userId}/${orderId}/status.json`;

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify("Cancelled")
    });

    return await res.json();
  } catch (err) {
    console.error("Failed to cancel order:", err);
    throw err;
  }
};

