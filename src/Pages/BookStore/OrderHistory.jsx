import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [customerId, setCustomerId] = useState('');

  

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/history/${customerId}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    if (customerId) {
      fetchOrderHistory();
    }
  }, [customerId]);

  return (
    <div>
      <h2>Order History</h2>
      {orders.map(order => (
        <div key={order._id}>
          <h3>Order ID: {order._id}</h3>
          <p>Subtotal: ${order.subtotal}</p>
          <p>Total: ${order.total}</p>
          <p>Payment Status: {order.payment_status}</p>
          <p>Delivery Status: {order.delivery_status}</p>
          <ul>
            {order.items.map(item => (
              <li key={item._id}>
                {item.itemId.title} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
