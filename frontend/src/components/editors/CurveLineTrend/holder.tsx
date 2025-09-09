import React, { useState, useRef, useEffect } from "react";
import { DisplayerModal } from "../Global/modal";
// import { BackgroundSecTrial } from "../Global/sidenav_sections/bg";
import { ExportSecTrial } from "../Global/sidenav_sections/export";
import { OptionSectionTrial } from "../Global/sidenav_sections/options";
import type { GraphProps } from "../../remotion_compositions/CurveLineTrendTemplate";
import { TrendGraphPreview } from "../../layout/EditorPreviews/CurveLineTrendPreview";
import { CurveLineSideNav } from "./sidenav";
import { GeneralPanel } from "./sidenav_sections/general";
import { AnimationPanel } from "./sidenav_sections/animation";
import { TimelinePanel } from "./sidenav_sections/timeline";
import { DataPanel } from "./sidenav_sections/data";
// import { ThemePanel } from "./sidenav_sections/theme";

export const CurveLineTrendEditor: React.FC = () => {
      const [previewSize, setPreviewSize] = useState(1);
    
  const [title, setTitle] = useState<string>("Data Trend Visualization");
  const [subtitle, setSubtitle] = useState<string>(
    "2015 - 2024 • Growth Journey"
  );
  const [dataType, setDataType] = useState<string>("");
  const [currency, setCurrency] = useState<string | undefined>(undefined);
  const [symbol, setSymbol] = useState<string>("📊");
  const [revealWindow, setRevealWindow] = useState<number>(0.12);
  const [floatingCount, setFloatingCount] = useState<number>(6);
  const [floatingChar, setFloatingChar] = useState<string>("📈");
  const [data, setData] = useState<GraphProps["data"]>([
    { label: 2015, value: 100 },
    { label: 2016, value: 150 },
    { label: 2017, value: 300 },
    { label: 2018, value: 200 },
    { label: 2019, value: 250 },
    { label: 2020, value: 400 },
    { label: 2021, value: 550 },
    { label: 2022, value: 450 },
    { label: 2023, value: 600 },
    { label: 2024, value: 750 },
  ]);

  const [drawSeconds, setDrawSeconds] = useState(5);
  const [rippleSeconds, setRippleSeconds] = useState(2);
  const [sparkSeconds, setSparkSeconds] = useState(0);

  const [timeline, setTimeline] = useState<GraphProps["timeline"]>({
    drawSeconds: drawSeconds,
    rippleSeconds: rippleSeconds,
    sparkSeconds: sparkSeconds,
  });
  const [theme, setTheme] = useState<GraphProps["theme"]>({
    bgGradient: "linear-gradient(135deg, #1e293b, #475569 40%, #0f172a)",
    gridColor: "#64748b",
    lineStops: ["#3b82f6", "#1d4ed8", "#1e40af", "#1e3a8a"],
    areaTop: "rgba(59, 130, 246, 0.30)",
    areaBottom: "rgba(59, 130, 246, 0.05)",
    dot: "#3b82f6",
    dotStroke: "#ffffff",
    highlightDot: "#f59e0b",
    highlightStroke: "#f59e0b",
    labelText: "#ffffff",
    axisText: "#64748b",
    progressBarTrack: "rgba(71,85,105,0.5)",
    progressBarFill: "linear-gradient(90deg, #3b82f6, #f59e0b)",
    accent: "#f1f5f9",
  });

  // =============================
  // Flags
  // =============================
  const [flags, setFlags] = useState<GraphProps["flags"]>({
    showGrid: true,
    showArea: true,
    showXLabels: true,
    showYLabels: true,
    showTitle: true,
    showSubtitle: true,
    showCurrentCard: false,
    showProgressBar: true,
    showFloatingSymbols: true,
  });

  // =============================
  // Axis
  // =============================
  const [axis, setAxis] = useState<GraphProps["axis"]>({
    xMin: 10,
    xMax: 90,
    yMin: 20,
    yMax: 80,
    yTicks: [],
  });

  // =============================
  // Assemble props for component
  // =============================
  const props: GraphProps = {
    title,
    subtitle,
    dataType,
    currency,
    symbol,
    revealWindow,
    floatingCount,
    floatingChar,
    data,
    timeline,
    theme,
    flags,
    axis,
  };

  const [showSafeMargins, setShowSafeMargins] = useState(true);
  const [previewBg, setPreviewBg] = useState<"dark" | "light" | "grey">("dark");
  const [activeSection, setActiveSection] = useState<
    | "general"
    | "animation"
    | "data"
    | "theme"
    | "flags"
    | "axis"
    | "symbols"
    | "timeline"
    | "options"
    | "export"
  >("general");
  const [collapsed, setCollapsed] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [autoSave, setAutoSave] = useState(false);
  const [duration, setDuration] = useState(20);

  // 🔹 Resizable panel state
  const [panelWidth, setPanelWidth] = useState(320); // default width
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Drag handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth =
        e.clientX - (panelRef.current?.getBoundingClientRect().left || 0);
      if (newWidth > 200 && newWidth < 600) {
        setPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const cycleBg = () => {
    if (previewBg === "dark") setPreviewBg("light");
    else if (previewBg === "light") setPreviewBg("grey");
    else setPreviewBg("dark");
  };

  const handleExport = async (format: string) => {
    // setIsExporting(format);
    // // console.log(backgroundImage)
    // try {
    //   let finalImageUrl = backgroundImage;
    //   if (!finalImageUrl.startsWith("http://localhost:3000")) {
    //     finalImageUrl = `http://localhost:3000${finalImageUrl}`;
    //   }
    //   const response = await fetch("/generatevideo/factstemplaterender", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       intro,
    //       outro,
    //       facts: factsArray,
    //       backgroundImage: finalImageUrl,
    //       fontSizeTitle: titleFontSize,
    //       fontSizeSubtitle: subtitleFontSize,
    //       fontFamilyTitle: titlefontFamily,
    //       fontColorTitle: titleFontColor,
    //       fontColorSubtitle: subtitleFontColor,
    //       fontFamilySubtitle: subtitleFontFamily,
    //       duration,
    //       format,
    //     }),
    //   });
    //   if (!response.ok) {
    //     const errorText = await response.text();
    //     throw new Error(
    //       `HTTP error! status: ${response.status}, message: ${errorText}`
    //     );
    //   }
    //   const data = await response.json();
    //   setExportUrl(data.url);
    //   setShowModal(true);
    // } catch (error) {
    //   console.error("Export failed:", error);
    //   alert(`Export failed: ${error || "Please try again."}`);
    // } finally {
    //   setIsExporting(null);
    // }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#fafafa" }}>
      {/* modal */}
      {showModal && exportUrl && (
        <DisplayerModal exportUrl={exportUrl} setShowModal={setShowModal} />
      )}

      <CurveLineSideNav
        activeSection={activeSection}
        collapsed={collapsed}
        setActiveSection={setActiveSection}
        setCollapsed={setCollapsed}
      />

      {/* Controls Panel */}
      {!collapsed && (
        <div
          ref={panelRef}
          style={{
            width: `${panelWidth}px`,
            padding: "2rem",
            overflowY: "auto",
            background: "#fff",
            borderRight: "1px solid #eee",
            position: "relative",
            transition: isResizing ? "none" : "width 0.2s",
          }}
        >
          {/* Drag Handle */}
          <div
            onMouseDown={() => setIsResizing(true)}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "6px",
              cursor: "col-resize",
              background: isResizing ? "#ddd" : "transparent",
            }}
          />

          <h2
            style={{
              marginBottom: "1.5rem",
              fontSize: "1.5rem",
              fontWeight: 600,
              background: "linear-gradient(90deg,#ff4fa3,#8a4dff,#0077ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🎬 Curve Line Trend Template
          </h2>

          {activeSection === "general" && (
            <GeneralPanel
              currency={currency}
              dataType={dataType}
              setCurrency={setCurrency}
              setDataType={setDataType}
              setSubtitle={setSubtitle}
              setSymbol={setSymbol}
              setTitle={setTitle}
              subtitle={subtitle}
              symbol={symbol}
              title={title}
            />
          )}

          {activeSection === "timeline" && (
            <TimelinePanel
              drawSeconds={drawSeconds}
              rippleSeconds={rippleSeconds}
              setDrawSeconds={setDrawSeconds}
              setRippleSeconds={setRippleSeconds}
              setSparkSeconds={setSparkSeconds}
              sparkSeconds={sparkSeconds}
            />
          )}
          {activeSection === "animation" && (
            <AnimationPanel
              drawSeconds={timeline.drawSeconds}
              revealWindow={revealWindow}
              rippleSeconds={timeline.rippleSeconds}
              setDrawSeconds={setDrawSeconds}
              setRevealWindow={setRevealWindow}
              setRippleSeconds={setRippleSeconds}
              setSparkSeconds={setSparkSeconds}
              sparkSeconds={timeline.sparkSeconds}
            />
          )}
          {activeSection === "data" &&(
            <DataPanel
            data={data}
            setData={setData}
            />
          )}

          {/* {activeSection === "theme" && (
            <ThemePanel
            // accent={ac}
            />
          )} */}

          {activeSection === "options" && (
            <OptionSectionTrial
              setShowSafeMargins={setShowSafeMargins}
              showSafeMargins={showSafeMargins}
              setAutoSave={setAutoSave}
              autoSave={autoSave}
              previewSize={previewSize}
              setPreviewSize={setPreviewSize}
            />
          )}
          {activeSection === "export" && (
            <ExportSecTrial
              handleExport={handleExport}
              isExporting={isExporting}
            />
          )}
        </div>
      )}

      <TrendGraphPreview
        {...props}
        cycleBg={cycleBg}
        duration={6}
        previewBg={previewBg}
      />
    </div>
  );
};
