import { useEffect, useState } from "react";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" && navigator.onLine
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      className={`text-sm px-4 py-2 rounded-lg font-medium ${
        isOnline
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {isOnline ? (
        <span>Online • Data syncing enabled</span>
      ) : (
        <span>Offline • Showing cached data</span>
      )}
    </div>
  );
}
