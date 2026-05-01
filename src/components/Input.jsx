export default function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 15 }}>
      <label style={{ display: "block", marginBottom: 5, fontWeight: 600 }}>
        {label}
      </label>
      <input
        {...props}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: 6,
          border: "1px solid #cbd5f5",
        }}
      />
    </div>
  );
}
