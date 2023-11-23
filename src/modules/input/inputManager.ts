import Game from "../../game";
import GUIUtil from "../gui/guiUtil";
import Vector2 from "../util/classes/vector2";

export default class InputManager {

    public controlMode: ControlMode;

    private _mousePosition: Vector2 = Vector2.zero;
    private _mouseDelta: Vector2 = Vector2.zero;

    private _button1: boolean = false;
    private _button2: boolean = false;

    constructor(game: Game) {
        this.controlMode = {
            button: ButtonMode.NO_BUTTON,
            mouse: MouseMode.NO_MOUSE
        };

        window.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })

        window.addEventListener("mousedown", (e) => {
            if (game.settings.get("display.fullscreen")) {
                game.canvas.requestFullscreen();
            }

            if (!game.settings.get("controls.enableMouseButtons")) return;

            if (e.button === 0 && !this._button1) {
                this._button1 = true;
                game.emit("input:button:1:down", this._mousePosition.x, this._mousePosition.y);
            }
            if (e.button === 2 && !this._button2) {
                this._button2 = true;
                game.emit("input:button:2:down", this._mousePosition.x, this._mousePosition.y);
            }
        })

        window.addEventListener("mouseup", (e) => {

            if (!game.settings.get("controls.enableMouseButtons")) return;

            if (e.button === 0 && this._button1) {
                this._button1 = false;
                game.emit("input:button:1:up", this._mousePosition.x, this._mousePosition.y);
            }
            if (e.button === 2 && this._button2) {
                this._button2 = false;
                game.emit("input:button:2:up", this._mousePosition.x, this._mousePosition.y);
            }
        })

        window.addEventListener("mousemove", (e) => {
            this._mouseDelta = GUIUtil.pixelToPercent(new Vector2(e.movementX, e.movementY))
            this._mousePosition = GUIUtil.pixelToPercent(new Vector2(e.x, e.y)).mul(Vector2.double(game.settings.get("controls.mouseSensitivity")).bound(Vector2.one, Vector2.zero));
            game.emit("input:mouse:move", this._mousePosition.x, this._mousePosition.y);
        })

        window.addEventListener("keydown", (e) => {
            if (e.code === game.settings.get("controls.button1") && !this._button1) {
                this._button1 = true;
                game.emit("input:button:1:down", this._mousePosition.x, this._mousePosition.y);
            }
            if (e.code === game.settings.get("controls.button2") && !this._button2) {
                this._button2 = true;
                game.emit("input:button:2:down", this._mousePosition.x, this._mousePosition.y);
            }

        })

        window.addEventListener("keyup", (e) => {
            if (e.code === game.settings.get("controls.button1") && this._button1) {
                this._button1 = false;
                game.emit("input:button:1:up", this._mousePosition.x, this._mousePosition.y);
            }
            if (e.code === game.settings.get("controls.button2") && this._button2) {
                this._button2 = false;
                game.emit("input:button:2:up", this._mousePosition.x, this._mousePosition.y);
            }
        })

        game.registerDrawHook("renderMouse", 0, (ctx, delta) => {
            const realPos = GUIUtil.percentToPixel(this._mousePosition);
            ctx.save();
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(realPos.x, realPos.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        })
    }

    public setMouseMode(mode: MouseMode): void {
        this.controlMode.mouse = mode;
    }

    public setButtonMode(mode: ButtonMode): void {
        this.controlMode.button = mode;
    }

    get inputs() {
        return {
            mousePosition: this._mousePosition,
            mouseDelta: this._mouseDelta,
            button1: this._button1,
            button2: this._button2
        }
    }
}

export enum ButtonMode {
    NO_BUTTON,
    ONE_BUTTON,
    TWO_BUTTON
}

export enum MouseMode {
    NO_MOUSE,
    SCREEN,
    XY,
    X,
    Y
}

export interface ControlMode {
    button: ButtonMode;
    mouse: MouseMode;
}