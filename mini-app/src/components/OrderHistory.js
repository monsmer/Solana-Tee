import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Mock API call for order history
    const fetchOrders = async () => {
      // Replace with actual API call later
      const mockOrders = [
        { id: 1, type: 'Market', quantity: 1, price: 100, timestamp: new Date() },
        { id: 2, type: 'Limit', quantity: 2, price: 105, timestamp: new Date() },
      ];
      setOrders(mockOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.type}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>{order.timestamp.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;