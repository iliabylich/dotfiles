import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import NetworkList from "../widgets/NetworkList.js";
import loadWidgets from "../lib/loadWidgets.js"
import keybindings from "../lib/keybindings.js";

export default function Networks({ application }) {
    const [window] = loadWidgets("Networks");
    window.set_application(application);
    LayerWindow(window, {
        namespace: "Networks",
        layer: LayerShell.Layer.OVERLAY,
        anchors: [
            LayerShell.Edge.TOP,
            LayerShell.Edge.RIGHT,
        ],
        margins: {
            [LayerShell.Edge.TOP]: 50
        },
        keyboard_mode: LayerShell.KeyboardMode.EXCLUSIVE,
    });
    const widget = NetworkList();

    keybindings(
        window,
        { "Escape": () => application.toggleWindow("Networks") },
        (_otherKey) => { }
    )

    return { window, reset: () => widget.reset() }
}
