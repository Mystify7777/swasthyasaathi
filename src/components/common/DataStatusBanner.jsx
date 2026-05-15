import { useData } from "../../context/useData";

export default function DataStatusBanner() {

  const { errors } = useData();

  const activeErrors = Object.values(errors)
    .filter(Boolean);

  if (activeErrors.length === 0) {
    return null;
  }

  return (

    <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 text-sm">

      {activeErrors.map((err, index) => (

        <p key={index}>
          {err}
        </p>

      ))}

    </div>
  );
}