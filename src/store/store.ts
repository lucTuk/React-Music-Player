import { makeAutoObservable } from "mobx";

import type { Track } from "../types/track";

class MusicPlayerStore {
    isPlaying: boolean = false;
    currentTrack: Track | null = null;
    duration: number = 0;
    currentTime: number = 0;
    audio: HTMLAudioElement | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    initAudio(src: string) {
        this.audio = new Audio(src);
        this.audio.addEventListener("loadedmetadata", () => {
            this.duration = this.audio?.duration || 0;
            this.currentTime = this.audio?.currentTime || 0;
        });
    }

    play(track: Track) {
        if (!this.audio || this.currentTrack?.src !== track.src) {
            this.initAudio(track.src);
        }

        this.currentTrack = track;
        this.isPlaying = true;
        this.audio?.play();
    }

    pause() {
        this.isPlaying = false;
        this.audio?.pause();
    }

    updateTime() {
        if (this.audio) {
            this.currentTime = this.audio.currentTime;
            this.duration = this.audio.duration;
        }
    }
}

export const musicPlayerStore = new MusicPlayerStore();
