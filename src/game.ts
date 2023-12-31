import DebugHud from "./modules/debug/debugHud";
import GuiManager from "./modules/gui/guiManager";
import ScreenManager from "./modules/gui/screenManager";
import InputDisplay from "./modules/input/inputDisplay";
import InputManager from "./modules/input/inputManager";
import initalizeDefaultSettings, { Settings } from "./modules/settings/defaultSettings";
import SettingsManager from "./modules/settings/settingsManager";
import EventEmitter from "./modules/util/classes/eventEmitter";
import Logger from "./modules/util/classes/logger";
export default class Game extends EventEmitter<{
    "game:load": (game: Game) => any;
    "input:mouse:move": (x: number, y: number) => any
    "input:button:1:down": (x: number, y: number) => any
    "input:button:1:up": (x: number, y: number) => any
    "input:button:2:down": (x: number, y: number) => any
    "input:button:2:up": (x: number, y: number) => any
}> {

    private _lastFrameTime: number = 0;
    private _drawHooks: Array<{
        name: string,
        priority: number,
        callback: (ctx: CanvasRenderingContext2D, delta: number) => void
    }> = [];
    private _updateHooks: Array<{
        name: string,
        priority: number,
        callback: (delta: number) => void
    }> = [];

    public settings: SettingsManager<Settings>;
    public gui: GuiManager;
    public input: InputManager;
    public screen: ScreenManager;
    public currentMode: string = "none";

    constructor(public canvas: HTMLCanvasElement, public ctx: CanvasRenderingContext2D) {
        super()
        this.settings = new SettingsManager()
        this.gui = new GuiManager(this);
        this.input = new InputManager(this);
        this.screen = new ScreenManager(this);

        this.emit("game:load", this);
    }

    private tick(runtime: number) {
        let delta = runtime - this._lastFrameTime;
        this._lastFrameTime = runtime;

        this.update(delta);
        this.render(delta);

        requestAnimationFrame(this.tick.bind(this));
    }

    private render(delta: number): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this._drawHooks.forEach(hook => hook.callback(this.ctx, delta));
    }

    private update(delta: number): void {
        this._updateHooks.forEach(hook => hook.callback(delta));
    }

    public start(): void {

        initalizeDefaultSettings();
        this.settings.load();
        DebugHud.init()

        if (this.settings.get("debug.eventLogging")) {
            this.enableEventLogging = true;
        }

        this.tick(0);
    }

    public registerDrawHook(name: string, priority: number, callback: (ctx: CanvasRenderingContext2D, delta: number) => void): void {
        this._drawHooks.push({ name, priority, callback });
        this._drawHooks.sort((a, b) => b.priority - a.priority);
    }

    public unregisterDrawHook(name: string): void {
        this._drawHooks = this._drawHooks.filter(hook => hook.name !== name);
    }

    public registerUpdateHook(name: string, priority: number, callback: (delta: number) => void): void {
        this._updateHooks.push({ name, priority, callback });
        this._updateHooks.sort((a, b) => b.priority - a.priority);
    }

    public unregisterUpdateHook(name: string): void {
        this._updateHooks = this._updateHooks.filter(hook => hook.name !== name);
    }

    public debug = {
        listDrawHooks: () => {
            console.table(this._drawHooks.map((h) => ({ name: h.name, priority: h.priority })));
        },
        listUpdateHooks: () => {
            console.table(this._updateHooks.map((h) => ({ name: h.name, priority: h.priority })));
        }
    }
}

const canvas = document.createElement("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.id = "gameCanvas";
canvas.setAttribute("aria-label", "game canvas");
document.body.appendChild(canvas);

window.game = new Game(canvas, ctx as CanvasRenderingContext2D);
window.game.start();

// default ctx settings
game.ctx.imageSmoothingEnabled = false;
game.ctx.font = "24px monospace";

InputDisplay.init();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
