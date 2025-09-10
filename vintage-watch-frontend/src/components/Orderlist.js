import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/orders"; // đổi port nếu backend bạn chạy khác

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/all`)
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch orders");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id} - Customer: {order.customer_id} - Amount: {order.amount} - Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;