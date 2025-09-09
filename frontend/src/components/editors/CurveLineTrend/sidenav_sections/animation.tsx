interface AnimationPanelProps {
  drawSeconds: number;
  setDrawSeconds: React.Dispatch<React.SetStateAction<number>>;
  rippleSeconds: number;
  setRippleSeconds: React.Dispatch<React.SetStateAction<number>>;
  sparkSeconds: number;
  setSparkSeconds: React.Dispatch<React.SetStateAction<number>>;
  revealWindow: number;
  setRevealWindow: React.Dispatch<React.SetStateAction<number>>;
}

export const AnimationPanel: React.FC<AnimationPanelProps> = ({
  drawSeconds,
  setDrawSeconds,
  rippleSeconds,
  setRippleSeconds,
  sparkSeconds,
  setSparkSeconds,
  revealWindow,
  setRevealWindow,
}) => {
  const renderSlider = (
    label: string,
    value: number,
    setValue: (val: number) => void,
    min: number,
    max: number,
    step: number = 1
  ) => (
    <div style={{ marginBottom: "1rem", flex: "1 1 200px" }}>
      <div style={{ marginBottom: "0.5rem", color: "#ff4fa3", fontWeight: 600 }}>
        {label} ({value})
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
      <h2 style={{ marginBottom: "1.5rem", color: "#0077ff" }}>🎞 Animation</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {renderSlider("Draw Seconds", drawSeconds, setDrawSeconds, 1, 20)}
        {renderSlider("Ripple Seconds", rippleSeconds, setRippleSeconds, 0, 10)}
        {renderSlider("Spark Seconds", sparkSeconds, setSparkSeconds, 0, 10)}
        {renderSlider("Reveal Window", revealWindow, setRevealWindow, 0, 1, 0.01)}
      </div>
    </div>
  );
};
