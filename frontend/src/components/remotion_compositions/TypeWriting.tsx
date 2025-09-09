// TypingAnimation.tsx
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate } from "remotion";

type TypingAnimationProps = {
  content: string;
  backgroundImage: string;
  duration: number;
  fps: number;
  fontSize: number;
  fontColor: string;
  fontFamily: string;
  sound: string;
  showSafeMargins: boolean;
};

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  content,
  backgroundImage,
  duration,
  fps,
  fontSize,
  fontColor,
  fontFamily,
  sound,
  showSafeMargins = true
}) => {
  const frame = useCurrentFrame();
  const durationInFrames = duration * fps;

  // Typing should finish earlier: e.g. 70% of duration
  const typingFrames = durationInFrames * 0.85;

  // Progress goes 0 → 1 over typingFrames
  const progress = interpolate(frame, [0, typingFrames], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Characters revealed based on progress
  const charactersToShow = Math.floor(progress * content.length);

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
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
      {/* Background typing sound (looped) */}
      {sound && <Audio src={staticFile(sound)} loop />}

      <div
        style={{
          fontSize,
          color: fontColor,
          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          whiteSpace: "pre-wrap",
          fontFamily,
          textAlign: "center",
          display: "inline-block",
        }}
      >
        {content.slice(0, charactersToShow)}
        <span
          style={{
            fontFamily,
            fontSize,
            color: fontColor,
            opacity: frame % 30 < 15 ? 1 : 0,
          }}
        >
          |
        </span>
      </div>
    </AbsoluteFill>
  );
};
