import Game from "../../game";
import Vector2 from "../util/classes/vector2";
import GUIElement, { Anchor } from "./element/guiElement";

export default class GuiManager {

    public root: GUIElement;

    constructor(game: Game) {
        this.root = new GUIElement(Anchor.TOP_LEFT, Vector2.zero, Vector2.one);
        this.root.name = "root";
        game.registerDrawHook("guiManager", 100, this.render.bind(this));
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