import React from "react";

export interface DataPoint {
  label: string | number;
  value: number;
  isHighlight?: boolean;
}

interface DataPanelProps {
  data: DataPoint[];
  setData: React.Dispatch<React.SetStateAction<DataPoint[]>>;
}

export const DataPanel: React.FC<DataPanelProps> = ({ data, setData }) => {
  const updateDataPoint = (index: number, key: keyof DataPoint, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [key]: value };
    setData(updated);
  };

  const addDataPoint = () => {
    setData([...data, { label: `New`, value: 0, isHighlight: false }]);
  };

  const removeDataPoint = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        marginBottom: "1.5rem",
        padding: "1rem",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        border: "1px solid #eee",
      }}
    >
      <h2 style={{ marginBottom: "1.5rem", color: "#0077ff" }}>📈 Data</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {data.map((point, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr auto auto",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.6rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#fafafa",
            }}
          >
            {/* Label */}
            <input
              type="text"
              value={point.label}
              onChange={(e) => updateDataPoint(i, "label", e.target.value)}
              placeholder="Label"
              style={{
                padding: "0.4rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />

            {/* Value */}
            <input
              type="number"
              value={point.value}
              onChange={(e) =>
                updateDataPoint(i, "value", Number(e.target.value))
              }
              placeholder="Value"
              style={{
                padding: "0.4rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />

            {/* Highlight */}
            <label style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <input
                type="checkbox"
                checked={point.isHighlight || false}
                onChange={(e) =>
                  updateDataPoint(i, "isHighlight", e.target.checked)
                }
              />
              Highlight
            </label>

            {/* Remove Button */}
            <button
              onClick={() => removeDataPoint(i)}
              style={{
                background: "#ff4fa3",
                border: "none",
                color: "white",
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={addDataPoint}
        style={{
          marginTop: "1rem",
          background: "linear-gradient(90deg,#ff4fa3,#8a4dff,#0077ff)",
          border: "none",
          color: "white",
          padding: "0.6rem 1.2rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        ➕ Add Data Point
      </button>
    </div>
  );
};
