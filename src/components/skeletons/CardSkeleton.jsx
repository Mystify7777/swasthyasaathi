export default function CardSkeleton() {

  return (

    <div className="bg-white rounded-2xl shadow-md p-5 animate-pulse">

      <div className="h-7 bg-gray-300 rounded w-1/2"></div>

      <div className="space-y-3 mt-6">

        <div className="h-4 bg-gray-300 rounded"></div>

        <div className="h-4 bg-gray-300 rounded"></div>

        <div className="h-4 bg-gray-300 rounded"></div>

      </div>

      <div className="flex gap-3 mt-6">

        <div className="h-10 bg-gray-300 rounded flex-1"></div>

        <div className="h-10 bg-gray-300 rounded flex-1"></div>

      </div>

    </div>
  );
}
