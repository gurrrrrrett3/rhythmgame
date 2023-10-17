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

        window.addEventListener("mousedown", (e) => {
            // lock mouse
            game.canvas.requestPointerLock();
            
        })

        window.addEventListener("mousemove", (e) => {
            this._mouseDelta = GUIUtil.pixelToPercent(new Vector2(e.movementX, e.movementY))
            this._mousePosition = this._mousePosition.add(this._mouseDelta.mul(Vector2.double(game.settings.get("controls.mouseSensitivity")))).bound(Vector2.zero, Vector2.one);

            
        })

        window.addEventListener("keydown", (e) => {
            if (e.code === game.settings.get("controls.button1")) {
                this._button1 = true;
            }

            if (e.code === game.settings.get("controls.button2")) {
                this._button2 = true;
            }
        })

        window.addEventListener("keyup", (e) => {
            if (e.code === game.settings.get("controls.button1")) {
                this._button1 = false;
            }

            if (e.code === game.settings.get("controls.button2")) {
                this._button2 = false;
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