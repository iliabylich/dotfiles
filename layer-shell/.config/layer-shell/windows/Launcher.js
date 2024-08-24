import Gtk from "gi://Gtk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import AppList from "../widgets/AppList.js";
import keybindings from "../lib/keybindings.js";

export default function Launcher({ application }) {
    const widget = new AppList();

    const window = new Gtk.Window({
        css_classes: ["widget-launcher"],
        child: widget,
        width_request: 700,
    });
    window.set_application(application);
    LayerWindow(window, {
        namespace: "Launcher",
        layer: LayerShell.Layer.OVERLAY,
        keyboard_mode: LayerShell.KeyboardMode.EXCLUSIVE,
    });

    keybindings(
        window,
        { "Escape": () => application.toggleWindow("Launcher") },
        (otherKey) => widget.onKeyPress(otherKey)
    );

    return { window, reset: () => widget.reset() }
}
