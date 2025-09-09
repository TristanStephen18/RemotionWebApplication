import React from "react";

interface GeneralPanelProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  subtitle: string;
  setSubtitle: React.Dispatch<React.SetStateAction<string>>;
  dataType: string;
  setDataType: React.Dispatch<React.SetStateAction<string>>;
  currency: string | undefined;
  setCurrency: React.Dispatch<React.SetStateAction<string | undefined>>;
  symbol: string;
  setSymbol: React.Dispatch<React.SetStateAction<string>>;
}

export const GeneralPanel: React.FC<GeneralPanelProps> = ({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  dataType,
  setDataType,
  currency,
  setCurrency,
  symbol,
  setSymbol,
}) => {
  const renderTextInput = (
    label: string,
    value: string,
    setValue: (val: string) => void,
    placeholder: string
  ) => (
    <div style={{ marginBottom: "1rem", flex: "1 1 250px" }}>
      <div style={{ marginBottom: "0.5rem", color: "#ff4fa3", fontWeight: 600 }}>
        {label}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
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
      <h2 style={{ marginBottom: "1.5rem", color: "#0077ff" }}>⚙ General</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {renderTextInput("Title", title, setTitle, "Enter title...")}
        {renderTextInput("Subtitle", subtitle, setSubtitle, "Enter subtitle...")}
        {renderTextInput("Data Type", dataType, setDataType, "e.g. USD")}
        {renderTextInput("Currency", currency ?? "", setCurrency, "Optional currency")}
        {renderTextInput("Symbol", symbol, setSymbol, "e.g. 📊")}
      </div>
    </div>
  );
};
