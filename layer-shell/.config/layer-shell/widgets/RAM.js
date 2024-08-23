import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import execAsync from "../lib/execAsync.js";
import Memory from "../models/Memory.js";

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

        new Memory({
            onChange: (memory) => this.#refresh(memory)
        })
    }

    vfunc_clicked() {
        execAsync(["gnome-system-monitor"]);
    }

    #refresh({ total, used }) {
        this.get_first_child().label = `RAM ${used.toFixed(1)}G/${total.toFixed(1)}G`
    }
});

export default RAM;
