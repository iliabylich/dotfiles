import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import AppList from "../widgets/AppList.js";
import keybindings from "../lib/keybindings.js";
import loadWidgets from "../lib/loadWidgets.js";
import { toggleWindow } from "../lib/toggleWindow.js";

export default function Launcher({ application }) {
    const [window] = loadWidgets("Launcher");
    window.set_application(application);
    LayerWindow(window, {
        namespace: "Launcher",
        layer: LayerShell.Layer.OVERLAY,
        keyboard_mode: LayerShell.KeyboardMode.EXCLUSIVE,
    });

    const widget = AppList();

    keybindings(
        window,
        { "Escape": () => toggleWindow("Launcher") },
        (otherKey) => widget.onKeyPress(otherKey)
    );

    return { window, reset: () => widget.reset() }
}
