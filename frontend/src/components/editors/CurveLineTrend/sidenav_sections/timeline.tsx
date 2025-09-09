import React from "react";

interface TimelinePanelProps {
  drawSeconds: number;
  setDrawSeconds: React.Dispatch<React.SetStateAction<number>>;
  rippleSeconds: number;
  setRippleSeconds: React.Dispatch<React.SetStateAction<number>>;
  sparkSeconds: number;
  setSparkSeconds: React.Dispatch<React.SetStateAction<number>>;
}

export const TimelinePanel: React.FC<TimelinePanelProps> = ({
  drawSeconds,
  setDrawSeconds,
  rippleSeconds,
  setRippleSeconds,
  sparkSeconds,
  setSparkSeconds,
}) => {
  const renderSlider = (
    label: string,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    min: number,
    max: number,
    step: number
  ) => (
    <div style={{ marginBottom: "1rem" }}>
      <div
        style={{
          marginBottom: "0.5rem",
          color: "#ff4fa3",
          fontWeight: 600,
        }}
      >
        {label}: {value.toFixed(1)}s
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ width: "100%" }}
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
        ⏱️ Timeline Controls
      </h2>

      {renderSlider("Draw Duration", drawSeconds, setDrawSeconds, 1, 10, 0.1)}
      {renderSlider(
        "Ripple Duration",
        rippleSeconds,
        setRippleSeconds,
        0,
        5,
        0.1
      )}
      {renderSlider("Spark Duration", sparkSeconds, setSparkSeconds, 0, 5, 0.1)}
    </div>
  );
};
