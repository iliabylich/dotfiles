import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import OutputSound from "../models/OutputSound.js";

const Sound = GObject.registerClass({
    GTypeName: 'Sound'
}, class extends Gtk.Box {
    #icon = null;
    #scale = null;
    #output = null;

    constructor() {
        super({
            css_classes: ["widget", "sound", "padded"],
            spacing: 10,
            orientation: Gtk.Orientation.HORIZONTAL,
        });

        this.#icon = new Gtk.Image({
            icon_name: "dialog-question",
        });
        this.#scale = new Gtk.Scale({
            css_classes: ["sound-slider"],
            adjustment: new Gtk.Adjustment({
                lower: 0,
                upper: 1
            })
        });
        this.#scale.connect("change-value", () => {
            this.#output.volume = Math.min(this.#scale.adjustment.value, 1);
        })
        this.append(this.#icon);
        this.append(this.#scale);

        this.#output = new OutputSound({
            onChange: (volume) => this.#render(volume)
        })
    }

    #outputIconName(volume) {
        if (volume === 0) {
            return `audio-volume-muted-symbolic`;
        } else if (volume >= 0.01 && volume < 0.34) {
            return `audio-volume-low-symbolic`;
        } else if (volume >= 0.34 && volume < 0.67) {
            return `audio-volume-medium-symbolic`;
        } else if (volume >= 0.67 && volume < 1) {
            return `audio-volume-high-symbolic`;
        } else {
            return `audio-volume-overamplified-symbolic`;
        }
    }

    #render(volume) {
        this.#scale.set_value(volume)
        this.#icon.icon_name = this.#outputIconName(volume)
    }
});

export default Sound;
