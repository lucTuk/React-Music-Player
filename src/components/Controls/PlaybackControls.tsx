import { Pause } from "lucide-react";
import { Play } from "lucide-react";
import { SkipBack } from "lucide-react";
import { SkipForward } from "lucide-react";
import { Grip } from "lucide-react";

interface Props {
    isPlaying: boolean;
    onSkipForward?: () => void;
    onSkipBack?: () => void;
    onTogglePlayback?: () => void;
}

export function PlaybackControls({
    isPlaying,
    onSkipBack,
    onSkipForward,
    onTogglePlayback,
}: Props) {
    return (
        <div className="flex items-center justify-center self-center bg-[#E4E4E4] w-[97vw] h-[40vh] rounded-2xl">
            <div className="w-60 h-60 bg-[#FFF] rounded-full relative before:absolute before:bg-[#e9e9e9] before:min-w-2/5 before:h-2/5 before:rounded-full before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 text-[#CECECE] drop-shadow-md">
                <Grip className="absolute top-[10%] left-1/2 transform -translate-x-1/2 hover:opacity-75" />
                <SkipForward
                    className="absolute top-1/2 right-[10%] transform -translate-y-1/2 hover:opacity-75 transition-opacity duration-100"
                    onClick={onSkipForward}
                />
                {isPlaying ? (
                    <Pause
                        className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 hover:opacity-75 transition-opacity duration-100"
                        onClick={onTogglePlayback}
                    />
                ) : (
                    <Play
                        className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 hover:opacity-75 transition-opacity duration-100"
                        onClick={onTogglePlayback}
                    />
                )}
                <SkipBack
                    className="absolute top-1/2 left-[10%] transform -translate-y-1/2 hover:opacity-75 transition-opacity duration-100"
                    onClick={onSkipBack}
                />
            </div>
        </div>
    );
}
