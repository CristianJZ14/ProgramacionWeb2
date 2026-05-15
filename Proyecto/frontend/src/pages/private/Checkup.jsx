import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import CheckupForm from '../../components/CheckupForm.jsx';

export default function Checkup() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    api.get('/vehicles').then(({ data }) => setVehicles(data)).finally(() => setLoading(false));
  }, []);

  const handleSuccess = () => {
    setSuccessMsg('Revisión registrada correctamente');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  if (loading) return <div className="flex items-center justify-center h-full text-gray-500">Cargando...</div>;

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-2xl font-bold text-gray-800">Nueva Revisión</h2>
      <p className="text-sm text-gray-500">Registra la inspección técnica de un bicitaxi.</p>

      {successMsg && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
          ✅ {successMsg}
        </div>
      )}

      <CheckupForm vehicles={vehicles} onSuccess={handleSuccess} />
    </div>
  );
}
