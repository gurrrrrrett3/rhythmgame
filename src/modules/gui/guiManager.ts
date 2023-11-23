import Game from "../../game";
import Vector2 from "../util/classes/vector2";
import GUIElement, { Anchor } from "./element/guiElement";
import GUIUtil from "./guiUtil";

export default class GuiManager {

    public root: GUIElement;
    public static unitSize: number = GUIUtil.getUnitSize();
    public static widthUnits: number = GUIUtil.getWidthUnits();

    constructor(game: Game) {
        this.root = new GUIElement(Anchor.TOP_RIGHT, Vector2.zero, new Vector2(100, 100));
        this.root.name = "root";

        game.registerDrawHook("guiManager", 100, this.render.bind(this));

        window.addEventListener("resize", () => {
            GuiManager.unitSize = GUIUtil.getUnitSize();
            GuiManager.widthUnits = GUIUtil.getWidthUnits();
        })
    }

    public addElement<T extends GUIElement>(element: T): T {
        return this.root.addChild(element);
    }

    public removeElement(element: GUIElement): void {
        this.root.removeChild(element);
    }

    public getElementById(id: string): GUIElement | null {
        return this.root.getElementById(id);
    }

    public render(ctx: CanvasRenderingContext2D, delta: number): void {
        this.root.render(ctx, delta);
    }


}