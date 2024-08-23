import GLib from "gi://GLib?version=2.0";

export default class Clock {
    #onChange = null;

    constructor({ onChange }) {
        this.#onChange = onChange;

        this.#refresh()
        setInterval(() => this.#refresh(), 1000);
    }

    #refresh() {
        const time = GLib.DateTime.new_now_local()
        this.#onChange(time);
    }
}
