import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import AppList from "../widgets/AppList.js";

const Launcher = GObject.registerClass({
    GTypeName: 'Launcher'
}, class extends LayerWindow {
    #widget = null;

    constructor(options) {
        const widget = new AppList();

        super({
            namespace: "Launcher",
            layer: LayerShell.Layer.OVERLAY,
            css_classes: ["widget-launcher"],
            keyboard_mode: LayerShell.KeyboardMode.EXCLUSIVE,
            child: widget,
            width_request: 700,
            ...options
        });

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
