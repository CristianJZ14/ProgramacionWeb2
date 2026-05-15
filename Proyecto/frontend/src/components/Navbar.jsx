import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-700">Dashboard Bicitaxis</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">
          {user.name} <span className="text-xs text-blue-500 ml-1">({user.role})</span>
        </span>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
