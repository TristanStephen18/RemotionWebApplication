import React from "react";
import { Player } from "@remotion/player";
// import { TypingAnimationComposition } from "../../remotion_compositions/TextTypingTemplate";
// import { TypingAnimation } from "../../remotion_compositions/TypeWriting";
import { SplitScreen } from "../../remotion_compositions/SplitScreen";
// import type { duration } from "@mui/material";

const SplitScreenComponent: React.FC<{
  bottomVideoUrl: string;
  topVideoUrl: string;
  bottomHeightPercent: number;
  bottomOpacity: number;
  bottomVolume: number;
  swap: boolean;
  topHeightPercent: number;
  topOpacity: number;
  topVolume: number;
}> = ({
  bottomHeightPercent,
  bottomOpacity,
  bottomVideoUrl,
  bottomVolume,
  swap,
  topHeightPercent,
  topOpacity,
  topVideoUrl,
  topVolume,
}) => {
  return (
    <SplitScreen
      bottomVideoUrl={bottomVideoUrl}
      topVideoUrl={topVideoUrl}
      bottomHeightPercent={bottomHeightPercent}
      bottomOpacity={bottomOpacity}
      bottomVolume={bottomVolume}
      swap={swap}
      topHeightPercent={topHeightPercent}
      topOpacity={topOpacity}
      topVolume={topVolume}
    />
  );
};

const RemotionSplitScreenPlayer: React.FC<{
  bottomVideoUrl: string;
  topVideoUrl: string;
  bottomHeightPercent: number;
  bottomOpacity: number;
  bottomVolume: number;
  swap: boolean;
  topHeightPercent: number;
  topOpacity: number;
  topVolume: number;
  duration: number;
}> = ({
  bottomHeightPercent,
  bottomOpacity,
  bottomVideoUrl,
  bottomVolume,
  swap,
  topHeightPercent,
  topOpacity,
  topVideoUrl,
  topVolume,
  duration,
}) => {
  return (
    <Player
      component={SplitScreenComponent}
      inputProps={{
        bottomHeightPercent,
        bottomOpacity,
        bottomVideoUrl,
        bottomVolume,
        swap,
        topHeightPercent,
        topOpacity,
        topVideoUrl,
        topVolume,
      }}
      durationInFrames={30 * duration}
      compositionWidth={1080}
      compositionHeight={1920}
      fps={30}
      controls={true}
      autoPlay={true}
      loop={true}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export const SPlitScreenPreview: React.FC<{
  bottomVideoUrl: string;
  topVideoUrl: string;
  bottomHeightPercent: number;
  bottomOpacity: number;
  bottomVolume: number;
  swap: boolean;
  topHeightPercent: number;
  topOpacity: number;
  topVolume: number;
  duration: number;
  previewBg: string;
  cycleBg: () => void;
  previewScale: number;
}> = ({
  previewScale,
  bottomVideoUrl,
  topVideoUrl,
  bottomHeightPercent,
  bottomOpacity,
  bottomVolume,
  swap,
  topHeightPercent,
  topOpacity,
  topVolume,
  duration,
  previewBg,
  cycleBg,
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
        <RemotionSplitScreenPlayer
          bottomHeightPercent={bottomHeightPercent}
          bottomOpacity={bottomOpacity}
          bottomVideoUrl={bottomVideoUrl}
          bottomVolume={bottomVolume}
          duration={duration}
          swap={swap}
          topHeightPercent={topHeightPercent}
          topOpacity={topOpacity}
          topVideoUrl={topVideoUrl}
          topVolume={topVolume}
        />
      </div>
    </div>
    </div>
  );
};
