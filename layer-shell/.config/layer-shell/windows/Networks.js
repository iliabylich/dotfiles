import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import NetworkList from "../widgets/NetworkList.js";

const Networks = GObject.registerClass({
    GTypeName: 'Networks'
}, class extends LayerWindow {
    #widget = null;

    constructor(options) {
        const widget = new NetworkList();

        super({
            namespace: "Networks",
            layer: LayerShell.Layer.OVERLAY,
            css_classes: ["widget-network"],
            anchors: [
                LayerShell.Edge.TOP,
                LayerShell.Edge.RIGHT,
            ],
            margins: {
                [LayerShell.Edge.TOP]: 50
            },
            keyboard_mode: LayerShell.KeyboardMode.EXCLUSIVE,
            child: widget,
            width_request: 700,
            ...options
        });

        this.#widget = widget;

        const ctrl = new Gtk.EventControllerKey();
        ctrl.connect("key-pressed", (_self, keyval, _keycode, _state) => {
            this.#widget.onKeyPress(Gdk.keyval_name(keyval));
        })
        this.add_controller(ctrl);
    }

    prepareForShowing() {
        this.#widget.reset();
    }
});

export default Networks;
