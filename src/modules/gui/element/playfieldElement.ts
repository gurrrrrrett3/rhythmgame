import Vector2 from "../../util/classes/vector2";
import GuiManager from "../guiManager";
import GUIElement, { Anchor } from "./guiElement";

export default class PlayfieldElement extends GUIElement {

    constructor() {
        super(Anchor.TOP_LEFT, new Vector2(0, 0), new Vector2(GuiManager.widthUnits, 100));
    }

    public render(ctx: CanvasRenderingContext2D, delta: number): void {
        super.render(ctx, delta);
        ctx.save();
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.screenPosition.x, this.screenPosition.y, this.absoluteSize.x, this.absoluteSize.y);
        ctx.restore();
    }

}