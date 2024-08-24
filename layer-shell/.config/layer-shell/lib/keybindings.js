import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";

export default function keybindings(window, keybindings, fallbackFn) {
    const ctrl = new Gtk.EventControllerKey();
    ctrl.connect("key-pressed", (_self, keyval, _keycode, _state) => {
        const key = Gdk.keyval_name(keyval);

        const fn = keybindings[key];
        if (fn) return fn();

        fallbackFn(key)
    })
    window.add_controller(ctrl);
}
