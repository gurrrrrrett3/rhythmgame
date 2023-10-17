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
        return this._settings[key].value
    }

    public set<T extends keyof S>(key: T, value: S[T]["value"]): void {
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
    }

    public load(): void {
        Object.keys(this._settings).forEach(key => {
            let value = localStorage.getItem(`settings.${key}`);
            if (value) {
                this._settings[key].value = JSON.parse(value);
            }
        });
    }
}