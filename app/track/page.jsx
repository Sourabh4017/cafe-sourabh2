// const cancelOrder = async (orderId) => {
//   if (!confirm("Cancel this order?")) return;

//   const res = await fetch(`/api/orders/cancel/${orderId}`, {
//     method: "PATCH",
//   });

//   if (!res.ok) {
//     alert("Order cannot be cancelled now");
//     return;
//   }

//   fetchOrder(); // refresh
// };


"use client";

import { useState } from "react";

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");

  const fetchOrder = async () => {
    if (!orderId) return;

    // Example fetch logic
    const res = await fetch(`/api/orders/${orderId}`);
    if (!res.ok) {
      alert("Order not found");
      return;
    }

    const data = await res.json();
    console.log("Order:", data);
  };

  const cancelOrder = async (id) => {
    if (!confirm("Cancel this order?")) return;

    const res = await fetch(`/api/orders/cancel/${id}`, {
      method: "PATCH",
    });

    if (!res.ok) {
      alert("Order cannot be cancelled now");
      return;
    }

    alert("Order cancelled");
    fetchOrder(); // refresh order
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Track Order</h1>

      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={fetchOrder}>Track Order</button>

        {orderId && (
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => cancelOrder(orderId)}
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}
