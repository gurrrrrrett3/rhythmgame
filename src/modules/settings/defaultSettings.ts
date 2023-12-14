import { LogLevel } from "../util/classes/logger";

export default function initalizeDefaultSettings() {

    const settings = game.settings

    settings.register('display.enableVsync', true);
    settings.register('display.fullscreen', false);
    
    settings.register('audio.enable', true);
    settings.register('audio.musicVolume', 1);
    settings.register('audio.soundVolume', 1);

    settings.register('controls.button1', "KeyZ");
    settings.register('controls.button2', "KeyX");
    settings.register('controls.enableMouseButtons', true);
    settings.register('controls.mouseSensitivity', 1);

    settings.register('debug.showFPS', false);
    settings.register('debug.showHitboxes', false);
    settings.register('debug.showDebugInfo', false);
    settings.register('debug.showDebugInfoOnPause', false);
    settings.register('debug.eventLogging', false);
    settings.register('debug.logLevel', LogLevel.INFO);
    settings.register('debug.disabledMethods', []);

}

export type Settings = {

    // display
    "display.enableVsync": {
        value: boolean;
        defaultValue: true;
    }

    "display.fullscreen": {
        value: boolean;
        defaultValue: false;
    }

    // audio
    "audio.enable": {
        value: boolean;
        defaultValue: true;
    }
    "audio.musicVolume": {
        value: number;
        defaultValue: 1;
    }
    "audio.soundVolume": {
        value: number;
        defaultValue: 1;
    }

    // controls
    "controls.button1": {
        value: string;
        defaultValue: "KeyZ";
    }
    
    "controls.button2": {
        value: string;
        defaultValue: "KeyX";
    }

    "controls.enableMouseButtons": {
        value: boolean;
        defaultValue: true;
    }

    "controls.mouseSensitivity": {
        value: number;
        defaultValue: 1;
    }

    // debug
    "debug.showFPS": {
        value: boolean;
        defaultValue: false;
    }
    "debug.showHitboxes": {
        value: boolean;
        defaultValue: false;
    }
    "debug.showDebugInfo": {
        value: boolean;
        defaultValue: false;
    }
    "debug.showDebugInfoOnPause": {
        value: boolean;
        defaultValue: false;
    }
    "debug.eventLogging": {
        value: boolean;
        defaultValue: false;
    }
    "debug.logLevel": {
        value: LogLevel;
        defaultValue: LogLevel.INFO;
    }
    "debug.disabledMethods": {
        value: string[];
        defaultValue: [];
    }
} 