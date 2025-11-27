import React, { useState, useEffect } from "react";
import { apiClient } from "@/services/api";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await apiClient.orders.list();
      setOrders(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <button
              onClick={loadOrders}
              className="bg-genzmart-blue text-white px-4 py-2 rounded"
            >
              Refresh
            </button>
          </div>
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">ID</th>
                  <th className="border p-2 text-left">User ID</th>
                  <th className="border p-2 text-left">Status</th>
                  <th className="border p-2 text-left">Total</th>
                  <th className="border p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o: any) => (
                  <tr key={o.id}>
                    <td className="border p-2">{o.id}</td>
                    <td className="border p-2">{o.user_id}</td>
                    <td className="border p-2">{o.status}</td>
                    <td className="border p-2">₹{o.total}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => apiClient.orders.delete(o.id).then(loadOrders)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;

