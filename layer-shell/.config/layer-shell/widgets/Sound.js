import OutputSound from "../models/OutputSound.js";
import loadWidgets from "../lib/loadWidgets.js";

export default class Sound {
    #widget = null;
    #icon = null;
    #scale = null;
    #output = null;

    constructor() {
        const [widget, icon, scale] = loadWidgets("Sound", "SoundImage", "SoundScale");

        this.#widget = widget;
        this.#icon = icon;
        this.#scale = scale;
        this.#output = new OutputSound({
            onChange: (volume) => this.#render(volume)
        })

        this.#scale.connect("change-value", () => {
            this.#output.volume = Math.min(this.#scale.adjustment.value, 1);
        })
    }

    get widget() {
        return this.#widget;
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
}
