import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import NetworkList from "../widgets/NetworkList.js";
import loadWidgets from "../lib/loadWidgets.js"

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

    const ctrl = new Gtk.EventControllerKey();
    ctrl.connect("key-pressed", (_self, keyval, _keycode, _state) => {
        const key = Gdk.keyval_name(keyval);
        if (key === "Escape") {
            application.toggleWindow("Networks");
        }
    })
    window.add_controller(ctrl);

    return { window, reset: () => widget.reset() }
}
