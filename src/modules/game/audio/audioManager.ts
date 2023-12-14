export default class AudioManager {

    public static async loadAudio(path: string): Promise<HTMLAudioElement> {
        return new Promise((resolve, reject) => {
            const audio = new Audio(path);
            audio.addEventListener("canplaythrough", () => {
                resolve(audio);
            });
            audio.addEventListener("error", () => {
                reject();
            });
        });
    }


}