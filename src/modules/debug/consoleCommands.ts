import { Settings } from "../settings/defaultSettings";

window.set = <S extends keyof Settings>(setting: S, value: Settings[S]["value"]): void => {
    game.settings.set(setting, value);
}

window.get = <S extends keyof Settings>(setting: S): Settings[S]["value"] => {
    return game.settings.get(setting);
}

window.drawHooks = (): void => {
    game.debug.listDrawHooks();
}

window.updateHooks = (): void => {
    game.debug.listUpdateHooks();
}