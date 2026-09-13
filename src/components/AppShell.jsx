export default function AppShell({
  children,
  className = "",
  inert,
  ...props
}) {
  return (
    <div
      className={`app-shell${className ? ` ${className}` : ""}`}
      inert={inert ? true : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

