export default function Toast({
  message,
  id = "appToast",
  className = "app-toast",
}) {
  return (
    <div
      id={id}
      className={`${className}${message ? " visible" : ""}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

