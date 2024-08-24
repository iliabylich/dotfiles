import execAsync from "../lib/execAsync.js";

export default class Logout {
    #idx = 0;
    #max = 4;
    #onChange = null;

    constructor({ max, onChange }) {
        this.#max = max;
        this.#onChange = onChange;
        this.#changed();
    }

    reset() {
        this.#idx = 0;
        this.#changed();
    }

    lock() {
        globalThis.app.toggleWindow("LogoutScreen");
        execAsync(["hyprlock"])
    }
    reboot() {
        globalThis.app.toggleWindow("LogoutScreen");
        execAsync(["systemctl", "reboot"])
    }
    shutdown() {
        globalThis.app.toggleWindow("LogoutScreen");
        execAsync(["systemctl", "poweroff"])
    }
    logout() {
        globalThis.app.toggleWindow("LogoutScreen");
        execAsync(["hyprctl", "dispatch", "exit"])
    }

    left() {
        this.#idx = Math.max(0, this.#idx - 1);
        this.#changed();
    }
    right() {
        this.#idx = Math.min(this.#max - 1, this.#idx + 1);
        this.#changed();
    }

    #changed() {
        this.#onChange({ activeIdx: this.#idx });
    }
}
