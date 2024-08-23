import { getWiFiStatus } from "../lib/NetworkManager.js";
import loadTemplate from "../lib/loadTemplate.js";

export default class WiFi {
    #widget = null;
    #label = null;

    constructor() {
        const [widget, label] = loadTemplate("WiFi", "WiFiLabel");
        this.#widget = widget;
        this.#label = label;

        this.#widget.connect("clicked", () => {
            globalThis.app.toggleWindowByNamespace("Networks");
        })

        this.#refresh();
        setInterval(() => this.#refresh(), 1000);
    }

    get widget() {
        return this.#widget;
    }

    #refresh() {
        const status = getWiFiStatus();
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
