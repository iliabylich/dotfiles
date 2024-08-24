import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import Logout from "../widgets/Logout.js";

const LogoutScreen = GObject.registerClass({
    GTypeName: 'LogoutScreen'
}, class extends Gtk.Window {
    #widget = null;

    constructor(options) {
        const widget = new Logout();

        super({
            css_classes: ["widget-logout"],
            child: widget,
            visible: false,
            ...options
        });

        LayerWindow(this, {
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

export default LogoutScreen;
