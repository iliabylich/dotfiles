import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import AppList from "../widgets/AppList.js";

const Launcher = GObject.registerClass({
    GTypeName: 'Launcher'
}, class extends Gtk.Window {
    #widget = null;

    constructor(options) {
        const widget = new AppList();

        super({
            css_classes: ["widget-launcher"],
            child: widget,
            width_request: 700,
            ...options
        });
        LayerWindow(this, {
            namespace: "Launcher",
            layer: LayerShell.Layer.OVERLAY,
            keyboard_mode: LayerShell.KeyboardMode.EXCLUSIVE,
        })

        this.#widget = widget;

        const ctrl = new Gtk.EventControllerKey();
        ctrl.connect("key-pressed", (_self, keyval, keycode, _state) => {
            this.#widget.onKeyPress(Gdk.keyval_name(keyval));
        })
        this.add_controller(ctrl);
    }

    prepareForShowing() {
        this.#widget.reset();
    }
});

export default Launcher;
