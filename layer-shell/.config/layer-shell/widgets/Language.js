import { HyprlandLanguage } from "../models/Hyprland.js";
import loadWidgets from "../lib/loadWidgets.js";

const mapping = {
    "English (US)": "EN",
    "Polish": "PL",
};

export default class Language {
    #widget = null;
    #label = null;

    constructor() {
        const [widget, label] = loadWidgets("Language", "LanguageLabel");
        this.#widget = widget;
        this.#label = label;

        new HyprlandLanguage({
            onChange: (layout) => this.#render(layout)
        })
    }

    get widget() {
        return this.#widget;
    }

    #render(layout) {
        this.#label.label = mapping[layout];
    }
}
