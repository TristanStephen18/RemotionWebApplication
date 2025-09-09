import React from "react";
import { Player } from "@remotion/player";
import { ChatVideo2 } from "../../remotion_compositions/FakeChatConversation";
// import { chats } from "../../editors/FakeTextConversation/defaultdata";

// Wrapper for passing props into ChatVideo2
const ChatVideoComponent: React.FC<{
  chatdata?: any;
  bgVideo?: string;
  chatAudio?: string;
  musicAudio?: string;
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  chatTheme?: "default" | "discord" | "messenger" | "whatsapp";
  timeShiftSec?: number;
  avatars?: { left?: string; right?: string };
}> = ({
  chatdata,
  bgVideo,
  chatAudio,
  musicAudio,
  fontFamily,
  fontSize,
  fontColor,
  chatTheme,
  timeShiftSec,
  avatars,
}) => {
  return (
    <ChatVideo2
      chatdata={chatdata}
      bgVideo={bgVideo}
      chatAudio={chatAudio}
      musicAudio={musicAudio}
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontColor={fontColor}
      chatTheme={chatTheme}
      timeShiftSec={timeShiftSec}
      avatars={avatars}
    />
  );
};

// Player wrapper
const RemotionChatPlayer: React.FC<{
  chatdata?: any;
  bgVideo?: string;
  chatAudio?: string;
  musicAudio?: string;
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  chatTheme?: "default" | "discord" | "messenger" | "whatsapp";
  timeShiftSec?: number;
  avatars?: { left?: string; right?: string };
  duration: number;
}> = ({
  chatdata,
  bgVideo,
  chatAudio,
  musicAudio,
  fontFamily,
  fontSize,
  fontColor,
  chatTheme,
  timeShiftSec,
  avatars,
  duration,
}) => {
  return (
    <Player
      component={ChatVideoComponent}
      inputProps={{
        chatdata,
        bgVideo,
        chatAudio,
        musicAudio,
        fontFamily,
        fontSize,
        fontColor,
        chatTheme,
        timeShiftSec,
        avatars,
      }}
      durationInFrames={30 * duration}
      compositionWidth={1080}
      compositionHeight={1920}
      fps={30}
      controls
      autoPlay
      loop
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

// Final Preview component
export const ChatVideoPreview: React.FC<{
  duration: number;
  previewBg: string;
  cycleBg: () => void;
  previewScale: number;

  // 👇 forward all props you want to control live
  chatdata: any;
  avatars?: { left?: string; right?: string };
  bgVideo?: string;
  chatAudio?: string;
  musicAudio?: string;
  fontFamily?: string;
  fontSize?: number;
  fontColor?: string;
  chatTheme?: "default" | "discord" | "messenger" | "whatsapp";
  timeShiftSec?: number;
}> = ({
  duration,
  previewBg,
  cycleBg,
  previewScale,
  chatdata,
  avatars,
  bgVideo,
  chatAudio,
  musicAudio,
  fontFamily,
  fontSize,
  fontColor,
  chatTheme,
  timeShiftSec,
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
          <RemotionChatPlayer
            chatdata={chatdata}
            avatars={avatars}
            bgVideo={bgVideo}
            chatAudio={chatAudio}
            musicAudio={musicAudio}
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontColor={fontColor}
            chatTheme={chatTheme}
            timeShiftSec={timeShiftSec}
            duration={duration}
          />
        </div>
      </div>
    </div>
  );
};