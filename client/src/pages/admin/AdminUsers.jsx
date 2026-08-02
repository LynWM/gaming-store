import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const loadData = async () => {
    const data = await api.getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRoleChange = async (id, role) => {
    await api.updateUser(id, { role });
    loadData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await api.deleteUser(id);
    loadData();
  };

  return (
    <div className="min-h-screen bg-[#0B0712] p-8 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="mt-2 text-sm text-gray-400">Manage roles and remove accounts.</p>
        </div>

        <div className="rounded-2xl border border-[#231C30] bg-[#1B1625] p-6">
          <h2 className="text-xl font-semibold">All users ({users.length})</h2>
          <div className="mt-4 space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between rounded-xl border border-[#2A233A] bg-[#110D1A] p-3">
                <div>
                  <p className="font-semibold">{user.first_name} {user.last_name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="rounded-lg border border-[#2A233A] bg-[#110D1A] px-3 py-2 text-sm"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button onClick={() => handleDelete(user.id)} className="rounded-lg bg-[#EF4444] px-3 py-2 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}