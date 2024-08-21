import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import execAsync from "../lib/execAsync.js";

const RAM = GObject.registerClass({
    GTypeName: 'RAM'
}, class extends Gtk.Button {
    constructor() {
        super({
            css_classes: ["widget", "memory", "padded", "clickable"],
            child: new Gtk.Label({
                label: ""
            })
        })

        this.#refresh();
        setInterval(() => this.#refresh(), 1000);
    }

    vfunc_clicked() {
        execAsync(["gnome-system-monitor"]);
    }

    async #refresh() {
        const stdout = await execAsync(["free", "-m"])
        const line = stdout.split("\n")[1]
        const parts = line.split(/\s+/)
        const total = parts[1] / 1024
        const used = parts[2] / 1024
        this.get_first_child().label = this.#formatLabel(used, total)
    }

    #formatLabel(used, total) {
        return `RAM ${used.toFixed(1)}G/${total.toFixed(1)}G`
    }
});

export default RAM;
