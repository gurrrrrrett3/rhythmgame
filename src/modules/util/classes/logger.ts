import { Settings } from "../../settings/defaultSettings";
import SettingsManager from "../../settings/settingsManager";

export enum LogLevel {
  NONE,
  INFO,
  WARN,
  ERROR,
  DEBUG,
}

export default class Logger {
  public static init() {
    if (game.settings.get("debug.logLevel") === LogLevel.DEBUG) {
      Logger.debug("Logger", "Debug enabled.");
    }
  }

  public static COLORS = {
    [LogLevel.INFO]: "#58f78f",
    [LogLevel.WARN]: "#f3f99d",
    [LogLevel.ERROR]: "#ff5c56",
    [LogLevel.DEBUG]: "#57c7ff",
  }

  private static _colorCache: Record<string, string> = {};
  public static disabledMethods: Set<string> = new Set(["EventEmitter", "GUI"])
  
  private static get logLevel(): LogLevel {
    if (window.game && game) {
      return game.settings.get("debug.logLevel") || LogLevel.INFO;
    }
    return parseInt(localStorage.getItem("settings.debug.logLevel") || LogLevel.INFO.toString()) as LogLevel || LogLevel.INFO;
  }

  public static debug(method: string, ...message: any[]) {
    if (Logger.disabledMethods.has(method)) return;
    if (Logger.logLevel === LogLevel.DEBUG) {
      const col = Logger.getColor(method);
      console.log(
        '%c[DEBUG] %c[' + method + ']%c: ' + message.join("\n"),
        `color: ${Logger.COLORS[LogLevel.DEBUG]}`,
        `color: ${col}`,
        `color: ${Logger.COLORS[LogLevel.DEBUG]}`
      );
    }
  }

  public static log(method: string, ...message: any[]) {
    if (Logger.disabledMethods.has(method)) return;
    if (Logger.logLevel === LogLevel.DEBUG || Logger.logLevel === LogLevel.INFO) {
      const col = Logger.getColor(method);
      console.log(
        '%c[INFO] %c[' + method + ']%c: ' + message.join("\n"),
        `color: ${Logger.COLORS[LogLevel.INFO]}`,
        `color: ${col}`,
        `color: ${Logger.COLORS[LogLevel.INFO]}`
      );
    }
  }

  public static warn(method: string, ...message: any[]) {
    if (Logger.disabledMethods.has(method)) return;
    if (Logger.logLevel != LogLevel.NONE && Logger.logLevel != LogLevel.ERROR) {
      const col = Logger.getColor(method);
      console.warn(
        '%c[WARN] %c[' + method + ']%c: ' + message.join("\n"),
        `color: ${Logger.COLORS[LogLevel.WARN]}`,
        `color: ${col}`,
        `color: ${Logger.COLORS[LogLevel.WARN]}`
      );
    }
  }

  public static error(method: string, ...message: any[]) {
    if (Logger.disabledMethods.has(method)) return;
    if (Logger.logLevel != LogLevel.NONE) {
      const col = Logger.getColor(method);
      console.error(
        '%c[ERROR] %c[' + method + ']%c: ' + message.join("\n"),
        `color: ${Logger.COLORS[LogLevel.ERROR]}`,
        `color: ${col}`,
        `color: ${Logger.COLORS[LogLevel.ERROR]}`
      );
    }
  }

  public static info = (method: string, ...message: any[]) => Logger.log(method, ...message);

  public static getColor(str: string) {
    if (Logger._colorCache[str]) return Logger._colorCache[str];

    // calculate hash
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    // use as hsv hue
    const hue = Math.abs(hash % 360);

    // convert to rgb

    let r = 0, g = 0, b = 0;
    const s = 0.5;
    const v = 0.95;
    
    const c = v * s;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = v - c;

    if (hue < 60) {
      r = c;
      g = x;
    } else if (hue < 120) {
      r = x;
      g = c;
    } else if (hue < 180) {
      g = c;
      b = x;
    } else if (hue < 240) {
      g = x;
      b = c;
    } else if (hue < 300) {
      r = x;
      b = c;
    } else if (hue < 360) {
      r = c;
      b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const color = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`

    Logger._colorCache[str] = color;
    return color;
  }
}
