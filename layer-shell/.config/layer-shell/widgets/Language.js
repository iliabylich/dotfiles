import { HyprlandLanguage } from "../models/Hyprland.js";
import loadWidgets from "../lib/loadWidgets.js";

const mapping = {
    "English (US)": "EN",
    "Polish": "PL",
};

export default function Language() {
    const [label] = loadWidgets("LanguageLabel");

    new HyprlandLanguage({
        onChange: (layout) => label.label = mapping[layout]
    })
}
