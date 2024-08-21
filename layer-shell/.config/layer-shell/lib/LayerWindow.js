import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

const LayerWindow = GObject.registerClass({
    GTypeName: 'LayerWindow'
}, class extends Gtk.Window {
    constructor({
        layer = LayerShell.Layer.OVERLAY,
        auto_exclusive_zone_enabled = false,
        anchors = [],
        margins = {},
        child = null,
        namespace = null,
        keyboard_mode = null,
        ...options
    }) {
        super(options);

        LayerShell.init_for_window(this);
        LayerShell.set_layer(this, layer);
        if (auto_exclusive_zone_enabled) {
            LayerShell.auto_exclusive_zone_enable(this);
        }
        for (const anchor of anchors) {
            LayerShell.set_anchor(this, anchor, true);
        }
        for (const key in margins) {
            LayerShell.set_margin(this, key, margins[key]);
        }
        if (child) {
            this.child = child;
        }
        if (namespace) {
            LayerShell.set_namespace(this, namespace);
        }
        if (keyboard_mode) {
            LayerShell.set_keyboard_mode(this, keyboard_mode);
        }
    }

    get namespace() {
        return LayerShell.get_namespace(this);
    }
});

export default LayerWindow;
