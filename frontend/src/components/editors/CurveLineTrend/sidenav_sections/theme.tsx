import React from "react";

interface ThemePanelProps {
  bgGradient: string;
  setBgGradient: React.Dispatch<React.SetStateAction<string>>;
  gridColor: string;
  setGridColor: React.Dispatch<React.SetStateAction<string>>;
  lineStops: [string, string, string, string];
  setLineStops: React.Dispatch<
    React.SetStateAction<[string, string, string, string]>
  >;
  areaTop: string;
  setAreaTop: React.Dispatch<React.SetStateAction<string>>;
  areaBottom: string;
  setAreaBottom: React.Dispatch<React.SetStateAction<string>>;
  dot: string;
  setDot: React.Dispatch<React.SetStateAction<string>>;
  dotStroke: string;
  setDotStroke: React.Dispatch<React.SetStateAction<string>>;
  highlightDot: string;
  setHighlightDot: React.Dispatch<React.SetStateAction<string>>;
  highlightStroke: string;
  setHighlightStroke: React.Dispatch<React.SetStateAction<string>>;
  labelText: string;
  setLabelText: React.Dispatch<React.SetStateAction<string>>;
  axisText: string;
  setAxisText: React.Dispatch<React.SetStateAction<string>>;
  progressBarTrack: string;
  setProgressBarTrack: React.Dispatch<React.SetStateAction<string>>;
  progressBarFill: string;
  setProgressBarFill: React.Dispatch<React.SetStateAction<string>>;
  accent: string;
  setAccent: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemePanel: React.FC<ThemePanelProps> = ({
  bgGradient,
  setBgGradient,
  gridColor,
  setGridColor,
  lineStops,
  setLineStops,
  areaTop,
  setAreaTop,
  areaBottom,
  setAreaBottom,
  dot,
  setDot,
  dotStroke,
  setDotStroke,
  highlightDot,
  setHighlightDot,
  highlightStroke,
  setHighlightStroke,
  labelText,
  setLabelText,
  axisText,
  setAxisText,
  progressBarTrack,
  setProgressBarTrack,
  progressBarFill,
  setProgressBarFill,
  accent,
  setAccent,
}) => {
  // Use this for plain hex colors (not rgba/gradients)
  const renderColorControl = (
    label: string,
    color: string,
    setColor: (value: string) => void
  ) => (
    <div style={{ marginBottom: "1rem", flex: "1 1 140px" }}>
      <div style={{ marginBottom: "0.5rem", color: "#ff4fa3", fontWeight: 600 }}>
        {label}
      </div>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{
          width: "100%",
          height: "40px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      />
    </div>
  );

  // Use this for rgba/gradients/other CSS color strings
  const renderCssInput = (
    label: string,
    value: string,
    setValue: (v: string) => void,
    placeholder?: string
  ) => (
    <div style={{ marginBottom: "1rem", flex: "1 1 260px" }}>
      <div style={{ marginBottom: "0.5rem", color: "#ff4fa3", fontWeight: 600 }}>
        {label}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? "CSS color (e.g. rgba(...) or linear-gradient(...))"}
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
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
      <h2 style={{ marginBottom: "1.5rem", color: "#0077ff" }}>🎨 Theme</h2>

      {/* Background Gradient */}
      {renderCssInput(
        "Background Gradient",
        bgGradient,
        (v) => setBgGradient(v),
        "linear-gradient(135deg, #1e293b, #475569 40%, #0f172a)"
      )}

      {/* Grid / Axis / Label (hex colors) */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        {renderColorControl("Grid Color", gridColor, (v) => setGridColor(v))}
        {renderColorControl("Axis Text", axisText, (v) => setAxisText(v))}
        {renderColorControl("Label Text", labelText, (v) => setLabelText(v))}
      </div>

      {/* Line Stops (hex colors) */}
      <h4 style={{ marginBottom: "0.8rem", color: "#0077ff" }}>Line Gradient Stops</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {lineStops.map((stop, i) =>
          renderColorControl(`Stop ${i + 1}`, stop, (newColor: string) =>
            setLineStops((prev) => {
              const next = [...prev] as [string, string, string, string];
              next[i] = newColor;
              return next;
            })
          )
        )}
      </div>

      {/* Area Fill (rgba strings) */}
      <h4 style={{ margin: "1.5rem 0 0.8rem", color: "#0077ff" }}>Area Fill</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {renderCssInput("Area Top", areaTop, (v) => setAreaTop(v), "rgba(59, 130, 246, 0.30)")}
        {renderCssInput("Area Bottom", areaBottom, (v) => setAreaBottom(v), "rgba(59, 130, 246, 0.05)")}
      </div>

      {/* Dots & Highlights (hex colors) */}
      <h4 style={{ margin: "1.5rem 0 0.8rem", color: "#0077ff" }}>Dots & Highlights</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {renderColorControl("Dot", dot, (v) => setDot(v))}
        {renderColorControl("Dot Stroke", dotStroke, (v) => setDotStroke(v))}
        {renderColorControl("Highlight Dot", highlightDot, (v) => setHighlightDot(v))}
        {renderColorControl("Highlight Stroke", highlightStroke, (v) => setHighlightStroke(v))}
      </div>

      {/* Progress Bar (track rgba, fill gradient) */}
      <h4 style={{ margin: "1.5rem 0 0.8rem", color: "#0077ff" }}>Progress Bar</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {renderCssInput("Track", progressBarTrack, (v) => setProgressBarTrack(v), "rgba(71,85,105,0.5)")}
        {renderCssInput("Fill", progressBarFill, (v) => setProgressBarFill(v), "linear-gradient(90deg, #3b82f6, #f59e0b)")}
      </div>

      {/* Accent (hex color) */}
      <h4 style={{ margin: "1.5rem 0 0.8rem", color: "#0077ff" }}>Accent</h4>
      {renderColorControl("Accent", accent, (v) => setAccent(v))}
    </div>
  );
};
