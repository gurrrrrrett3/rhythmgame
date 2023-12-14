export function roundedRect(ctx: CanvasRenderingContext2D, options: {
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    fill?: boolean,
    stroke?: boolean,
}) {
    let x = options.x;
    let y = options.y;
    let width = options.width;
    let height = options.height;
    let radius = options.radius;

    if (height < 0) {
        y += height;
        height = Math.abs(height);
    }

    if (width < 0) {
        x += width;
        width = Math.abs(width);
    }

    if (height < radius * 2) radius = height / 2;
    if (width < radius * 2) radius = width / 2;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath();

    if (options.fill) ctx.fill();
    if (options.stroke) ctx.stroke();
}
