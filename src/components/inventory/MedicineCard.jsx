export default function MedicineCard({ medicine, onEdit, onDelete }) {
  if (!medicine) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-purple-700">{medicine.medicineName}</h3>
        <span className="text-sm text-gray-500">Qty: {medicine.quantity}</span>
      </div>

      <p className="text-sm text-gray-600">Expiry: {medicine.expiryDate || 'N/A'}</p>

      <div className="flex gap-3 pt-3">
        <button onClick={() => onEdit && onEdit(medicine)} className="flex-1 bg-indigo-500 text-white py-2 rounded-lg">Edit</button>
        <button onClick={() => onDelete && onDelete(medicine.id)} className="flex-1 bg-red-500 text-white py-2 rounded-lg">Delete</button>
      </div>
    </div>
  );
}
