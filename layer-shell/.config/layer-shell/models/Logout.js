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
        execAsync(["hyprlock"])
    }
    reboot() {
        execAsync(["systemctl", "reboot"])
    }
    shutdown() {
        execAsync(["systemctl", "poweroff"])
    }
    logout() {
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
