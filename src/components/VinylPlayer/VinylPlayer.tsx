import { useState, useEffect } from "react";

import CDImage from "../../assets/cd.png";
import { musicPlayerStore } from "../../store/store";

interface Props {
    isPlaying: boolean;
    totalDots: number;
    rotationSpeedDefault?: number;
}

export function VinylPlayer({
    isPlaying,
    totalDots,
    rotationSpeedDefault = 8,
}: Props) {
    const [dotColors, setDotColors] = useState<string[]>(
        Array(totalDots).fill("#B6B6B6")
    );

    const [dotRadii, setDotRadii] = useState<number[]>(
        Array(totalDots).fill(0.5)
    );

    const [rotationSpeed, setRotationSpeed] = useState<number>(10);

    useEffect(() => {
        let animationFrameId: number;

        const updateProgress = () => {
            musicPlayerStore.updateTime();
            animationFrameId = requestAnimationFrame(updateProgress);
        };

        if (isPlaying) {
            animationFrameId = requestAnimationFrame(updateProgress);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPlaying]);

    useEffect(() => {
        if (musicPlayerStore.currentTime <= 0) return;

        const progress = Math.min(
            1,
            musicPlayerStore.currentTime / musicPlayerStore.duration
        );
        const activeDots = Math.floor(progress * totalDots);
        const newColors = Array.from({ length: totalDots }, (_, i) => {
            return i < activeDots ? "#050505" : "#B6B6B6";
        });
        const newRadii = Array.from({ length: totalDots }, (_, i) => {
            return i < activeDots ? 1 : 0.5;
        });

        setDotColors(newColors);
        setDotRadii(newRadii);
    }, [musicPlayerStore.currentTime, musicPlayerStore.duration]);

    useEffect(() => {
        if (musicPlayerStore.duration) {
            const speed = Math.max(3, 3 + musicPlayerStore.duration / 35);
            setRotationSpeed(speed);
        }
    }, [musicPlayerStore.duration]);

    return (
        <>
            <div className="relative h-[40vh] flex items-center justify-center">
                <img
                    src={CDImage}
                    alt="CD Cover"
                    className={`h-[24vh] transition-transform duration-${rotationSpeed}s linear infinite disk`}
                    style={{
                        animation: isPlaying
                            ? `spin-slow ${rotationSpeed}s linear infinite`
                            : `spin-slow ${rotationSpeedDefault}s linear infinite`,
                    }}
                />
                <div
                    className="absolute h-[38vh] w-[38vh] rounded-full"
                    style={{
                        background: "rgba(240, 240, 240, 0.3)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        boxShadow: "0 0 30px rgba(255, 255, 255, 0.4)",
                        mask: `radial-gradient(
                                    circle at 65% 28%, /* Позиция выреза */
                                    transparent 0%, 
                                    transparent 17%, 
                                    black 10%)`,
                    }}
                />

                <svg
                    className="absolute h-[45vh] pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {Array.from({ length: totalDots }).map((_, i) => {
                        const angle = ((i * 360) / totalDots - 90) % 360;
                        const rad = angle * (Math.PI / 180);
                        const x = 50 + 45 * Math.cos(rad);
                        const y = 50 + 45 * Math.sin(rad);
                        return (
                            <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r={dotRadii[i]}
                                className="transition-all duration-700 ease-in-out"
                                fill={dotColors[i]}
                            />
                        );
                    })}
                </svg>
            </div>
        </>
    );
}
