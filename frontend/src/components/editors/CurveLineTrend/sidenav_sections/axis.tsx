import React from "react";

interface AxisPanelProps {
  xMin: number;
  setXMin: React.Dispatch<React.SetStateAction<number>>;
  xMax: number;
  setXMax: React.Dispatch<React.SetStateAction<number>>;
  yMin: number;
  setYMin: React.Dispatch<React.SetStateAction<number>>;
  yMax: number;
  setYMax: React.Dispatch<React.SetStateAction<number>>;
  yTicks: number[];
  setYTicks: React.Dispatch<React.SetStateAction<number[]>>;
}

export const AxisPanel: React.FC<AxisPanelProps> = ({
  xMin,
  setXMin,
  xMax,
  setXMax,
  yMin,
  setYMin,
  yMax,
  setYMax,
  yTicks,
  setYTicks,
}) => {
  const renderNumberInput = (
    label: string,
    value: number,
    setValue: (v: number) => void
  ) => (
    <div style={{ marginBottom: "1rem", flex: "1 1 140px" }}>
      <div
        style={{ marginBottom: "0.5rem", color: "#ff4fa3", fontWeight: 600 }}
      >
        {label}
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{
          width: "100%",
          padding: "0.6rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />
    </div>
  );

  const addTick = () => setYTicks([...yTicks, 0]);
  const updateTick = (index: number, value: number) => {
    const next = [...yTicks];
    next[index] = value;
    setYTicks(next);
  };
  const removeTick = (index: number) =>
    setYTicks(yTicks.filter((_, i) => i !== index));

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
      <h2 style={{ marginBottom: "1.5rem", color: "#0077ff" }}>📊 Axis</h2>

      {/* X and Y bounds */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {renderNumberInput("X Min", xMin, setXMin)}
        {renderNumberInput("X Max", xMax, setXMax)}
        {renderNumberInput("Y Min", yMin, setYMin)}
        {renderNumberInput("Y Max", yMax, setYMax)}
      </div>

      {/* Y Ticks */}
      <div style={{ marginTop: "2rem" }}>
        <h4 style={{ marginBottom: "1rem", color: "#0077ff" }}>Y Ticks</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {yTicks.map((tick, i) => (
            <div key={i} style={{ display: "flex", gap: "0.6rem" }}>
              <input
                type="number"
                value={tick}
                onChange={(e) => updateTick(i, Number(e.target.value))}
                style={{
                  flex: "1",
                  padding: "0.6rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              />
              <button
                onClick={() => removeTick(i)}
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
        <button
          onClick={addTick}
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
          ➕ Add Tick
        </button>
      </div>
    </div>
  );
};
