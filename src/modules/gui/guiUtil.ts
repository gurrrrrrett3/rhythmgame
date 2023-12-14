import Logger from "../util/classes/logger";
import Vector2 from "../util/classes/vector2";

export default class GUIUtil {
    
    public static pixelToPercent(pixel: Vector2) {
        return pixel.div(Vector2.windowSize);
    }

    public static percentToPixel(percent: Vector2) {
        return percent.mul(Vector2.windowSize);
    }

    public static getUnitSize() {
        Logger.debug('GUI', `Updated unit size to 1u = ${window.innerHeight / 100}px`)
        return window.innerHeight / 100;
    }

    public static getWidthUnits() {
        return window.innerWidth / GUIUtil.getUnitSize();
    }

}