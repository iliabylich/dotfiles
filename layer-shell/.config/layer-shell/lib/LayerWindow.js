import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

export default function LayerWindow(window, {
    layer = LayerShell.Layer.OVERLAY,
    auto_exclusive_zone_enabled = false,
    anchors = [],
    margins = {},
    child = null,
    namespace = null,
    keyboard_mode = null
}) {
    LayerShell.init_for_window(window);
    LayerShell.set_layer(window, layer);
    if (auto_exclusive_zone_enabled) {
        LayerShell.auto_exclusive_zone_enable(window);
    }
    for (const anchor of anchors) {
        LayerShell.set_anchor(window, anchor, true);
    }
    for (const key in margins) {
        LayerShell.set_margin(window, key, margins[key]);
    }
    if (child) {
        window.child = child;
    }
    if (namespace) {
        LayerShell.set_namespace(window, namespace);
    }
    if (keyboard_mode) {
        LayerShell.set_keyboard_mode(window, keyboard_mode);
    }
}
