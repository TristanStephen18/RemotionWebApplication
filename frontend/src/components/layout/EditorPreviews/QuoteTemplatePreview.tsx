import React from "react";
import { Player } from "@remotion/player";
import { QuoteComposition } from "../../remotion_compositions/QuoteTemplate";

// A wrapper around the Remotion composition so Player can inject props
const QuoteCompositionComponent: React.FC<{
  quote: string;
  author: string;
  backgroundImage: string;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
}> = ({ quote, author, backgroundImage, fontSize, fontFamily, fontColor }) => {
  return (
    <QuoteComposition
      quote={quote}
      author={author}
      backgroundImage={backgroundImage}
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontColor={fontColor}
    />
  );
};

const RemotionQuotePlayer: React.FC<{
  quote: string;
  author: string;
  backgroundImage: string;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
}> = ({
  quote,
  author,
  backgroundImage,
  fontSize,
  fontFamily,
  fontColor,
  autoPlay = true,
  controls = true,
  loop = true,
}) => {
  return (
    <Player
      component={QuoteCompositionComponent}
      inputProps={{
        quote,
        author,
        backgroundImage,
        fontSize,
        fontFamily,
        fontColor,
      }}
      durationInFrames={270}
      compositionWidth={1080}
      compositionHeight={1920}
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

export const QuoteSpotlightPreview: React.FC<{
  quote: string;
  author: string;
  backgroundImage: string;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  showSafeMargins: boolean;
  previewBg: string;
  cycleBg: () => void;
  previewScale: number;
}> = ({
  quote,
  author,
  backgroundImage,
  fontSize,
  fontFamily,
  fontColor,
  showSafeMargins,
  previewBg,
  cycleBg,
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
      {/* Theme cycle button */}
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

      {/* Phone-like preview container */}
      <div
        style={{
          width: "270px",
          height: "480px",
          border: "3px solid #222",
          borderRadius: "24px",
          overflow: "hidden",
          background: "#000",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <RemotionQuotePlayer
          quote={quote}
          author={author}
          backgroundImage={backgroundImage}
          fontSize={fontSize}
          fontFamily={fontFamily}
          fontColor={fontColor}
        />

        {/* Optional safe margins overlay */}
        {showSafeMargins && (
          <div
            style={{
              position: "absolute",
              inset: "5%",
              border: "2px dashed rgba(255,255,255,0.25)",
              pointerEvents: "none",
              zIndex: 10,
            }}
          />
        )}
      </div>
    </div>
    </div>
  );
};
