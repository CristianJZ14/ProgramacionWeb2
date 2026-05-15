import { useState } from 'react';
import api from '../services/api.js';

const options = ['good', 'regular', 'bad'];
const optionLabels = { good: 'Bueno', regular: 'Regular', bad: 'Malo' };

const fields = [
  { name: 'brakes', label: 'Frenos' },
  { name: 'lights', label: 'Luces' },
  { name: 'tires', label: 'Llantas' },
  { name: 'frame', label: 'Estructura' },
];

export default function CheckupForm({ vehicles, onSuccess }) {
  const [form, setForm] = useState({
    vehicle_id: '',
    brakes: 'good',
    lights: 'good',
    tires: 'good',
    frame: 'good',
    overall_status: 'approved',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.vehicle_id) return setError('Selecciona un vehículo');
    setLoading(true);
    try {
      await api.post('/checkups', form);
      onSuccess?.();
      setForm({ vehicle_id: '', brakes: 'good', lights: 'good', tires: 'good', frame: 'good', overall_status: 'approved', notes: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar revisión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
      {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo *</label>
        <select
          name="vehicle_id"
          value={form.vehicle_id}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar vehículo...</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.plate} — {v.brand} {v.model}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ name, label }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {options.map((o) => (
                <option key={o} value={o}>{optionLabels[o]}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Estado General</label>
        <select
          name="overall_status"
          value={form.overall_status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="approved">Aprobado</option>
          <option value="conditional">Condicional</option>
          <option value="rejected">Rechazado</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Observaciones adicionales..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Guardando...' : 'Registrar Revisión'}
      </button>
    </form>
  );
}
