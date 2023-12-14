import Keyframe from "./keyframe";

export default class SongMapSection<KeyframeData = any> {

    public keyframes: Keyframe<KeyframeData>[] = [];

    constructor(options: {
        keyframes: Keyframe<KeyframeData>[]
    }) {
        this.keyframes = options.keyframes;
    }

    toJSON(): any {
        return {
            keyframes: this.keyframes.map(keyframe => keyframe.toJSON())
        }
    }
}