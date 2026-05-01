export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        padding: "12px 20px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
