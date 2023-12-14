import AudioManager from "./audioManager";

export default class SongAudioPlayer {

    public audio: HTMLAudioElement;
    public startTime: number;
    public pausedTime: number;
    public paused: boolean = false;

    constructor(audio: HTMLAudioElement) {
        this.audio = audio;
        this.startTime = 0;
        this.pausedTime = 0;
    }

    public static async fromPath(path: string) {
        const audio = await AudioManager.loadAudio(path);
        audio.loop = false;
        return new SongAudioPlayer(audio);
    }

    public play() {
        if (this.paused) {
            this.audio.currentTime = this.pausedTime;
            this.paused = false;
        } else {
            this.startTime = Date.now();
            this.audio.play();
        }
    }

    public pause() {
        this.pausedTime = this.audio.currentTime;
        this.paused = true;
        this.audio.pause();
    }

    public stop() {
        this.pausedTime = 0;
        this.paused = false;
        this.audio.pause();
    }

    public get currentTime() {
        if (this.paused) {
            return this.pausedTime;
        } else {
            return this.audio.currentTime;
        }
    }

    public get duration() {
        return this.audio.duration;
    }

    public get playing() {
        return !this.paused;
    }

    public get ended() {
        return this.audio.ended;
    }

    public get progress() {
        return this.currentTime / this.duration;
    }

    public get remaining() {
        return this.duration - this.currentTime;
    }

    public get remainingString() {
        return this.timeToString(this.remaining);
    }

    public get currentString() {
        return this.timeToString(this.currentTime);
    }

    public get durationString() {
        return this.timeToString(this.duration);
    }

    private timeToString(time: number) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

}