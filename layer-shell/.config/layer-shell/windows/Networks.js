import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import NetworkList from "../widgets/NetworkList.js";

const Networks = GObject.registerClass({
    GTypeName: 'Networks'
}, class extends Gtk.Window {
    #widget = null;

    constructor(options) {
        const widget = new NetworkList();

        super({
            css_classes: ["widget-network"],
            child: widget,
            width_request: 700,
            ...options
        });

        LayerWindow(this, {
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
