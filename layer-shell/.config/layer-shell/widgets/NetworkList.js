import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";

import { allNetworks } from "../models/NetworkManager.js";
import execAsync from "../lib/execAsync.js";
import loadWidgets from "../lib/loadWidgets.js";

function setOnClick(row, fn) {
    const ctrl = new Gtk.GestureClick();
    ctrl.connect("pressed", () => fn(row.get_start_widget()));
    row.add_controller(ctrl);
}

function copyToClipboard(text) {
    const clipboard = Gdk.Display.get_default().get_clipboard();
    clipboard.set(text)
}

function close() {
    globalThis.app.toggleWindow("Networks");
}

export default function NetworkList() {
    const [settingsRow, exitRow, ...networkRows] = loadWidgets(
        "NetworkSettingsRow",
        "NetworkExitRow",
        "Network1Row",
        "Network2Row",
        "Network3Row",
        "Network4Row",
        "Network5Row",
    );

    let networks = allNetworks().slice(0, 5);

    setOnClick(settingsRow, () => {
        execAsync(["kitty", "--name", "nmtui", "nmtui"]);
        close();
    });

    setOnClick(exitRow, close);

    networkRows.forEach((row, idx) => setOnClick(row, (label) => {
        if (idx >= networks.length) { return }
        const { ip, name } = networks[idx];
        copyToClipboard(ip);
        label.label = "Copied!"
        setTimeout(() => {
            label.label = `${name}: ${ip}`
        }, 1000)
    }));

    function syncUI() {
        networkRows.forEach((row, idx) => {
            if (idx >= networks.length) {
                row.set_visible(false);
                return;
            }

            const { name, ip } = networks[idx];
            row.set_visible(true);
            row.get_start_widget().label = `${name}: ${ip}`;
        })
    }

    syncUI();

    const keyBindings = {
        "Escape": close
    };

    return {
        reset: () => syncUI(),
        onKeyPress: (key) => {
            const f = keyBindings[key];
            if (f) f()
        }
    }
}
