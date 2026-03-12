
interface AristotleAvatarProps {
    size?: number;
    speaking?: boolean;
}

const DOTS = 12;
const DOT_SIZE = 6; // px

export function AristotleAvatar({ size = 72, speaking = false }: AristotleAvatarProps) {
    const radius = size * 0.38;
    const center = size / 2;
    const dotColor = speaking ? "#22d3ee" : "#a78bfa";

    return (
        <div style={{ width: size, height: size, position: "relative", flexShrink: 0 }}>
            <style>{`
                @keyframes aristotle-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes aristotle-blink {
                    0%, 90%, 100% { transform: scaleY(1); }
                    95% { transform: scaleY(0.08); }
                }
                @keyframes aristotle-look {
                    0%, 30% { transform: translateX(0); }
                    40%, 60% { transform: translateX(3px); }
                    70%, 100% { transform: translateX(-2px); }
                }
                @keyframes aristotle-pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
                @keyframes aristotle-speak {
                    0%, 100% { transform: scaleY(1) scaleX(1); }
                    25% { transform: scaleY(1.4) scaleX(0.9); }
                    50% { transform: scaleY(0.7) scaleX(1.1); }
                    75% { transform: scaleY(1.2) scaleX(0.95); }
                }
            `}</style>

            {/* Spinning ring */}
            <div style={{
                position: "absolute", inset: 0,
                animation: "aristotle-spin 10s linear infinite",
            }}>
                {Array.from({ length: DOTS }).map((_, i) => {
                    const angle = (i / DOTS) * 2 * Math.PI;
                    const x = center + radius * Math.cos(angle) - DOT_SIZE / 2;
                    const y = center + radius * Math.sin(angle) - DOT_SIZE / 2;
                    const opacity = 0.35 + (i / DOTS) * 0.65;
                    const scale = 0.6 + (i / DOTS) * 0.5;
                    return (
                        <div key={i} style={{
                            position: "absolute",
                            left: x,
                            top: y,
                            width: DOT_SIZE,
                            height: DOT_SIZE,
                            borderRadius: "35%",
                            backgroundColor: dotColor,
                            opacity,
                            transform: `scale(${scale})`,
                            boxShadow: speaking ? `0 0 6px ${dotColor}` : "none",
                            transition: "background-color 0.4s, box-shadow 0.4s",
                        }} />
                    );
                })}
            </div>

            {/* Face */}
            <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: size * 0.09,
            }}>
                {/* Left eye */}
                <div style={{
                    width: size * 0.1,
                    height: size * 0.14,
                    borderRadius: "50%",
                    backgroundColor: dotColor,
                    animation: speaking
                        ? "aristotle-speak 0.3s ease-in-out infinite"
                        : "aristotle-blink 4s ease-in-out infinite, aristotle-look 5s ease-in-out infinite",
                    boxShadow: `0 0 8px ${dotColor}80`,
                    transition: "background-color 0.4s",
                    animationDelay: "0s, 0.3s",
                }} />
                {/* Right eye */}
                <div style={{
                    width: size * 0.1,
                    height: size * 0.14,
                    borderRadius: "50%",
                    backgroundColor: dotColor,
                    animation: speaking
                        ? "aristotle-speak 0.3s ease-in-out infinite 0.1s"
                        : "aristotle-blink 4s ease-in-out 0.5s infinite, aristotle-look 5s ease-in-out 0.3s infinite",
                    boxShadow: `0 0 8px ${dotColor}80`,
                    transition: "background-color 0.4s",
                }} />
            </div>
        </div>
    );
}

export default AristotleAvatar;
