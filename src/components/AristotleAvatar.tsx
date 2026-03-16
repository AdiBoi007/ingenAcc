interface AristotleAvatarProps {
  size?: number;
  speaking?: boolean;
}

const DOTS = 12;
const DOT_SIZE = 5;

export function AristotleAvatar({ size = 72, speaking = false }: AristotleAvatarProps) {
  const radius = size * 0.38;
  const center = size / 2;
  const ringColor = speaking ? "#22d3ee" : "#a78bfa";
  const eyeColor = speaking ? "#22d3ee" : "#d8ccff";

  return (
    <div style={{ width: size, height: size, position: "relative", flexShrink: 0 }}>
      {Array.from({ length: DOTS }).map((_, index) => {
        const angle = (index / DOTS) * Math.PI * 2;
        const x = center + radius * Math.cos(angle) - DOT_SIZE / 2;
        const y = center + radius * Math.sin(angle) - DOT_SIZE / 2;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: 1,
              backgroundColor: ringColor,
              opacity: 0.35 + index * 0.045,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          inset: size * 0.2,
          border: "1px solid #1a1a1a",
          borderRadius: 2,
          background: "#090909",
          boxShadow: speaking ? "0 0 24px rgba(34, 211, 238, 0.08)" : "0 0 24px rgba(167, 139, 250, 0.05)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: size * 0.12,
        }}
      >
        <div
          style={{
            width: size * 0.08,
            height: size * 0.18,
            borderRadius: 1,
            backgroundColor: eyeColor,
            opacity: speaking ? 1 : 0.85,
          }}
        />
        <div
          style={{
            width: size * 0.08,
            height: size * 0.18,
            borderRadius: 1,
            backgroundColor: eyeColor,
            opacity: speaking ? 1 : 0.85,
          }}
        />
      </div>
    </div>
  );
}

export default AristotleAvatar;
