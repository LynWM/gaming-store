import { Link } from 'react-router-dom';

export default function AdminTopBar() {
  return (
    <header className="border-b border-[#231C30] bg-[#110D1A] px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A855F7]">Operations</p>
          <h1 className="text-lg font-semibold text-white">Professional control panel</h1>
        </div>
        <Link to="/" className="rounded-full bg-[#7C3AED] px-4 py-2 text-sm font-semibold text-white">Back to shop</Link>
      </div>
    </header>
  );
}
