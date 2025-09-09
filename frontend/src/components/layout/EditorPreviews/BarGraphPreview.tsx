import React from "react";
import { Player } from "@remotion/player";
import { BarGraph } from "../../remotion_compositions/BarGraphTemplate";
import type { BarGraphProps } from "../../remotion_compositions/BarGraphTemplate";

const BarGraphComponent: React.FC<BarGraphProps> = ({
  data,
  title,
  titleFontColor,
  backgroundImage,
  accent,
  subtitle,
  currency,
  titleFontSize = 40, // Scaled down from 90
  subtitleFontSize = 22, // Scaled down from 50
  subtitleColor = "#a5b4fc",
  barHeight = 40, // Scaled down from 90
  barGap = 15, // Scaled down from 34
  barLabelFontSize = 14, // Scaled down from 34
  barValueFontSize = 14, // Scaled down from 34
  fontFamily
}) => {
  return (
    <BarGraph
      data={data}
      title={title}
      titleFontColor={titleFontColor}
      backgroundImage={backgroundImage}
      accent={accent}
      subtitle={subtitle}
      currency={currency}
      titleFontSize={titleFontSize}
      subtitleFontSize={subtitleFontSize}
      subtitleColor={subtitleColor}
      barHeight={barHeight}
      barGap={barGap}
      barLabelFontSize={barLabelFontSize}
      barValueFontSize={barValueFontSize}
      fontFamily={fontFamily}
    />
  );
};

const RemotionBarGraphPlayer: React.FC<
  BarGraphProps & {
    width?: number;
    height?: number;
    autoPlay?: boolean;
    controls?: boolean;
    loop?: boolean;
    fps?: number;
  }
> = ({
  data,
  title,
  titleFontColor,
  backgroundImage,
  accent,
  subtitle,
  currency,
  titleFontSize = 40,
  subtitleFontSize = 22,
  subtitleColor = "#a5b4fc",
  barHeight = 40,
  barGap = 15,
  barLabelFontSize = 14,
  barValueFontSize = 14,
  autoPlay = true,
  controls = true,
  loop = true,
  fontFamily
}) => {
  return (
    <Player
      component={BarGraphComponent}
      inputProps={{
        data,
        title,
        titleFontColor,
        backgroundImage,
        accent,
        subtitle,
        currency,
        titleFontSize,
        subtitleFontSize,
        subtitleColor,
        barHeight,
        barGap,
        barLabelFontSize,
        barValueFontSize,
        fontFamily
      }}
      durationInFrames={30 * 5}
      compositionWidth={1080} // Native large size
      compositionHeight={1920} // Native large size
      fps={30}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export const BarGraphTemplatePreview: React.FC<
  BarGraphProps & {
    previewBg: string;
    cycleBg: () => void;
    fps?: number;
    previewScale: number;
  }
> = ({
  data,
  title,
  titleFontColor,
  backgroundImage,
  accent,
  subtitle,
  currency,
  titleFontSize = 40,
  subtitleFontSize = 22,
  subtitleColor = "#a5b4fc",
  barHeight = 40,
  barGap = 15,
  barLabelFontSize = 14,
  barValueFontSize = 14,
  previewBg,
  cycleBg,
  fontFamily,
  previewScale
}) => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          previewBg === "dark"
            ? "#000"
            : previewBg === "light"
            ? "#f0f0f0"
            : "#ccc",
        transition: "background 0.3s",
        position: "relative",
      }}
    >
      <button
        onClick={cycleBg}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "0.6rem 1rem",
          borderRadius: "30px",
          border: "none",
          cursor: "pointer",
          color: "white",
          fontWeight: 600,
          background: "linear-gradient(90deg,#ff4fa3,#8a4dff,#0077ff)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        {previewBg === "dark"
          ? "🌞 Light"
          : previewBg === "light"
          ? "⬜ Grey"
          : "🌙 Dark"}
      </button>
          <div
        style={{
          transform: `scale(${previewScale})`, // ⭐ scale dynamically
          transformOrigin: "center center",
        }}
      >
      <div
        style={{
          width: "270px",
          height: "480px",
          border: "3px solid #222",
          borderRadius: "24px",
          overflow: "hidden",
          background: "#000",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <RemotionBarGraphPlayer
          data={data}
          title={title}
          titleFontColor={titleFontColor}
          backgroundImage={backgroundImage}
          accent={accent}
          subtitle={subtitle}
          currency={currency}
          titleFontSize={titleFontSize}
          subtitleFontSize={subtitleFontSize}
          subtitleColor={subtitleColor}
          barHeight={barHeight}
          barGap={barGap}
          barLabelFontSize={barLabelFontSize}
          barValueFontSize={barValueFontSize}
          fontFamily={fontFamily}
        />
      </div>
    </div>
    </div>
  );
};
