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

  const diffTime =
    expiryDate.getTime() -
    today.getTime();

  const diffDays = Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );

  const isExpiringSoon =
    diffDays > 0 &&
    diffDays <= 60;

  return (

    <div className="bg-white rounded-2xl shadow-md p-5 space-y-4">

      <div className="flex items-start justify-between gap-4">

        <h3 className="text-2xl font-bold text-purple-700">
          {medicine.medicineName}
        </h3>

        <div className="flex flex-col gap-2 items-end">

          {isLowStock && (

            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
              Low Stock
            </span>

          )}

          {isExpiringSoon && !isExpired && (

            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              Expiring Soon
            </span>

          )}

        </div>

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

          ) : isExpiringSoon ? (

            <span className="text-yellow-600 font-semibold">
              Expiring Soon
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
