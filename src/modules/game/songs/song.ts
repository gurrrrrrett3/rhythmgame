import SongMap from "../map/map";

export default class Song {

    audioPath: string;
    title: string;
    artist: string;
    bpm: number;
    offset: number;
    difficulty: number;
    difficultyName: string;
    map!: SongMap;
    
    constructor(options: {
        audioPath: string,
        title: string,
        artist: string,
        bpm: number,
        offset: number,
        difficulty: number,
        difficultyName: string,
    }) {
        this.audioPath = options.audioPath;
        this.title = options.title;
        this.artist = options.artist;
        this.bpm = options.bpm;
        this.offset = options.offset;
        this.difficulty = options.difficulty;
        this.difficultyName = options.difficultyName;
    }

    toJSON(): any {
        return {
            audioPath: this.audioPath,
            title: this.title,
            artist: this.artist,
            bpm: this.bpm,
            offset: this.offset,
            difficulty: this.difficulty,
            difficultyName: this.difficultyName,
            map: this.map.toJSON()
        }
    }
}
