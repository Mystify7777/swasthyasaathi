export default function MedicineCard({

  medicine,
  onDelete,
  onEdit,

}) {

  const quantity = Number(medicine.quantity);

  const isLowStock = quantity < 10;

  const expiryDate = new Date(
    medicine.expiryDate
  );

  const today = new Date();

  const isExpired = expiryDate < today;

  return (

    <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">

      <div className="flex items-center justify-between">

        <h3 className="text-2xl font-bold text-purple-700">
          {medicine.medicineName}
        </h3>

        {isLowStock && (

          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
            Low Stock
          </span>

        )}

      </div>

      <div className="space-y-2 text-gray-700">

        <p>
          <strong>Quantity:</strong>{" "}
          {medicine.quantity}
        </p>

        <p>
          <strong>Expiry:</strong>{" "}
          {medicine.expiryDate}
        </p>

        <p>

          <strong>Status:</strong>{" "}

          {isExpired ? (
            <span className="text-red-600 font-semibold">
              Expired
            </span>
          ) : (
            <span className="text-green-600 font-semibold">
              Safe
            </span>
          )}

        </p>

      </div>

      <div className="flex gap-3 pt-2">

        <button
          onClick={() => onEdit(medicine)}
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(medicine.id)}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}
