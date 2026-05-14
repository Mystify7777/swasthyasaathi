import MedicineCard from "./MedicineCard";

export default function MedicineList({ medicines = [], onEdit, onDelete }) {
  if (!medicines.length) return <div className="text-center text-gray-500 py-10">No medicines found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {medicines.map((m) => (
        <MedicineCard key={m.id} medicine={m} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
