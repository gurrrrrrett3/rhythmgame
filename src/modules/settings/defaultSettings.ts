export default function initalizeDefaultSettings() {

    window.game.settings.register('display.enableVsync', true);
    
    window.game.settings.register('audio.enable', true);
    window.game.settings.register('audio.musicVolume', 1);
    window.game.settings.register('audio.soundVolume', 1);

    window.game.settings.register('controls.button1', "KeyZ");
    window.game.settings.register('controls.button2', "KeyX");
    window.game.settings.register('controls.mouseSensitivity', 1);

    window.game.settings.register('debug.showFPS', false);
    window.game.settings.register('debug.showHitboxes', false);
    window.game.settings.register('debug.showDebugInfo', false);
    window.game.settings.register('debug.showDebugInfoOnPause', false);


}

export type Settings = {

    // display
    "display.enableVsync": {
        value: boolean;
        defaultValue: true;
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

} 