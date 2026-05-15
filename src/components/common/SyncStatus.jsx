import { useData } from "../../context/useData";

export default function SyncStatus() {

  const {
    refreshing,
    lastSynced,
  } = useData();

  const formatTime = (date) => {

    if (!date) {
      return "Waiting for first sync...";
    }

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        hour: "numeric",
        minute: "numeric",
      }
    ).format(date);
  };

  return (

    <div className="text-sm text-gray-600">

      {refreshing ? (

        <span className="text-blue-600 font-medium">
          Syncing...
        </span>

      ) : (

        <span>
          Last synced:{" "}
          {formatTime(lastSynced)}
        </span>

      )}

    </div>
  );
}
