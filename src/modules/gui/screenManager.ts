import Game from "../../game";
import Logger from "../util/classes/logger";
import GuiManager from "./guiManager";
import Screen from "./screens/screen";
import TitleScreen from "./screens/title.screen";

export default class ScreenManager {

    public static screens: { [key: string]: Screen } = {};
    private static _currentScreen: Screen;

    constructor(private _game: Game) {

        this.loadScreens();

        _game.registerDrawHook("screenManager", 0, (ctx, delta) => {
            if (!ScreenManager._currentScreen) return;
            ctx.fillText(`Current screen: ${ScreenManager._currentScreen.name}`, 10, 10);
        })

        _game.on("game:load", () => {
            _game.screen.screen = ScreenManager.screens["title"];
        })
    }

    public loadScreens(): void {
        ScreenManager.addScreen(new TitleScreen())
    }

    public static addScreen(screen: Screen) {
        ScreenManager.screens[screen.name] = screen;
    }

    public setScreen(name: string): void {
        this.screen = ScreenManager.screens[name];
    }

    public set screen(screen: Screen) {
        if (ScreenManager._currentScreen) {
            ScreenManager._currentScreen.destroy(this._game.gui);
        }

        ScreenManager._currentScreen = screen;
        ScreenManager._currentScreen.build(this._game.gui);

        Logger.debug("ScreenManager", `Set screen to ${screen.name}`)
    }

    public get screen(): Screen {
        return ScreenManager._currentScreen;
    }

}