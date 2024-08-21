import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import { getWiFiStatus } from "../lib/NetworkManager.js";

const WiFi = GObject.registerClass({
    GTypeName: 'WiFi'
}, class extends Gtk.Button {
    constructor() {
        super({
            css_classes: ["network", "widget", "padded", "clickable"],
            cursor: new Gdk.Cursor({ name: "pointer" }),
            child: new Gtk.Label({
                label: "",
            })
        })

        this.#refresh();
        setInterval(() => this.#refresh(), 1000);
    }

    vfunc_clicked() {
        globalThis.app.toggleWindowByNamespace("Networks");
    }

    #refresh() {
        const status = getWiFiStatus();
        this.get_first_child().label = this.#formatLabel(status);
    }

    #formatLabel(status) {
        if (!status) {
            return "Not connected";
        }
        const { ssid, strength } = status;
        return `${ssid || "Unknown"} (${strength}%) `
    }
});

export default WiFi;
