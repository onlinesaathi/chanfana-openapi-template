import React, { useState, useEffect } from "react";
import { apiClient } from "@/services/api";

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await apiClient.users.list();
      setUsers(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <button
              onClick={loadUsers}
              className="bg-genzmart-blue text-white px-4 py-2 rounded"
            >
              Refresh
            </button>
          </div>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">ID</th>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left">Admin</th>
                  <th className="border p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u: any) => (
                  <tr key={u.id}>
                    <td className="border p-2">{u.id}</td>
                    <td className="border p-2">{u.name}</td>
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2">{u.is_admin ? "Yes" : "No"}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => apiClient.users.delete(u.id).then(loadUsers)}
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

export default Users;

