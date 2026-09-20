import { useEffect, useRef, useState } from "react";

// Worker page drawer behavior, shared by Customer pages without changing Worker callers.
export default function useNavigationDrawer() {
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef(null);
  const drawerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const oldOverflow = document.body.style.overflow;
    const menuButton = menuRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function handleKey(event) {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const controls = drawerRef.current?.querySelectorAll('button, a[href]');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", handleKey);
      if (menuButton?.isConnected) menuButton.focus();
    };
  }, [isOpen]);

  return { isOpen, menuRef, drawerRef, closeRef,
    open: () => setOpen(true), close: () => setOpen(false) };
}
