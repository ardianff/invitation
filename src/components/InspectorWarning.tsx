"use client";

import { useEffect } from "react";
import { useToast } from "./toast/ToastProvider";
import Toast from "./toast/Toast";

const InspectorWarning = () => {
  const { show } = useToast();

  useEffect(() => {
    // Allow right-click & dev tools in development mode or on localhost
    if (
      process.env.NODE_ENV === "development" ||
      (typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"))
    ) {
      return;
    }

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      show(
        "Permission Denied: Right-click is disabled contact https://baseec.now.sh/"
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl+Shift+I
        (event.metaKey && event.altKey && event.key === "I") || // Cmd+Opt+I (Mac)
        event.key === "F12" // F12
      ) {
        event.preventDefault();
        show(
          "Permission Denied: Developer tools access is restricted contact https://baseec.now.sh/"
        );
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  return null;
};

export default InspectorWarning;
