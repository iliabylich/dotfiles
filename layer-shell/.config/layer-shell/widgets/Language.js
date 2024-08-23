import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import { subscribe } from "../models/Hyprland.js";
import execAsync from "../lib/execAsync.js";

const mapping = {
    "English (US)": "EN",
    "Polish": "PL",
};

const Language = GObject.registerClass({
    GTypeName: 'Language'
}, class extends Gtk.CenterBox {
    constructor() {
        super({
            css_classes: ["widget", "language", "padded"],
            center_widget: new Gtk.Label({
                label: "??"
            })
        });

        this.#loadInitialValue();

        subscribe((event, payload) => {
            if (event === "activelayout") {
                const payloadParts = payload.split(",")
                const layout = payloadParts[payloadParts.length - 1];

                this.#render(layout)
            }
        })
    }

    async #loadInitialValue() {
        try {
            const devices = JSON.parse(await execAsync(["hyprctl", "devices", "-j"]));
            const layout = devices.keyboards.find(kb => kb.main).active_keymap;
            this.#render(layout)
        } catch (e) {
            console.error("[Language] error", e)
        }
    }

    #render(layout) {
        const code = mapping[layout];
        this.get_first_child().label = code;
    }
});

export default Language;
