import React from "react";
import { Player } from "@remotion/player";
import { StoryTellingVideo } from "../../remotion_compositions/StoryTellingTemplate";

// ------------------ Wrapper ------------------
const StoryTellingComponent: React.FC<{
  script: any;
  voiceoverPath: string;
  duration: number;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  sentenceBgColor?: string;
  backgroundOverlayColor?: string;
  backgroundMusicPath?: string;
  backgroundVideo: string;
  musicVolume?: number;
}> = ({
  script,
  voiceoverPath,
  duration,
  fontSize,
  fontFamily,
  fontColor,
  sentenceBgColor,
  backgroundOverlayColor,
  backgroundMusicPath,
  backgroundVideo,
  musicVolume,
}) => {
  return (
    <StoryTellingVideo
      script={script}
      voiceoverPath={voiceoverPath}
      duration={duration}
      fontSize={fontSize ?? 68}
      fontFamily={
        fontFamily ??
        '"Comic Neue", "Comic Sans MS", "Poppins", sans-serif'
      }
      fontColor={fontColor ?? "white"}
      sentenceBgColor={sentenceBgColor ?? "#FF8C00"}
      backgroundOverlayColor={backgroundOverlayColor ?? "rgba(0,0,0,0.6)"}
      backgroundMusicPath={backgroundMusicPath}
      backgroundVideo={backgroundVideo}
      musicVolume={musicVolume ?? 0.15}
    />
  );
};

// ------------------ Player Wrapper ------------------
const RemotionRedditPlayer: React.FC<{
  script: any;
  voiceoverPath: string;
  duration: number;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  sentenceBgColor?: string;
  backgroundOverlayColor?: string;
  backgroundMusicPath?: string;
  backgroundVideo: string;
  musicVolume?: number;
}> = (props) => {
  return (
    <Player
      component={StoryTellingComponent}
      inputProps={props}
      durationInFrames={30 * props.duration}
      compositionWidth={1080}
      compositionHeight={1920}
      fps={30}
      controls
      autoPlay
      loop
      initiallyMuted
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

// ------------------ Final Preview Component ------------------
export const StoryTellingPreview: React.FC<{
  duration: number;
  previewBg: string;
  cycleBg: () => void;
  previewScale: number;

  // forward all props you want live controlled
  script: any;
  voiceoverPath: string;
  backgroundVideo: string;
  backgroundMusicPath?: string;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  sentenceBgColor?: string;
  backgroundOverlayColor?: string;
  musicVolume?: number;
}> = ({
  duration,
  previewBg,
  cycleBg,
  previewScale,
  script,
  voiceoverPath,
  backgroundVideo,
  backgroundMusicPath,
  fontSize,
  fontFamily,
  fontColor,
  sentenceBgColor,
  backgroundOverlayColor,
  musicVolume,
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
      {/* Background toggle button */}
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

      {/* Phone-like preview frame */}
      <div
        style={{
          transform: `scale(${previewScale})`,
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
          <RemotionRedditPlayer
            script={script}
            voiceoverPath={voiceoverPath}
            duration={duration}
            backgroundVideo={backgroundVideo}
            backgroundMusicPath={backgroundMusicPath}
            fontSize={fontSize}
            fontFamily={fontFamily}
            fontColor={fontColor}
            sentenceBgColor={sentenceBgColor}
            backgroundOverlayColor={backgroundOverlayColor}
            musicVolume={musicVolume}
          />
        </div>
      </div>
    </div>
  );
};
