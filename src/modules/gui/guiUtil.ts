import Vector2 from "../util/classes/vector2";

export default class GUIUtil {
    
    public static pixelToPercent(pixel: Vector2) {
        return pixel.div(Vector2.windowSize);
    }

    public static percentToPixel(percent: Vector2) {
        return percent.mul(Vector2.windowSize);
    }

}