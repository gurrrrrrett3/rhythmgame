/**
 * A reimplementation of the NodeJS EventEmitter class.
 */
export default class EventEmitter<T extends {
    [key: string]: (...args: any[]) => any;
}> {
    private _listeners: {
        [key: string]: {
            listener: T[keyof T];
            once: boolean;
        }[]
    } = {};

    public enableEventLogging: boolean = false;

    constructor(enableDebugLogging: boolean = false) {
        this.enableEventLogging = enableDebugLogging;
    }

    /**
     * Add a listener for the given event.
     * @param event The event to listen for.
     * @param listener The listener function.
     */
    public on<K extends keyof T>(event: K, listener: T[K]): T[K] {
        this._listeners[event as string].push({
            listener,
            once: false
        });

        if (this.enableEventLogging) console.log(`%c[EventEmitter] %cAdded listener for event %c${event.toString()}`, `color: #00ff00`, `color: #ffffff`, `color: #00ffff`);

        return listener;
    }

    /**
     * Add a listener for the given event, but only once.
     * @param event The event to listen for.
     * @param listener The listener function.
     */
    public once<K extends keyof T>(event: K, listener: T[K]): T[K] {
        this._listeners[event as string].push({
            listener,
            once: true
        });

        if (this.enableEventLogging) console.log(`%c[EventEmitter] %cAdded listener for event %c${event.toString()} %c(once)`, `color: #00ff00`, `color: #ffffff`, `color: #00ffff`, `color: #ff00ff`);

        return listener;

    }

    /**
     * Remove a listener for the given event.
     * @param event The event to remove the listener from.
     * @param listener The listener function to remove.
     */
    public removeListener<K extends keyof T>(event: K, listener: T[K]): void {
        if (this._listeners[event as string]) {
            this._listeners[event as string] = this._listeners[event as string].filter((l) => l.listener !== listener);
        }
    }

    /**
     * Remove all listeners for the given event.
     * @param event The event to remove all listeners from.
     */
    public removeAllListeners<K extends keyof T>(event: K): void {
        delete this._listeners[event as string]
    }

    /**
     * Emit an event.
     * @param event The event to emit.
     * @param args The arguments to pass to the listeners.
     */
    public emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): void {
        const listener = this._listeners[event as string];
        if (listener) {
            listener.forEach((l) => {
                l.listener(...args);
                if (l.once) {
                    this.removeListener(event, l.listener);
                }
            });
        }

        if (this.enableEventLogging) console.log(`%c[EventEmitter] %cEmitting event %c${event.toString()}`, `color: #00ff00`, `color: #ffffff`, `color: #00ffff`);
    }

    /**
     * Get the listeners for the given event.
     * @param event The event to get the listeners for.
     */
    public getListeners<K extends keyof T>(event: K): T[K] | undefined {
        const listeners = this._listeners[event as string];
        if (listeners) {
            return listeners.map((l) => l.listener) as any;
        }
        return undefined;
    }

    /**
     * Check if the given event has a listener.
     * @param event The event to check.
     */
    public hasListener<K extends keyof T>(event: K): boolean {
        return !!this._listeners[event as string];
    }
}
