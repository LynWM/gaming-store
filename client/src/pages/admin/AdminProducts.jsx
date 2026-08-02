import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const EMPTY_FORM = { name: '', description: '', price: '', category: '', stock: '0', image: '' };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const loadData = async () => {
    const [productsData, categoriesData] = await Promise.all([api.getProducts(), api.getCategories()]);
    setProducts(productsData);
    setCategories(categoriesData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    try {
      if (editingId) {
        await api.updateProduct(editingId, payload);
      } else {
        await api.createProduct(payload);
      }
      resetForm();
      loadData();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: String(product.price ?? ''),
      category: product.category || '',
      stock: String(product.stock ?? '0'),
      image: product.image || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await api.deleteProduct(id);
    if (editingId === id) resetForm();
    loadData();
  };

  return (
    <div className="min-h-screen bg-[#0B0712] p-8 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="mt-2 text-sm text-gray-400">Create, edit, and remove products from the catalog.</p>
        </div>

        <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6">
          <h2 className="text-xl font-semibold">{editingId ? 'Edit product' : 'Create product'}</h2>
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
            <input className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <select className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
              <option value="" disabled>Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug || cat.name}>{cat.name}</option>
              ))}
            </select>
            <textarea className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2 md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <input className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <input className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2" placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
            <input className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2 md:col-span-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <div className="flex gap-3 md:col-span-2">
              <button className="rounded-lg bg-[#7C3AED] px-4 py-2 font-semibold">{editingId ? 'Save changes' : 'Publish product'}</button>
              {editingId && (
                <button type="button" onClick={resetForm} className="rounded-lg border border-[#2A233A] px-4 py-2 font-semibold">Cancel</button>
              )}
            </div>
          </form>
        </div>

        <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6">
          <h2 className="text-xl font-semibold">Inventory ({products.length})</h2>
          <div className="mt-4 space-y-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-xl border border-[#2A233A] bg-[#110D1A] p-3">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-400">{product.category} · stock {product.stock} · KSh {Number(product.price).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(product)} className="rounded-lg bg-[#2A233A] px-3 py-2 text-sm">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="rounded-lg bg-[#EF4444] px-3 py-2 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}