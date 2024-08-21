import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import execAsync from '../lib/execAsync.js';

const buttons = [
    {
        label: "Lock",
        onclick: () => {
            globalThis.app.toggleWindowByNamespace("LogoutScreen");
            execAsync(["hyprlock"])
        }
    },
    {
        label: "Reboot",
        onclick: () => {
            globalThis.app.toggleWindowByNamespace("LogoutScreen");
            execAsync(["systemctl", "reboot"])
        }
    },
    {
        label: "Shutdown",
        onclick: () => {
            globalThis.app.toggleWindowByNamespace("LogoutScreen");
            execAsync(["systemctl", "poweroff"])
        }
    },
    {
        label: "Logout",
        onclick: () => {
            globalThis.app.toggleWindowByNamespace("LogoutScreen");
            execAsync(["hyprctl", "dispatch", "exit"])
        }
    }
];

const Logout = GObject.registerClass({
    GTypeName: 'Logout'
}, class extends Gtk.Box {
    #activeId = 0;
    #buttons = [];

    constructor() {
        super({
            orientation: Gtk.Orientation.HORIZONTAL,
            homogeneous: true,
            spacing: 200,
            css_classes: ["widget-logout-wrapper"],
        });

        for (const config of buttons) {
            const button = new Gtk.Button({
                child: new Gtk.Label({ label: config.label }),
                css_classes: ["widget-logout-button"]
            });
            button.connect("clicked", config.onclick);
            this.#buttons.push(button);
            this.append(button);
        }

        this.#render();
    }

    reset() {
        this.#activeId = 0;
        this.#render();
    }

    onKeyPress(key) {
        switch (key) {
            case "Escape":
                return this.#close();
            case "Return":
                return this.#chooseCurrent();
            case "Left":
                return this.#left();
            case "Right":
                return this.#right();
        }
    }

    #close() {
        globalThis.app.toggleWindowByNamespace("LogoutScreen");
    }

    #chooseCurrent() { }

    #left() {
        this.#activeId = Math.max(0, this.#activeId - 1);
        this.#render();
    }
    #right() {
        this.#activeId = Math.min(buttons.length - 1, this.#activeId + 1);
        this.#render();
    }

    #render() {
        for (let i = 0; i < buttons.length; i++) {
            if (i === this.#activeId) {
                this.#buttons[i].add_css_class("widget-logout-button-action");
            } else {
                this.#buttons[i].remove_css_class("widget-logout-button-action");
            }
        }
    }
});

export default Logout;
