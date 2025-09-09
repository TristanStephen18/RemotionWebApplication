import React from "react";
import { Player } from "@remotion/player";
import { TrendGraphRemotion, type GraphProps } from "../../remotion_compositions/CurveLineTrendTemplate";

const GraphComponent: React.FC<GraphProps> = (props) => {
  return <TrendGraphRemotion {...props} />;
};

// 2. Player wrapper
const RemotionGraphPlayer: React.FC<
  GraphProps & { duration: number }
> = ({ duration, ...graphProps }) => {
  return (
    <Player
      component={GraphComponent}
      inputProps={{ ...graphProps }}
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

// 3. Preview with background cycling
export const TrendGraphPreview: React.FC<
  GraphProps & {
    duration: number;
    previewBg: string;
    cycleBg: () => void;
  }
> = ({ duration, previewBg, cycleBg, ...graphProps }) => {
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
          width: "270px",
          height: "480px",
          border: "3px solid #222",
          borderRadius: "24px",
          overflow: "hidden",
          background: "#000",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <RemotionGraphPlayer {...graphProps} duration={duration} />
      </div>
    </div>
  );
};

