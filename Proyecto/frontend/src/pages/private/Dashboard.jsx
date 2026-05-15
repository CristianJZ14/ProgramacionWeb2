import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api.js';

const statusColors = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-600',
  maintenance: 'bg-yellow-100 text-yellow-700',
};
const statusLabels = { active: 'Activos', inactive: 'Inactivos', maintenance: 'En Mantenimiento' };
const overallColors = {
  approved: 'text-green-600',
  conditional: 'text-yellow-600',
  rejected: 'text-red-600',
};
const overallLabels = { approved: 'Aprobado', conditional: 'Condicional', rejected: 'Rechazado' };

export default function Dashboard() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [latestCheckups, setLatestCheckups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vRes, cRes] = await Promise.all([
          api.get('/vehicles'),
          api.get('/checkups/latest'),
        ]);
        setVehicles(vRes.data);
        setLatestCheckups(cRes.data);
      } catch {
        // handled by interceptor
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusCounts = vehicles.reduce((acc, v) => {
    acc[v.status] = (acc[v.status] || 0) + 1;
    return acc;
  }, {});

  if (loading) return <div className="flex items-center justify-center h-full text-gray-500">Cargando...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Vehículos" value={vehicles.length} color="blue" icon="🚲" />
        <StatCard label="Activos" value={statusCounts.active || 0} color="green" icon="✅" />
        <StatCard label="Inactivos" value={statusCounts.inactive || 0} color="gray" icon="⏸️" />
        <StatCard label="Mantenimiento" value={statusCounts.maintenance || 0} color="yellow" icon="🔧" />
      </div>

      {/* Status breakdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Vehículos por Estado</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(statusCounts).map(([status, count]) => (
            <span key={status} className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[status] || 'bg-gray-100'}`}>
              {statusLabels[status] || status}: {count}
            </span>
          ))}
          {Object.keys(statusCounts).length === 0 && (
            <p className="text-gray-400 text-sm">No hay datos</p>
          )}
        </div>
      </div>

      {/* Latest checkups */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Últimas 5 Revisiones</h3>
        {latestCheckups.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay revisiones registradas</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 font-medium">Placa</th>
                  <th className="pb-2 font-medium">Modelo</th>
                  <th className="pb-2 font-medium">Inspector</th>
                  <th className="pb-2 font-medium">Fecha</th>
                  <th className="pb-2 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {latestCheckups.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/vehicles/${c.vehicle_id}`)}
                    className="border-b last:border-0 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-2.5 font-medium text-blue-600">{c.plate}</td>
                    <td className="py-2.5 text-gray-600">{c.model}</td>
                    <td className="py-2.5 text-gray-600">{c.inspector_name || '—'}</td>
                    <td className="py-2.5 text-gray-500">{new Date(c.check_date).toLocaleDateString('es-MX')}</td>
                    <td className={`py-2.5 font-medium ${overallColors[c.overall_status] || 'text-gray-600'}`}>
                      {overallLabels[c.overall_status] || c.overall_status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon }) {
  const colorMap = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    gray: 'bg-gray-50 border-gray-200 text-gray-600',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  };
  return (
    <div className={`rounded-lg border p-5 ${colorMap[color]}`}>
      <p className="text-sm font-medium opacity-70">{label}</p>
      <div className="flex items-end justify-between mt-2">
        <p className="text-3xl font-bold">{value}</p>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
