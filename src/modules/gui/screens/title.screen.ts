import Vector2 from "../../util/classes/vector2";
import GUIElement, { Anchor } from "../element/guiElement";
import GUITextElement from "../element/textElement";
import Screen from "./screen";

export default class TitleScreen extends Screen {

    constructor() {
        super("title");
    }

    public init(): GUIElement[] {
        return [
            new GUITextElement("rhythmgame", Anchor.CENTER, Vector2.zero)
        ]
    }

}