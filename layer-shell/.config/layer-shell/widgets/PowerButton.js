import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";

const PowerButton = GObject.registerClass({
    GTypeName: 'PowerButton'
}, class extends Gtk.Button {
    constructor() {
        super({
            child: new Gtk.Label({
                label: "      "
            }),
            cursor: new Gdk.Cursor({ name: "pointer" }),
            css_classes: ["power", "widget", "padded", "clickable"]
        })
    }

    vfunc_clicked() {
        globalThis.app.toggleWindowByNamespace("LogoutScreen");
    }
});

export default PowerButton;
