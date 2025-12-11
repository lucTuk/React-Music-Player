import { MusicHeader } from "./components/Header/MusicHeader";
import { VinylPlayer } from "./components/VinylPlayer/VinylPlayer";
import { musicPlayerStore } from "./store/store";
import { TrackInfo } from "./components/TrackInfo/TrackInfo";
import { PlaybackControls } from "./components/Controls/PlaybackControls";
import { tracks } from "./data/tracks";
import { useState } from "react";

function App() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const togglePlayback = () => {
        if (!musicPlayerStore.audio?.played || musicPlayerStore.audio?.paused) {
            musicPlayerStore.play(tracks[currentTrackIndex]);
        } else {
            musicPlayerStore.pause();
        }
    };

    const switchTrack = (offset: number) => {
        const newIndex =
            (currentTrackIndex + offset + tracks.length) % tracks.length;
        setCurrentTrackIndex(newIndex);

        if (musicPlayerStore.isPlaying) {
            musicPlayerStore.pause();
        }
        musicPlayerStore.play(tracks[newIndex]);
    };

    const skipBack = () => {
        switchTrack(-1);
    };

    const skipForward = () => {
        switchTrack(1);
    };

    return (
        <>
            <div className="flex flex-col justify-center min-h-screen">
                <div className="flex flex-col gap-[2vh] h-[60vh]">
                    <MusicHeader />
                    <div className="flex flex-col justify-center items-center gap-[3vh]">
                        <VinylPlayer
                            key={musicPlayerStore.currentTrack?.src}
                            isPlaying={musicPlayerStore.isPlaying}
                            totalDots={36}
                        />
                        <TrackInfo
                            title={musicPlayerStore.currentTrack?.title}
                            artist={musicPlayerStore.currentTrack?.artist}
                        />
                    </div>
                </div>
                <PlaybackControls
                    isPlaying={musicPlayerStore.isPlaying}
                    onTogglePlayback={() => togglePlayback()}
                    onSkipForward={() => skipForward()}
                    onSkipBack={() => skipBack()}
                />
            </div>
        </>
    );
}

export default App;
