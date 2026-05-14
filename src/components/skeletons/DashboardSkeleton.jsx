export default function DashboardSkeleton() {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      {[1, 2, 3, 4].map((item) => (

        <div
          key={item}
          className="bg-white p-6 rounded-2xl shadow-md animate-pulse"
        >

          <div className="h-5 bg-gray-300 rounded w-1/2"></div>

          <div className="h-10 bg-gray-300 rounded w-1/3 mt-6"></div>

        </div>

      ))}

    </div>
  );
}
