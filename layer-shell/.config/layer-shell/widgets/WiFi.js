import { WiFiStatus } from "../models/NetworkManager.js";
import loadWidgets from "../lib/loadWidgets.js";

export default function WiFi() {
    const [widget, label] = loadWidgets("WiFi", "WiFiLabel");

    new WiFiStatus({
        onChange: (status) => {
            if (status) {
                const { ssid, strength } = status;
                label.label = `${ssid || "Unknown"} (${strength}%) `
            } else {
                label.label = "Not connected";
            }
        }
    });

    widget.connect("clicked", () => {
        globalThis.app.toggleWindow("Networks");
    })
}
