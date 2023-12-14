export default class Keyframe<Data = any> {

    public time: number;
    public data: Data;

    constructor(options: {
        time: number,
        data: Data
    }) {
        this.time = options.time;
        this.data = options.data;
    }

    toJSON(): any {
        return {
            time: this.time,
            data: this.data
        }
    }
}