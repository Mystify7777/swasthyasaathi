export default function PageLoader() {

  return (

    <div className="p-6 animate-pulse">

      <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {[1,2,3,4].map((item) => (

          <div
            key={item}
            className="bg-white rounded-2xl shadow-md p-6"
          >

            <div className="h-6 bg-gray-300 rounded w-1/2 mb-6"></div>

            <div className="space-y-4">

              <div className="h-4 bg-gray-300 rounded"></div>

              <div className="h-4 bg-gray-300 rounded"></div>

              <div className="h-4 bg-gray-300 rounded"></div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
