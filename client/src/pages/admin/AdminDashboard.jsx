import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '0', image: '' });

  const loadData = async () => {
    const [productsData, usersData, ordersData] = await Promise.all([api.getProducts(), api.getUsers(), api.getOrders()]);
    setProducts(productsData);
    setUsers(usersData);
    setOrders(ordersData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    await api.createProduct({ ...form, price: Number(form.price), stock: Number(form.stock) });
    setForm({ name: '', description: '', price: '', category: '', stock: '0', image: '' });
    loadData();
  };

  const handleDeleteProduct = async (id) => {
    await api.deleteProduct(id);
    loadData();
  };

  return (
    <div className="min-h-screen bg-[#0B0712] p-8 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin control center</h1>
          <p className="mt-2 text-sm text-gray-400">Manage users, products, and orders from one professional dashboard.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6">
            <p className="text-sm text-gray-400">Products</p>
            <p className="mt-2 text-3xl font-bold">{products.length}</p>
          </div>
          <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6">
            <p className="text-sm text-gray-400">Users</p>
            <p className="mt-2 text-3xl font-bold">{users.length}</p>
          </div>
          <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6">
            <p className="text-sm text-gray-400">Orders</p>
            <p className="mt-2 text-3xl font-bold">{orders.length}</p>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6">
            <h2 className="text-xl font-semibold">Create product</h2>
            <form onSubmit={handleCreate} className="mt-4 grid gap-3">
              <input className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <textarea className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              <input className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              <input className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
              <input className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2" placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
              <input className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              <button className="rounded-lg bg-[#7C3AED] px-4 py-2 font-semibold">Publish product</button>
            </form>
          </div>

          <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6">
            <h2 className="text-xl font-semibold">Recent orders</h2>
            <div className="mt-4 space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="rounded-xl border border-[#2A233A] bg-[#110D1A] p-3">
                  <p className="font-semibold">{order.first_name} {order.last_name}</p>
                  <p className="text-sm text-gray-400">{order.email}</p>
                  <p className="mt-2 text-sm">Order #{order.id} · KSh {Number(order.total).toLocaleString()} · {order.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6">
          <h2 className="text-xl font-semibold">Inventory</h2>
          <div className="mt-4 space-y-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-xl border border-[#2A233A] bg-[#110D1A] p-3">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-400">{product.category} · stock {product.stock}</p>
                </div>
                <button onClick={() => handleDeleteProduct(product.id)} className="rounded-lg bg-[#EF4444] px-3 py-2 text-sm">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
