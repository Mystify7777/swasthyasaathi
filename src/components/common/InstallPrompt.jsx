import {
  useEffect,
  useState,
} from "react";

export default function InstallPrompt() {

  const [deferredPrompt,
    setDeferredPrompt] =
    useState(null);

  const [isInstalled,
    setIsInstalled] =
    useState(false);

  useEffect(() => {

    console.log("InstallPrompt mounted, checking PWA support...");

    const handler = (e) => {

      console.log("beforeinstallprompt event fired");

      e.preventDefault();

      setDeferredPrompt(e);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    window.addEventListener(
      "appinstalled",
      () => {

        console.log("App installed");

        setIsInstalled(true);

        setDeferredPrompt(null);
      }
    );

    // Check if service worker is registered
    if ("serviceWorker" in navigator) {

      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {

          console.log(`Service workers registered: ${registrations.length}`);

          registrations.forEach((reg) => {

            console.log("SW scope:", reg.scope);
          });
        });
    } else {

      console.log("Service Worker not supported");
    }

    return () => {

      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
    };

  }, []);

  const handleInstall =
    async () => {

      if (!deferredPrompt) return;

      deferredPrompt.prompt();

      const result =
        await deferredPrompt.userChoice;

      if (
        result.outcome === "accepted"
      ) {

        setDeferredPrompt(null);
      }
    };

  if (
    !deferredPrompt ||
    isInstalled
  ) {
    return null;
  }

  return (

    <button
      onClick={handleInstall}
      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition"
    >
      Install App
    </button>
  );
}
