// API Base URL
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8787";

export const apiClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  },

  // Auth endpoints
  auth: {
    register: (data: any) =>
      apiClient.request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
    login: (data: any) =>
      apiClient.request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  },

  // Admin Products
  products: {
    list: () => apiClient.request("/admin/products"),
    create: (data: any) =>
      apiClient.request("/admin/products", { method: "POST", body: JSON.stringify(data) }),
    update: (id: number, data: any) =>
      apiClient.request(`/admin/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    delete: (id: number) =>
      apiClient.request(`/admin/products/${id}`, { method: "DELETE" }),
  },

  // Admin Orders
  orders: {
    list: () => apiClient.request("/admin/orders"),
    delete: (id: number) =>
      apiClient.request(`/admin/orders/${id}`, { method: "DELETE" }),
  },

  // Admin Users
  users: {
    list: () => apiClient.request("/admin/users"),
    delete: (id: number) =>
      apiClient.request(`/admin/users/${id}`, { method: "DELETE" }),
  },

  // Payments
  payments: {
    razorpay: {
      createOrder: (data: { amount: number; currency?: string; receipt?: string }) =>
        apiClient.request("/payments/razorpay/create-order", { method: "POST", body: JSON.stringify(data) }),
      verify: (data: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
        apiClient.request("/payments/razorpay/verify", { method: "POST", body: JSON.stringify(data) }),
    },
  },
};
