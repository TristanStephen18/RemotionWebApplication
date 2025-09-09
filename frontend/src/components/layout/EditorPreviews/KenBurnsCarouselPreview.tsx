import React from "react";
import { Player } from "@remotion/player";
// import { KenBurnsCarousel2, KenBurnsCarouselProps } from "../../remotion_compositions/Comp2";
import { KenBurnsCarousel2 } from "../../remotion_compositions/KenBurnsSwipeTemplate";
import type { KenBurnsCarouselProps } from "../../remotion_compositions/KenBurnsSwipeTemplate";

// --- Wrapper to pass props into KenBurnsCarousel2 ---
const KenBurnsCarouselComponent: React.FC<KenBurnsCarouselProps> = ({
  images,
  cardWidthRatio,
  cardHeightRatio,
  blurBgOpacity,
}) => {
  return (
    <KenBurnsCarousel2
      images={images}
      cardWidthRatio={cardWidthRatio}
      cardHeightRatio={cardHeightRatio}
      blurBgOpacity={blurBgOpacity}
    />
  );
};

// --- Player wrapper for KenBurnsCarousel2 ---
const KenBurnsCarouselPlayer: React.FC<{
  images: string[];
  duration?: number;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  cardWidthRatio?: number;
  cardHeightRatio?: number;
  blurBgOpacity?: number;
}> = ({
  images,
  duration = 15, // seconds
  autoPlay = true,
  controls = true,
  loop = true,
  cardWidthRatio = 0.75,
  cardHeightRatio = 0.75,
  blurBgOpacity = 0.0,
}) => {
  const fps = 30;
  return (
    <Player
      component={KenBurnsCarouselComponent}
      inputProps={{
        images,
        cardWidthRatio,
        cardHeightRatio,
        blurBgOpacity,
      }}
      durationInFrames={fps * duration}
      compositionWidth={1080}
      compositionHeight={1920}
      fps={fps}
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

// --- Preview container with phone mockup + bg toggle ---
export const KenBurnsCarouselPreview: React.FC<{
  images: string[];
  duration: number;
  previewBg: string;
  cycleBg: () => void;
  cardWidthRatio?: number;
  cardHeightRatio?: number;
  blurBgOpacity?: number;
  previewScale:number;
}> = ({
  images,
  duration,
  previewBg,
  cycleBg,
  cardWidthRatio,
  cardHeightRatio,
  blurBgOpacity,
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
        <KenBurnsCarouselPlayer
          images={images}
          duration={duration}
          cardWidthRatio={cardWidthRatio}
          cardHeightRatio={cardHeightRatio}
          blurBgOpacity={blurBgOpacity}
        />
      </div>
    </div>
    </div>
  );
};
