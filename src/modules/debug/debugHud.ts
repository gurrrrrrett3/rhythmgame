import { ANCHOR_MAP, Anchor } from "../gui/element/guiElement";
import GUITextElement from "../gui/element/textElement";
import GUIUtil from "../gui/guiUtil";
import Vector2 from "../util/classes/vector2";
import "./consoleCommands"

export default class DebugHud {

    public static init() {
        
        if (game.settings.get("debug.showFPS")) {
            const fpsElement = game.gui.addElement(new GUITextElement("FPS: 0", Anchor.TOP_RIGHT, new Vector2(0, 0)));
            fpsElement.name = "debugHud.fps";
            fpsElement.font = "24px monospace";
            fpsElement.color = "#ffffff";

            window.game.registerUpdateHook("debugHud", 1000, (delta) => {
                fpsElement.text = `FPS: ${(1000 / delta).toFixed(2)}`;
            });
        } 

        if (game.settings.get("debug.showHitboxes")) {
            window.game.registerDrawHook("debugHud", 100, (ctx) => {
                ctx.save();
                ctx.strokeStyle = "#ff0000";
                ctx.lineWidth = 2;
                
                let anchors = Object.values(ANCHOR_MAP).map(anchor => GUIUtil.percentToPixel(anchor));

                anchors.forEach(anchor => {
                    ctx.beginPath();
                    ctx.moveTo(anchor.x - 5, anchor.y);
                    ctx.lineTo(anchor.x + 5, anchor.y);
                    ctx.moveTo(anchor.x, anchor.y - 5);
                    ctx.lineTo(anchor.x, anchor.y + 5);
                    ctx.stroke();
                })
                

                ctx.restore();
            });
        }

    }

}