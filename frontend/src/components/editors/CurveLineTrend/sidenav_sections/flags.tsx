import React from "react";

interface FlagsPanelProps {
  showGrid: boolean;
  setShowGrid: React.Dispatch<React.SetStateAction<boolean>>;
  showArea: boolean;
  setShowArea: React.Dispatch<React.SetStateAction<boolean>>;
  showXLabels: boolean;
  setShowXLabels: React.Dispatch<React.SetStateAction<boolean>>;
  showYLabels: boolean;
  setShowYLabels: React.Dispatch<React.SetStateAction<boolean>>;
  showTitle: boolean;
  setShowTitle: React.Dispatch<React.SetStateAction<boolean>>;
  showSubtitle: boolean;
  setShowSubtitle: React.Dispatch<React.SetStateAction<boolean>>;
  showCurrentCard: boolean;
  setShowCurrentCard: React.Dispatch<React.SetStateAction<boolean>>;
  showProgressBar: boolean;
  setShowProgressBar: React.Dispatch<React.SetStateAction<boolean>>;
  showFloatingSymbols: boolean;
  setShowFloatingSymbols: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FlagsPanel: React.FC<FlagsPanelProps> = ({
  showGrid,
  setShowGrid,
  showArea,
  setShowArea,
  showXLabels,
  setShowXLabels,
  showYLabels,
  setShowYLabels,
  showTitle,
  setShowTitle,
  showSubtitle,
  setShowSubtitle,
  showCurrentCard,
  setShowCurrentCard,
  showProgressBar,
  setShowProgressBar,
  showFloatingSymbols,
  setShowFloatingSymbols,
}) => {
  const renderToggle = (
    label: string,
    value: boolean,
    setValue: (v: boolean) => void
  ) => (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        padding: "0.6rem 1rem",
        borderRadius: "8px",
        border: value ? "2px solid #0077ff" : "1px solid #ddd",
        background: value ? "linear-gradient(135deg, #0077ff22, #ffffff)" : "#fafafa",
        cursor: "pointer",
        boxShadow: value
          ? "0 4px 10px rgba(0, 119, 255, 0.2)"
          : "0 2px 6px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease",
        flex: "1 1 200px",
      }}
    >
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => setValue(e.target.checked)}
        style={{ cursor: "pointer" }}
      />
      <span style={{ fontWeight: 600, color: "#333" }}>{label}</span>
    </label>
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
      <h2 style={{ marginBottom: "1.5rem", color: "#0077ff" }}>⚑ Flags</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {renderToggle("Show Grid", showGrid, setShowGrid)}
        {renderToggle("Show Area", showArea, setShowArea)}
        {renderToggle("Show X Labels", showXLabels, setShowXLabels)}
        {renderToggle("Show Y Labels", showYLabels, setShowYLabels)}
        {renderToggle("Show Title", showTitle, setShowTitle)}
        {renderToggle("Show Subtitle", showSubtitle, setShowSubtitle)}
        {renderToggle("Show Current Card", showCurrentCard, setShowCurrentCard)}
        {renderToggle("Show Progress Bar", showProgressBar, setShowProgressBar)}
        {renderToggle(
          "Show Floating Symbols",
          showFloatingSymbols,
          setShowFloatingSymbols
        )}
      </div>
    </div>
  );
};
