import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import loadWidgets from '../lib/loadWidgets.js';

export default class PowerButton {
    #widget = null;

    constructor() {
        const [widget] = loadWidgets("PowerButton");
        this.#widget = widget;

        this.#widget.connect("clicked", () => {
            globalThis.app.toggleWindowByNamespace("LogoutScreen");
        })
    }

    get widget() {
        return this.#widget;
    }
}
