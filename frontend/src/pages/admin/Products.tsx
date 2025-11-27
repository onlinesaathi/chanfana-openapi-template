import React, { useState, useEffect } from "react";
import { apiClient } from "@/services/api";

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await apiClient.products.list();
      setProducts(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await apiClient.products.create({
        name: formData.name,
        description: formData.description || undefined,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image_url: formData.image_url || undefined,
      });
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        image_url: "",
      });
      setShowForm(false);
      await loadProducts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Products</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-genzmart-blue text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded mb-6 border">
          <h3 className="text-lg font-bold mb-4">Add New Product</h3>
          <form onSubmit={handleAddProduct}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                className="border rounded px-3 py-2"
              />
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mt-4"
              rows={3}
            ></textarea>
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="mb-4">
            <button
              onClick={loadProducts}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Refresh
            </button>
          </div>
          {products.length === 0 ? (
            <p className="text-gray-500">No products found. Add your first product!</p>
          ) : (
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">ID</th>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-left">Price</th>
                  <th className="border p-2 text-left">Stock</th>
                  <th className="border p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p: any) => (
                  <tr key={p.id}>
                    <td className="border p-2">{p.id}</td>
                    <td className="border p-2">{p.name}</td>
                    <td className="border p-2 max-w-xs truncate">
                      {p.description || "-"}
                    </td>
                    <td className="border p-2">₹{p.price}</td>
                    <td className="border p-2">{p.stock}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => apiClient.products.delete(p.id).then(loadProducts)}
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

export default Products;

