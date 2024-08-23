import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import { HyprlandLanguage } from "../models/Hyprland.js";

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

        new HyprlandLanguage({
            onChange: (layout) => this.#render(layout)
        })
    }

    #render(layout) {
        const code = mapping[layout];
        this.get_first_child().label = code;
    }
});

export default Language;
