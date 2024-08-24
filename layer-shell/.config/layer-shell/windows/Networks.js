import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import NetworkList from "../widgets/NetworkList.js";

export default function Networks({ application }) {
    const widget = new NetworkList();

    const window = new Gtk.Window({
        css_classes: ["widget-network"],
        child: widget,
        width_request: 700,
    });
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
    })

    const ctrl = new Gtk.EventControllerKey();
    ctrl.connect("key-pressed", (_self, keyval, _keycode, _state) => {
        widget.onKeyPress(Gdk.keyval_name(keyval));
    })
    window.add_controller(ctrl);

    return { window, reset: () => widget.reset() }
}
