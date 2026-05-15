import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api.js';

const STATUS_OPTIONS = ['active', 'inactive', 'maintenance'];
const STATUS_LABELS = { active: 'Activo', inactive: 'Inactivo', maintenance: 'Mantenimiento' };
const STATUS_COLORS = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-600',
  maintenance: 'bg-yellow-100 text-yellow-700',
};

const EMPTY = { plate: '', model: '', brand: '', year: '', color: '', status: 'active', owner_name: '', owner_phone: '' };

export default function Vehicles() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/vehicles');
      setVehicles(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditId(null); setForm(EMPTY); setError(''); setShowModal(true); };
  const openEdit = (v) => { setEditId(v.id); setForm({ ...v, year: v.year || '' }); setError(''); setShowModal(true); };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/vehicles/${editId}`, form);
      } else {
        await api.post('/vehicles', form);
      }
      setShowModal(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este vehículo?')) return;
    try {
      await api.delete(`/vehicles/${id}`);
      load();
    } catch {
      alert('Error al eliminar');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-full text-gray-500">Cargando...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Vehículos</h2>
        <button
          onClick={openCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Agregar Vehículo
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                {['Placa', 'Marca/Modelo', 'Año', 'Color', 'Estado', 'Propietario', 'Teléfono', 'Acciones'].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No hay vehículos registrados</td></tr>
              )}
              {vehicles.map((v) => (
                <tr key={v.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-blue-700">{v.plate}</td>
                  <td className="px-4 py-3 text-gray-700">{v.brand} {v.model}</td>
                  <td className="px-4 py-3 text-gray-600">{v.year}</td>
                  <td className="px-4 py-3 text-gray-600">{v.color}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[v.status] || 'bg-gray-100'}`}>
                      {STATUS_LABELS[v.status] || v.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{v.owner_name}</td>
                  <td className="px-4 py-3 text-gray-600">{v.owner_phone}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => navigate(`/vehicles/${v.id}`)} className="text-blue-600 hover:text-blue-800 font-medium">Ver</button>
                      <button onClick={() => openEdit(v)} className="text-yellow-600 hover:text-yellow-800 font-medium">Editar</button>
                      <button onClick={() => handleDelete(v.id)} className="text-red-600 hover:text-red-800 font-medium">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-800">{editId ? 'Editar Vehículo' : 'Nuevo Vehículo'}</h3>
            {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'plate', label: 'Placa *', required: true },
                  { name: 'brand', label: 'Marca' },
                  { name: 'model', label: 'Modelo' },
                  { name: 'year', label: 'Año', type: 'number' },
                  { name: 'color', label: 'Color' },
                  { name: 'owner_name', label: 'Propietario' },
                  { name: 'owner_phone', label: 'Teléfono' },
                ].map(({ name, label, required, type }) => (
                  <div key={name}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                    <input
                      type={type || 'text'}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      required={required}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Estado</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                  {saving ? 'Guardando...' : (editId ? 'Actualizar' : 'Crear')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
