import React from "react";
import { Player } from "@remotion/player";
// import { TypingAnimationComposition } from "../../remotion_compositions/TextTypingTemplate";
import { TypingAnimation } from "../../remotion_compositions/TypeWriting";

const TypingAnimationComponent: React.FC<{
  content: string;
  backgroundImage: string;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  showSafeMargins: boolean;
  duration: number;
  sound: string;
  fps: number;
}> = ({  content, backgroundImage, fontSize, fontFamily, fontColor, showSafeMargins, duration, sound, fps }) => {
  return (
    <TypingAnimation
    sound={sound}
      content={content}
      backgroundImage={backgroundImage}
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontColor={fontColor}
      showSafeMargins={showSafeMargins}
      duration={duration}
      fps={fps}
    />
  );
};

const RemotionTypingAnimationPlayer: React.FC<{
  content: string;
  backgroundImage: string;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  showSafeMargins: boolean;
  duration: number;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  sound: string;
  fps: number;
}> = ({
  content,
  duration,
  backgroundImage,
  fontSize,
  fontFamily,
  fontColor,
  showSafeMargins,
  width = 270,
  height = 480,
  autoPlay = true,
  controls = true,
  loop = true,
  sound,
  fps = 30
}) => {
  return (
    <Player
      component={TypingAnimationComponent}
      inputProps={{
        content,
        backgroundImage,
        duration,
        fontSize,
        fontFamily,
        fontColor,
        showSafeMargins,
        sound,
        fps
      }}
      durationInFrames={30 * duration} 
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

export const TextTypingTemplatePreview: React.FC<{
  content: string;
  duration: number;
  backgroundImage: string;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  showSafeMargins: boolean;
  previewBg: string;
  cycleBg: () => void;
  sound: string;
  fps: number;
  previewScale: number; // ⭐ new prop
}> = ({
  content,
  duration,
  backgroundImage,
  fontSize,
  fontFamily,
  fontColor,
  showSafeMargins,
  previewBg,
  cycleBg,
  sound,
  fps,
  previewScale, // ⭐ used here
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
          <RemotionTypingAnimationPlayer
            content={content}
            backgroundImage={backgroundImage}
            fontColor={fontColor}
            fontFamily={fontFamily}
            fontSize={fontSize}
            duration={duration}
            showSafeMargins={showSafeMargins}
            sound={sound}
            fps={fps}
          />
        </div>
      </div>
    </div>
  );
};
