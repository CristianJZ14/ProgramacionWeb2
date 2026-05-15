import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api.js';

const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-600',
  maintenance: 'bg-yellow-100 text-yellow-700',
};
const STATUS_LABELS = { active: 'Activo', inactive: 'Inactivo', maintenance: 'Mantenimiento' };
const OVERALL_LABELS = { approved: 'Aprobado', conditional: 'Condicional', rejected: 'Rechazado' };
const OVERALL_COLORS = { approved: 'text-green-600', conditional: 'text-yellow-600', rejected: 'text-red-600' };

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [checkups, setCheckups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vRes, cRes] = await Promise.all([
          api.get(`/vehicles/${id}`),
          api.get(`/checkups/vehicle/${id}`),
        ]);
        setVehicle(vRes.data);
        setCheckups(cRes.data);
      } catch {
        navigate('/vehicles');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) return <div className="flex items-center justify-center h-full text-gray-500">Cargando...</div>;
  if (!vehicle) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/vehicles')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          ← Volver
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Detalle: {vehicle.plate}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-3">
          <h3 className="font-semibold text-gray-700 mb-2">Información del Vehículo</h3>
          <InfoRow label="Placa" value={vehicle.plate} />
          <InfoRow label="Marca" value={vehicle.brand} />
          <InfoRow label="Modelo" value={vehicle.model} />
          <InfoRow label="Año" value={vehicle.year} />
          <InfoRow label="Color" value={vehicle.color} />
          <div className="flex justify-between items-center py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Estado</span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[vehicle.status] || 'bg-gray-100'}`}>
              {STATUS_LABELS[vehicle.status] || vehicle.status}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 space-y-3">
          <h3 className="font-semibold text-gray-700 mb-2">Propietario</h3>
          <InfoRow label="Nombre" value={vehicle.owner_name} />
          <InfoRow label="Teléfono" value={vehicle.owner_phone} />
          <InfoRow label="Registrado" value={new Date(vehicle.created_at).toLocaleDateString('es-MX')} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-700">Historial de Revisiones</h3>
          <button onClick={() => navigate('/checkup')} className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
            + Nueva Revisión
          </button>
        </div>
        {checkups.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">Sin revisiones registradas</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-500 text-left border-b">
                <tr>
                  {['Fecha', 'Frenos', 'Luces', 'Llantas', 'Estructura', 'Estado', 'Inspector', 'Notas'].map((h) => (
                    <th key={h} className="pb-2 font-medium pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {checkups.map((c) => (
                  <tr key={c.id} className="border-b last:border-0">
                    <td className="py-2.5 pr-4 text-gray-600">{new Date(c.check_date).toLocaleDateString('es-MX')}</td>
                    <td className="py-2.5 pr-4">{c.brakes}</td>
                    <td className="py-2.5 pr-4">{c.lights}</td>
                    <td className="py-2.5 pr-4">{c.tires}</td>
                    <td className="py-2.5 pr-4">{c.frame}</td>
                    <td className={`py-2.5 pr-4 font-medium ${OVERALL_COLORS[c.overall_status] || ''}`}>
                      {OVERALL_LABELS[c.overall_status] || c.overall_status}
                    </td>
                    <td className="py-2.5 pr-4 text-gray-600">{c.inspector_name || '—'}</td>
                    <td className="py-2.5 text-gray-500 max-w-xs truncate">{c.notes || '—'}</td>
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

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-gray-100">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-700">{value || '—'}</span>
    </div>
  );
}
