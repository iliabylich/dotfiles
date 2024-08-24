import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import AppList from "../widgets/AppList.js";

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
    })

    const ctrl = new Gtk.EventControllerKey();
    ctrl.connect("key-pressed", (_self, keyval, keycode, _state) => {
        widget.onKeyPress(Gdk.keyval_name(keyval));
    })
    window.add_controller(ctrl);

    return { window, reset: () => widget.reset() }
}
