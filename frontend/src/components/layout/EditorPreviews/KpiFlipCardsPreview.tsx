import React from "react";
import { Player } from "@remotion/player";
import KpiFlipCards from "../../remotion_compositions/KpiFlipCards";
import type { CardData } from "../../remotion_compositions/KpiFlipCards";

const KpiFlipCardsComponent: React.FC<{
  backgroundImage: string;
  title: string;
  titleFontSize: number;
  titleFontColor: string;
  titleFontFamily: string;
  subtitle: string;
  subtitleFontSize: number;
  subtitleFontColor: string;
  subtitleFontFamily: string;
  cardsData: CardData[];
  cardWidth: number;
  cardHeight: number;
  cardBorderRadius: number;
  cardBorderColor: string;
  cardLabelColor: string;
  cardLabelFontSize: number;
  cardContentFontFamily: string;
  cardGrid: { rows: number; cols: number };
  delayStart: number;
  delayStep: number;
  fps: number;
  cardColorBack: string;
  cardColorFront: string;
  valueFontSize: number;
}> = (props) => {
  return <KpiFlipCards {...props} />;
};

const RemotionKpiFlipCardsPlayer: React.FC<{
  backgroundImage: string;
  title: string;
  titleFontSize: number;
  titleFontColor: string;
  titleFontFamily: string;
  subtitle: string;
  subtitleFontSize: number;
  subtitleFontColor: string;
  subtitleFontFamily: string;
  cardsData: CardData[];
  cardWidth: number;
  cardHeight: number;
  cardBorderRadius: number;
  cardBorderColor: string;
  cardLabelColor: string;
  cardLabelFontSize: number;
  cardContentFontFamily: string;
  cardGrid: { rows: number; cols: number };
  delayStart: number;
  delayStep: number;
  fps?: number;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
    cardColorBack: string;
  cardColorFront: string;
  valueFontSize: number;
}> = ({
  backgroundImage,
  title,
  titleFontSize,
  titleFontColor,
  titleFontFamily,
  subtitle,
  subtitleFontSize,
  subtitleFontColor,
  subtitleFontFamily,
  cardsData,
  cardWidth,
  cardHeight,
  cardBorderRadius,
  cardBorderColor,
  cardLabelColor,
  cardLabelFontSize,
  cardContentFontFamily,
  cardGrid,
  delayStart,
  delayStep,
  fps = 30,
  autoPlay = true,
  controls = true,
  loop = true,
  cardColorBack,
  cardColorFront,
  valueFontSize
}) => {
  // duration = delayStart + (cards-1)*delayStep + flipAnimationTime + freezeTime
  const flipAnimationTime = 2;
  const freezeTime = 3.5;
  const durationInSeconds =
    delayStart + (cardsData.length - 1) * delayStep + flipAnimationTime + freezeTime;

  return (
    <Player
      component={KpiFlipCardsComponent}
      inputProps={{
        backgroundImage,
        title,
        titleFontSize,
        titleFontColor,
        titleFontFamily,
        subtitle,
        subtitleFontSize,
        subtitleFontColor,
        subtitleFontFamily,
        cardsData,
        cardWidth,
        cardHeight,
        cardBorderRadius,
        cardBorderColor,
        cardLabelColor,
        cardLabelFontSize,
        cardContentFontFamily,
        cardGrid,
        delayStart,
        delayStep,
        fps,
        cardColorBack,
        cardColorFront,
        valueFontSize
      }}
      durationInFrames={Math.ceil(durationInSeconds * fps)}
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

export const KpiFlipCardsPreview: React.FC<{
  backgroundImage: string;
  title: string;
  titleFontSize: number;
  titleFontColor: string;
  titleFontFamily: string;
  subtitle: string;
  subtitleFontSize: number;
  subtitleFontColor: string;
  subtitleFontFamily: string;
  cardsData: CardData[];
  cardWidth: number;
  cardHeight: number;
  cardBorderRadius: number;
  cardBorderColor: string;
  cardLabelColor: string;
  cardLabelFontSize: number;
  cardContentFontFamily: string;
  cardGrid: { rows: number; cols: number };
  delayStart: number;
  delayStep: number;
  fps: number;
  previewBg: string;
  cycleBg: () => void;
    cardColorBack: string;
  cardColorFront: string;
  valueFontSize: number;
  previewScale:number;
}> = ({
  backgroundImage,
  title,
  titleFontSize,
  titleFontColor,
  titleFontFamily,
  subtitle,
  subtitleFontSize,
  subtitleFontColor,
  subtitleFontFamily,
  cardsData,
  cardWidth,
  cardHeight,
  cardBorderRadius,
  cardBorderColor,
  cardLabelColor,
  cardLabelFontSize,
  cardContentFontFamily,
  cardGrid,
  delayStart,
  delayStep,
  fps,
  previewBg,
  cycleBg,
  cardColorBack,
  cardColorFront,
  valueFontSize,
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
      {/* Background switch button */}
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

      {/* Phone-like frame */}
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
        <RemotionKpiFlipCardsPlayer
          backgroundImage={backgroundImage}
          title={title}
          titleFontSize={titleFontSize}
          titleFontColor={titleFontColor}
          titleFontFamily={titleFontFamily}
          subtitle={subtitle}
          subtitleFontSize={subtitleFontSize}
          subtitleFontColor={subtitleFontColor}
          subtitleFontFamily={subtitleFontFamily}
          cardsData={cardsData}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          cardBorderRadius={cardBorderRadius}
          cardBorderColor={cardBorderColor}
          cardLabelColor={cardLabelColor}
          cardLabelFontSize={cardLabelFontSize}
          cardContentFontFamily={cardContentFontFamily}
          cardGrid={cardGrid}
          delayStart={delayStart}
          delayStep={delayStep}
          fps={fps}
          cardColorBack={cardColorBack}
          cardColorFront={cardColorFront}
          valueFontSize={valueFontSize}
        />
      </div>
    </div>
    </div>
  );
};
