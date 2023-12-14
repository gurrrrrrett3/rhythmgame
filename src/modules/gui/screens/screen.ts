import GUIElement from "../element/guiElement";
import GuiManager from "../guiManager";

export default class Screen {

    private _elements: GUIElement[] = [];

    constructor(public name: string) {

    }

    public init(): GUIElement[] {
        throw new Error("Method not implemented. Override this method in your screen class.");
    }

    /**
     * Do not override this method. 
     */
    public build(guiManager: GuiManager): void {

        this._elements = this.init().map(element => {
            element.name = `${this.name}.${element.name}`;
            return element;
        })

        guiManager.addElements(...this._elements);
    }

    public destroy(guiManager: GuiManager): void {
        guiManager.removeElements(...this._elements);
        this._elements = [];
    }

}
