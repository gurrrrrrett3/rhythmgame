import GUIUtil from "../gui/guiUtil";
import { roundedRect } from "../util/shapes/roundedRect";
import { ButtonMode, MouseMode } from "./inputManager";

export default class InputDisplay {
        public static init() {

                game.input.controlMode.button = ButtonMode.NO_BUTTON;
                game.input.controlMode.mouse = MouseMode.XY;

                game.registerDrawHook("inputDisplay", 0, (ctx, delta) => {

                        ctx.save();
                        ctx.fillStyle = "#ffffff";
                        ctx.strokeStyle = "#ffffff";

                        if (game.input.controlMode.button != ButtonMode.NO_BUTTON) {
                                roundedRect(ctx, {
                                        x: window.innerWidth - 120,
                                        y: window.innerHeight - 60,
                                        width: 50,
                                        height: 50,
                                        radius: 10,
                                        stroke: true,
                                        fill: game.input.inputs.button1
                                });
                        }

                        if (game.input.controlMode.button == ButtonMode.TWO_BUTTON) {
                                roundedRect(ctx, {
                                        x: window.innerWidth - 60,
                                        y: window.innerHeight - 60,
                                        width: 50,
                                        height: 50,
                                        radius: 10,
                                        stroke: true,
                                        fill: game.input.inputs.button2
                                });
                        }

                        const y = game.input.controlMode.button == ButtonMode.NO_BUTTON ? window.innerHeight - 60 : window.innerHeight - 120;
                        switch (game.input.controlMode.mouse) {
                                case MouseMode.SCREEN: {
                                        const realPos = GUIUtil.percentToPixel(game.input.inputs.mousePosition);
                                        ctx.fillStyle = "#ffffff";
                                        ctx.beginPath();
                                        ctx.arc(realPos.x, realPos.y, 5, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.restore();

                                        ctx.beginPath();
                                        ctx.moveTo(realPos.x, realPos.y);
                                        ctx.lineTo(window.innerWidth - 60, window.innerHeight - 60);
                                        ctx.stroke();

                                        break;
                                }
                                case MouseMode.XY: {
                                        roundedRect(ctx, {
                                                x: window.innerWidth - 120,
                                                y: y - 60,
                                                width: 110,
                                                height: 110,
                                                radius: 10,
                                                stroke: true,
                                                fill: false
                                        });

                                        // draw dot based on mouse delta
                                        let dotPos = {
                                                x: window.innerWidth - 120 + game.input.inputs.mousePosition.x * 110,
                                                y: y - 60 + game.input.inputs.mousePosition.y * 110
                                        }

                                        ctx.fillStyle = "#ffffff";

                                        ctx.beginPath();
                                        ctx.arc(dotPos.x, dotPos.y, 5, 0, Math.PI * 2);
                                        ctx.fill();
                                        break;
                                }
                                case MouseMode.X: {
                                        roundedRect(ctx, {
                                                x: window.innerWidth - 120,
                                                y: window.innerHeight - 120,
                                                width: 110,
                                                height: 50,
                                                radius: 10,
                                                stroke: true,
                                                fill: false
                                        });

                                        roundedRect(ctx, {
                                                x: window.innerWidth - 65,
                                                y: window.innerHeight - 120,
                                                width: (0.5 - game.input.inputs.mousePosition.x) * - 110,
                                                height: 50,
                                                radius: 10,
                                                stroke: false,
                                                fill: true
                                        });
                                        break;
                                }
                                case MouseMode.Y: {
                                        roundedRect(ctx, {
                                                x: window.innerWidth - 60,
                                                y: y - 50,
                                                width: 50,
                                                height: 100,
                                                radius: 10,
                                                stroke: true,
                                                fill: false
                                        });

                                        roundedRect(ctx, {
                                                x: window.innerWidth - 60,
                                                y: y,
                                                width: 50,
                                                height: (0.5 - game.input.inputs.mousePosition.y) * -100,
                                                radius: 10,
                                                stroke: false,
                                                fill: true
                                        });
                                        break;
                                }
                        }

                        ctx.restore();
                })

        }
}