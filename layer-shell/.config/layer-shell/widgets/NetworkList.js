import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";

import { allNetworks } from "../models/NetworkManager.js";
import execAsync from "../lib/execAsync.js";

const NetworkList = GObject.registerClass({
    GTypeName: 'NetworkList'
}, class extends Gtk.Box {

    constructor() {
        super({
            css_classes: ["widget-network-row-list"],
            orientation: Gtk.Orientation.VERTICAL,
        })

        this.#render()
    }

    reset() {
        this.#render();
    }

    onKeyPress(key) {
        switch (key) {
            case "Escape":
                return this.#close();
        }
    }

    #close() {
        globalThis.app.toggleWindow("Networks");
    }

    #render() {
        while (true) {
            const child = this.get_first_child();
            if (!child) {
                break;
            }
            this.remove(child);
        }

        for (const network of allNetworks()) {
            this.append(this.#networkRow(network))
        }
        this.append(this.#settingsRow())
        this.append(this.#exitRow())
    }

    #networkRow({ ip, name }) {
        return this.#row({
            label: `${name}: ${ip}`,
            icon_name: "edit-copy",
            css_classes: ["widget-network-ip-row"],
            on_click: (label) => {
                const clipboard = Gdk.Display.get_default().get_clipboard();
                clipboard.set(ip)
                label.label = "Copied!"
                setTimeout(() => {
                    label.label = `${name}: ${ip}`
                }, 1000)
            }
        })
    }

    #settingsRow() {
        return this.#row({
            label: "Settings (nmtui)",
            icon_name: "preferences-system-network",
            css_classes: ["widget-network-settings-row"],
            on_click: () => {
                execAsync(["kitty", "--name", "nmtui", "nmtui"]);
                this.#close();
            }
        })
    }

    #exitRow() {
        return this.#row({
            label: "Close",
            icon_name: "window-close",
            css_classes: ["widget-network-exit-row"],
            on_click: () => this.#close()
        })
    }

    #row({ label, icon_name, css_classes, on_click }) {
        const labelWidget = new Gtk.Label({
            label,
            justify: Gtk.Justification.LEFT,
            xalign: 0
        });

        const icon = new Gtk.Image({
            icon_name,
            icon_size: Gtk.IconSize.LARGE,
            pixel_size: 30,
        });

        const iconBox = new Gtk.Box({
            halign: 2,
            css_classes: ["widget-network-icon-box"],
        });
        iconBox.append(icon);

        const row = new Gtk.CenterBox({
            orientation: Gtk.Orientation.HORIZONTAL,
            halign: 0,
            css_classes: ["widget-network-clickable", "widget-network-row", ...css_classes],
            start_widget: labelWidget,
            end_widget: iconBox
        });

        const ctrl = new Gtk.GestureClick();
        ctrl.connect("pressed", () => on_click(labelWidget));
        row.add_controller(ctrl);

        return row;
    }
});

export default NetworkList;
