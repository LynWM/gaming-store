const API_BASE = 'http://127.0.0.1:5000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Request failed');
  }
  return payload;
}

export const api = {
  health: () => request('/health'),
  signup: (data) => request('/api/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  forgotPassword: (data) => request('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify(data) }),
  resetPassword: (data) => request('/api/auth/reset-password', { method: 'POST', body: JSON.stringify(data) }),
  getProducts: (params) => {
    const query = new URLSearchParams();
    if (typeof params === 'string'){
      if (params) query.set('category', params);
    } else if (params && typeof params === 'object') {
      if (params.category) query.set('category', params.category)
      if (params.search) query.set('search', params.search);
    }
    const qs = query.toString();
    return request(qs ? `/api/products?${qs}` : '/api/products');
  },
  getProduct: (id) => request(`/api/products/${id}`),
  getCategories: () => request('/api/categories'),
  getDeals: () => request('/api/deals'),
  createProduct: (data) => request('/api/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id, data) => request(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id) => request(`/api/products/${id}`, { method: 'DELETE' }),
  getUsers: () => request('/api/users'),
  updateUser: (id, data) => request(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteUser: (id) => request(`/api/users/${id}`, { method: 'DELETE' }),
  getCart: (userId) => request(`/api/cart/${userId}`),
  addToCart: (userId, data) => request(`/api/cart/${userId}`, { method: 'POST', body: JSON.stringify(data) }),
  removeFromCart: (userId, cartId) => request(`/api/cart/${userId}/${cartId}`, { method: 'DELETE' }),
  getOrders: (userId) => request(userId ? `/api/orders?user_id=${userId}` : '/api/orders'),
  createOrder: (data) => request('/api/orders', { method: 'POST', body: JSON.stringify(data) }),
  updateOrderStatus: (id, data) => request(`/api/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};
