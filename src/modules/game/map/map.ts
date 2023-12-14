import Keyframe from "./keyframe";
import SongMapSection from "./section";

export default class SongMap {

    public sections: SongMapSection[] = [];

    constructor(options: {
        sections: SongMapSection[]
    }) {
        this.sections = options.sections;
    }

    toJSON(): any {
        return {
            sections: this.sections.map(section => section.toJSON())
        }
    }

    fromJSON(json: any): SongMap {
        this.sections = json.sections.map((section: any) => {
            return new SongMapSection({
                keyframes: section.keyframes.map((keyframe: any) => {
                    return new Keyframe({
                        time: keyframe.time,
                        data: keyframe.data
                    })
                })
            })
        });
        return this;
    }

}