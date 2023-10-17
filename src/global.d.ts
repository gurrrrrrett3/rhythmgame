import Game from "./game";
import { Settings } from "./modules/settings/defaultSettings";

declare global {
    var game: Game;

    // commands
    var set: <S extends keyof Settings>(setting: S, value: Settings[S]["value"]) => void;
    var get: <S extends keyof Settings>(setting: S) => Settings[S]["value"];

    var drawHooks: () => void;
    var updateHooks: () => void;
}
