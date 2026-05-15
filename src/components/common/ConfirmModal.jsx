export default function ConfirmModal({

  isOpen,
  title,
  message,

  onConfirm,
  onCancel,

}) {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold text-red-600">
          {title}
        </h2>

        <p className="text-gray-600 mt-4">
          {message}
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-medium"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}