import NetworkManager from "../models/NetworkManager.js";
import loadTemplate from "../lib/loadTemplate.js";

export default class WiFi {
    #widget = null;
    #label = null;
    #nm = null;

    constructor() {
        const [widget, label] = loadTemplate("WiFi", "WiFiLabel");
        this.#widget = widget;
        this.#label = label;
        this.#nm = new NetworkManager();

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
        this.#label.label = this.#formattedLabel;
    }

    get #formattedLabel() {
        const status = this.#nm.wifiStatus;
        if (!status) {
            return "Not connected";
        }
        const { ssid, strength } = status;
        return `${ssid || "Unknown"} (${strength}%) `
    }
}
