import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/vehicles', label: 'Vehículos', icon: '🚲' },
  { to: '/checkup', label: 'Revisión', icon: '🔧' },
];

export default function Sidebar() {
  return (
    <aside className="w-56 bg-blue-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-blue-700">
        <span className="text-xl font-bold tracking-wide">🚲 Bicitaxi</span>
      </div>
      <nav className="flex-1 py-4">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-900 text-white border-r-4 border-blue-300'
                  : 'text-blue-200 hover:bg-blue-700 hover:text-white'
              }`
            }
          >
            <span>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 text-xs text-blue-400 border-t border-blue-700">
        v1.0.0
      </div>
    </aside>
  );
}
