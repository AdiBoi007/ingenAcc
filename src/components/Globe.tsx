import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const MARKERS = [
    { location: [42.35, -71.10] as [number, number], size: 0.08 },
    { location: [40.73, -73.99] as [number, number], size: 0.08 },
    { location: [30.28, -97.74] as [number, number], size: 0.07 },
    { location: [49.26, -123.24] as [number, number], size: 0.08 },
    { location: [-33.89, 151.19] as [number, number], size: 0.08 },
    { location: [-37.80, 144.96] as [number, number], size: 0.07 },
    { location: [28.54, 77.19] as [number, number], size: 0.08 },
    { location: [19.13, 72.91] as [number, number], size: 0.08 },
    { location: [51.50, -0.12] as [number, number], size: 0.07 },
    { location: [1.30, 103.78] as [number, number], size: 0.07 },
];

export function Globe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;
        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1200,
            height: 1200,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 3,            // HIGH — needed to make land clearly visible
            mapSamples: 20000,
            mapBrightness: 12,     // HIGH — makes continents bright white
            baseColor: [0.05, 0.05, 0.1],
            markerColor: [0.13, 0.87, 0.93],
            glowColor: [0.7, 0.8, 1.0],
            markers: MARKERS,
            onRender: (state) => {
                state.phi = phi;
                phi += 0.001;
            },
        });

        return () => globe.destroy();
    }, []);

    return (
        <div style={{ width: "100%", aspectRatio: "1/1", position: "relative" }}>
            <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
}
