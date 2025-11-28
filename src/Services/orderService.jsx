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
