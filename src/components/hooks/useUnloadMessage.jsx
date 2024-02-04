import { useEffect } from "react";

export function useUnloadMessage(setMessage, setSuccess = null) {
  useEffect(() => {
    const handleUnload = () => {
      setMessage(null);
      setSuccess(null);
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("blur", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("blur", handleUnload);
    };
  }, [setMessage, setSuccess]);
}
