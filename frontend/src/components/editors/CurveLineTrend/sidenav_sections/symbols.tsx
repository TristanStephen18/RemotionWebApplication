import React from "react";

interface FloatingSymbolsPanelProps {
  floatingCount: number;
  setFloatingCount: React.Dispatch<React.SetStateAction<number>>;
  floatingChar: string;
  setFloatingChar: React.Dispatch<React.SetStateAction<string>>;
}

export const FloatingSymbolsPanel: React.FC<FloatingSymbolsPanelProps> = ({
  floatingCount,
  setFloatingCount,
  floatingChar,
  setFloatingChar,
}) => {
  const renderSlider = (
    label: string,
    value: number,
    setValue: (v: number) => void,
    min: number,
    max: number
  ) => (
    <div style={{ marginBottom: "1.2rem" }}>
      <div
        style={{ marginBottom: "0.5rem", color: "#ff4fa3", fontWeight: 600 }}
      >
        {label}: {value}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );

  const renderTextInput = (
    label: string,
    value: string,
    setValue: (v: string) => void
  ) => (
    <div style={{ marginBottom: "1.2rem" }}>
      <div
        style={{ marginBottom: "0.5rem", color: "#ff4fa3", fontWeight: 600 }}
      >
        {label}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: "100%",
          padding: "0.6rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
        maxLength={2}
      />
    </div>
  );

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
      <h2 style={{ marginBottom: "1.5rem", color: "#0077ff" }}>
        🎈 Floating Symbols
      </h2>

      {renderSlider("Floating Count", floatingCount, setFloatingCount, 0, 20)}
      {renderTextInput("Floating Character", floatingChar, setFloatingChar)}
    </div>
  );
};
