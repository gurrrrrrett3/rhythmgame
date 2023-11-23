import GuiManager from "../../gui/guiManager";

export default class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    public sub(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    public mul(other: Vector2): Vector2 {
        return new Vector2(this.x * other.x, this.y * other.y);
    }

    public div(other: Vector2): Vector2 {
        return new Vector2(this.x / other.x, this.y / other.y);
    }

    public equals(other: Vector2): boolean {
        return this.x === other.x && this.y === other.y;
    }

    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    public bound(lower: Vector2, upper: Vector2): Vector2 {
        return new Vector2(
            Math.max(lower.x, Math.min(upper.x, this.x)),
            Math.max(lower.y, Math.min(upper.y, this.y))
        );
    }

    public toString(): string {
        return `Vector2(${this.x}, ${this.y})`;
    }

    public static get zero(): Vector2 {
        return new Vector2(0, 0);
    }

    public static get one(): Vector2 {
        return new Vector2(1, 1);
    }

    public static get windowSize(): Vector2 {
        return new Vector2(window.innerWidth, window.innerHeight);
    }

    public static get unitSize(): Vector2 {
        return new Vector2(GuiManager.widthUnits, 100);
    }

    public static get up(): Vector2 {
        return new Vector2(0, -1);
    }

    public static get down(): Vector2 {
        return new Vector2(0, 1);
    }

    public static get left(): Vector2 {
        return new Vector2(-1, 0);
    }

    public static get right(): Vector2 {
        return new Vector2(1, 0);
    }

    public static double(x: number): Vector2 {
        return new Vector2(x, x);
    }


}