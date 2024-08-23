import { WiFiStatus } from "../models/NetworkManager.js";
import loadTemplate from "../lib/loadTemplate.js";

export default class WiFi {
    #widget = null;
    #label = null;

    constructor() {
        const [widget, label] = loadTemplate("WiFi", "WiFiLabel");
        this.#widget = widget;
        this.#label = label;

        new WiFiStatus({
            onChange: (status) => this.#render(status)
        });

        this.#widget.connect("clicked", () => {
            globalThis.app.toggleWindowByNamespace("Networks");
        })
    }

    get widget() {
        return this.#widget;
    }

    #render(status) {
        this.#label.label = this.#formatLabel(status);
    }

    #formatLabel(status) {
        if (!status) {
            return "Not connected";
        }
        const { ssid, strength } = status;
        return `${ssid || "Unknown"} (${strength}%) `
    }
}
