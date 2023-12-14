import Logger from "../util/classes/logger";

export default class SettingsManager<S extends {
    [key: string]: {
        value: any,
        defaultValue: any,
    }
}> {

    private _settings: S;

    constructor() {
        this._settings = {} as S;
    }

    public get<T extends keyof S>(key: T): S[T]["value"] {
        if (!this._settings[key]) throw new Error(`Setting ${key.toString()} does not exist!`);
        return this._settings[key].value
    }

    public set<T extends keyof S>(key: T, value: S[T]["value"]): void {
        if (!this._settings[key]) throw new Error(`Setting ${key.toString()} does not exist!`);
        this._settings[key].value = value;
        localStorage.setItem(`settings.${String(key)}`, JSON.stringify(value));
    }

    public register<T extends keyof S>(key: T, defaultValue: S[T]["defaultValue"]): void {
        this._settings[key] = {
            value: defaultValue,
            defaultValue
        } as S[T];
    }

    public unregister<T extends keyof S>(key: T): void {
        delete this._settings[key];
        localStorage.removeItem(`settings.${key.toString()}`);
    }

    public load(): void {
        Object.keys(this._settings).forEach(key => {
            let value = localStorage.getItem(`settings.${key}`);
            if (value) {

                if (this._settings[key].defaultValue == value) {
                    localStorage.removeItem(`settings.${key}`);
                    Logger.log("Settings", `Removed setting ${key} from localStorage because it was the default value.`);
                    return;
                }

                this._settings[key].value = JSON.parse(value);
            }
        });
    }
}