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

    const handler = (e) => {

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

        setIsInstalled(true);

        setDeferredPrompt(null);
      }
    );

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
