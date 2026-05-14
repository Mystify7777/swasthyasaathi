export default function AppLoader() {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="text-center space-y-6">

        <div className="flex justify-center">

          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>

        </div>

        <div>

          <h1 className="text-2xl font-bold text-blue-700">
            SwasthyaSaathi
          </h1>

          <p className="text-gray-500 mt-2">
            Loading healthcare data...
          </p>

        </div>

      </div>

    </div>
  );
}
