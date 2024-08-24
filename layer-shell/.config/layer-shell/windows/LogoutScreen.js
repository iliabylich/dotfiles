import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import Logout from "../widgets/Logout.js";
import loadWidgets from "../lib/loadWidgets.js";

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

    const ctrl = new Gtk.EventControllerKey();
    ctrl.connect("key-pressed", (_self, keyval, _keycode, _state) => {
        widget.onKeyPress(Gdk.keyval_name(keyval));
    })
    window.add_controller(ctrl);

    return { window, reset: () => widget.reset() }
};
