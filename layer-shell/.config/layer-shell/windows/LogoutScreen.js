import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import Logout from "../widgets/Logout.js";
import loadWidgets from "../lib/loadWidgets.js";
import keybindings from "../lib/keybindings.js";

export default function LogoutScreen({ application }) {
    const [window] = loadWidgets("LogoutScreen");
    window.set_application(application);
    LayerWindow(window, {
        namespace: "LogoutScreen",
        layer: LayerShell.Layer.OVERLAY,
        anchors: [
            LayerShell.Edge.TOP,
            LayerShell.Edge.RIGHT,
            LayerShell.Edge.BOTTOM,
            LayerShell.Edge.LEFT,
        ],
        keyboard_mode: LayerShell.KeyboardMode.EXCLUSIVE,
    });

    const widget = Logout();

    keybindings(
        window,
        { "Escape": () => application.toggleWindow("LogoutScreen") },
        (otherKey) => widget.onKeyPress(otherKey)
    );

    return { window, reset: () => widget.reset() }
};
