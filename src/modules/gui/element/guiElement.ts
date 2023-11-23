import Vector2 from "../../util/classes/vector2";
import GuiManager from "../guiManager";

export default class GUIElement {

    public readonly id: string = Math.random().toString(15).substr(2, 6)

    public name = "GUIElement";
    public anchor: Anchor;
    public position: Vector2;
    public size: Vector2;
    public parent: GUIElement | null;

    private _children: GUIElement[];

    constructor(anchor: Anchor, position: Vector2, size: Vector2, parent: GUIElement | null = null) {
        this.anchor = anchor;
        this.position = position;
        this.size = size;
        this.parent = parent;
        this._children = [];
    }

    public get anchorPosition(): Vector2 {
        return this.position.add(this.size.mul(ANCHOR_MAP[this.anchor]));
    }

    public get absolutePosition(): Vector2 {
        // get correct corner based on anchor
        let corner = ANCHOR_MAP[this.anchor];
        // get position of corner based on size and anchor
        let cornerPosition = this.position.sub(this.size.mul(corner));
        
        // get left and top padding based on anchor
        let padding = corner.mul(this.size);
        return cornerPosition.add(padding);
    }

    public get absoluteSize(): Vector2 {
        return this.size.mul(Vector2.double(GuiManager.unitSize))
    }

    public get screenPosition(): Vector2 {
        return this.absolutePosition.mul(Vector2.windowSize);
    }

    public get absoluteBounds(): { x: number, y: number, width: number, height: number } {
        let position = this.absolutePosition;
        let size = this.absoluteSize;
        return {
            x: position.x,
            y: position.y,
            width: size.x,
            height: size.y
        };
    }

    public get relativePosition(): Vector2 {
        return this.position;
    }

    public get relativeSize(): Vector2 {
        return this.size;
    }

    public get relativeBounds(): { x: number, y: number, width: number, height: number } {
        let position = this.relativePosition;
        let size = this.relativeSize;
        return {
            x: position.x,
            y: position.y,
            width: size.x,
            height: size.y
        };
    }

    public get children(): GUIElement[] {
        return this._children;
    }

    public addChild<T extends GUIElement>(child: T): T {
        child.parent = this;
        this._children.push(child);
        return child;
    }

    public removeChild<T extends GUIElement>(child: T): T {
        child.parent = null;
        this._children = this._children.filter(c => c.id !== child.id);
        return child;
    }

    public getElementById(id: string): GUIElement | null {
        if (this.id === id) {
            return this;
        } else {
            for (let child of this._children) {
                let element = child.getElementById(id);
                if (element) {
                    return element;
                }
            }
        }
        return null;
    }

    public render(ctx: CanvasRenderingContext2D, delta: number): void {
        this._children.forEach(child => child.render(ctx, delta));

        if (game.settings.get("debug.showDebugInfo")) {
            ctx.save();
            ctx.font = "24px monospace";
            ctx.strokeStyle = `#${this.id}`
            ctx.fillStyle = `#${this.id}`
            ctx.lineWidth = 2;
    
            ctx.strokeRect(this.screenPosition.x, this.screenPosition.y, this.absoluteSize.x, this.absoluteSize.y);

            // draw anchor
            ctx.arc(this.anchorPosition.x * Vector2.windowSize.x, this.anchorPosition.y * Vector2.windowSize.y, 5, 0, 2 * Math.PI);
            
            ctx.beginPath();
            ctx.measureText(this.id)
            ctx.fillText(this.id, this.screenPosition.x + 5, this.screenPosition.y + 24);
            ctx.font = "12px monospace";
            ctx.fillText(this.name, this.screenPosition.x + 5, this.screenPosition.y + 36);
            ctx.fillText(`pos: ${this.position.x.toFixed(2)}u, ${this.position.y.toFixed(2)}u`, this.screenPosition.x + 5, this.screenPosition.y + 48);
            ctx.fillText(`size: ${this.size.x.toFixed(2)}u, ${this.size.y.toFixed(2)}u`, this.screenPosition.x + 5, this.screenPosition.y + 60);
            ctx.fillText(`anchor: ${this.anchor} | ${this.anchorPosition.x} | ${this.anchorPosition.y}`, this.screenPosition.x + 5, this.screenPosition.y + 72);

            ctx.restore();
        }
       
    }
}

export enum Anchor {
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    CENTER,
    TOP_CENTER,
    BOTTOM_CENTER,
    LEFT_CENTER,
    RIGHT_CENTER
}

export const ANCHOR_MAP: { [key: number]: Vector2 } = {
    [Anchor.TOP_LEFT]: Vector2.zero,
    [Anchor.TOP_RIGHT]: new Vector2(1, 0),
    [Anchor.BOTTOM_LEFT]: new Vector2(0, 1),
    [Anchor.BOTTOM_RIGHT]: Vector2.one,
    [Anchor.CENTER]: new Vector2(0.5, 0.5),
    [Anchor.TOP_CENTER]: new Vector2(0.5, 0),
    [Anchor.BOTTOM_CENTER]: new Vector2(0.5, 1),
    [Anchor.LEFT_CENTER]: new Vector2(0, 0.5),
    [Anchor.RIGHT_CENTER]: new Vector2(1, 0.5)
}