import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const MARKERS = [
  { location: [42.35, -71.1] as [number, number], size: 0.08 },
  { location: [40.73, -73.99] as [number, number], size: 0.08 },
  { location: [30.28, -97.74] as [number, number], size: 0.07 },
  { location: [49.26, -123.24] as [number, number], size: 0.08 },
  { location: [-33.89, 151.19] as [number, number], size: 0.08 },
  { location: [-37.8, 144.96] as [number, number], size: 0.07 },
  { location: [28.54, 77.19] as [number, number], size: 0.08 },
  { location: [19.13, 72.91] as [number, number], size: 0.08 },
  { location: [51.5, -0.12] as [number, number], size: 0.07 },
  { location: [1.3, 103.78] as [number, number], size: 0.07 },
];

export function Globe() {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;

    let phi = 0;
    let globe: ReturnType<typeof createGlobe> | null = null;

    const mountGlobe = () => {
      const size = Math.max(frame.offsetWidth, 320);

      globe?.destroy();
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: size * 2,
        height: size * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 3,
        mapSamples: 20000,
        mapBrightness: 12,
        baseColor: [0.05, 0.05, 0.1],
        markerColor: [0.13, 0.87, 0.93],
        glowColor: [0.7, 0.8, 1],
        markers: MARKERS,
        onRender: (state) => {
          state.phi = phi;
          phi += 0.0026;
        },
      });
    };

    mountGlobe();

    const resizeObserver = new ResizeObserver(() => {
      mountGlobe();
    });

    resizeObserver.observe(frame);

    return () => {
      resizeObserver.disconnect();
      globe?.destroy();
    };
  }, []);

  return (
    <div ref={frameRef} style={{ width: "100%", aspectRatio: "1 / 1", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
