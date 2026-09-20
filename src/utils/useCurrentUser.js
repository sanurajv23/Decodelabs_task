import { useSyncExternalStore } from "react";
import { getCurrentUser } from "./auth";

function subscribe(listener) {
  window.addEventListener("hireme-user-change", listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener("hireme-user-change", listener);
    window.removeEventListener("storage", listener);
  };
}
const snapshot = () => JSON.stringify(getCurrentUser());
export default function useCurrentUser() {
  return JSON.parse(useSyncExternalStore(subscribe, snapshot, snapshot));
}
