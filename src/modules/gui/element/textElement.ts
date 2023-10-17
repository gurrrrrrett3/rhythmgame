import Vector2 from "../../util/classes/vector2";
import GUIUtil from "../guiUtil";
import GUIElement, { ANCHOR_MAP, Anchor } from "./guiElement";

export default class GUITextElement extends GUIElement {
    
    public text: string;
    public font: string = 'monospace'
    public color: string = "#ffffff";
    public textPadding: Vector2 = Vector2.zero;

    constructor(text: string, anchor: Anchor, position: Vector2) {
        super(anchor, position, Vector2.zero);
        this.text = text;
    }

    public render(ctx: CanvasRenderingContext2D, delta: number): void {
        super.render(ctx, delta);
        ctx.save();
        ctx.font = this.font;
        ctx.fillStyle = this.color;

        const textWidth = ctx.measureText(this.text).width

        this.size = GUIUtil.pixelToPercent(new Vector2(textWidth, parseInt(this.font)).mul(new Vector2(1, 1)).add(this.textPadding.mul(new Vector2(2, 1))));

        if (ANCHOR_MAP[this.anchor].x === 1) {
            // right
            this.position = GUIUtil.pixelToPercent(new Vector2(Vector2.windowSize.x - textWidth, this.position.y).add(this.textPadding));
        }  else if (ANCHOR_MAP[this.anchor].x === 0) {
            // center
            this.position = GUIUtil.pixelToPercent(new Vector2((Vector2.windowSize.x / 2) - (textWidth / 2), this.position.y).add(this.textPadding));
        } else {
            // left
            this.position = GUIUtil.pixelToPercent(new Vector2(0, this.position.y).add(this.textPadding));
        }
        
        
        ctx.fillText(this.text, this.screenPosition.x, this.screenPosition.y + parseInt(this.font));
        ctx.restore();
    }

}