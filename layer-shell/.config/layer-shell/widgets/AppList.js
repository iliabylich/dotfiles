import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import Pango from "gi://Pango?version=1.0";
import AppListModel from "../models/AppList.js";

const AppList = GObject.registerClass({
    GTypeName: 'AppList'
}, class extends Gtk.Box {
    #container = null;
    #entry = null;

    #applist = new AppListModel(8);

    constructor() {
        super({
            css_classes: ["widget-launcher-wrapper"],
            orientation: Gtk.Orientation.VERTICAL,
        })

        this.#container = new Gtk.Box({
            css_classes: ["widget-launcher-row-list"],
            orientation: Gtk.Orientation.VERTICAL,
        })

        this.#entry = new Gtk.Entry({
            css_classes: ["widget-launcher-search-box"],
            hexpand: true,
            text: "",
            primary_icon_name: "system-search",
        });
        this.#entry.connect("activate", () => {
            if (this.#applist.selectedApp) {
                this.#applist.selectedApp.launch();
                this.#close();
            }
        });
        this.#entry.connect("notify::text", ({ text }) => {
            this.#applist.search = text;
            this.#render();
        })
        this.append(this.#entry);

        this.append(new Gtk.ScrolledWindow({
            css_classes: ["widget-launcher-scroll-list"],
            can_focus: false,
            child: this.#container
        }));
        this.reset();
    }

    onKeyPress(key) {
        switch (key) {
            case "Escape":
                this.#close();
                break;
            case "Up":
                this.#applist.goUp();
                this.#render();
                break;
            case "Down":
                this.#applist.goDown();
                this.#render();
                break;
        }
    }

    reset() {
        this.#applist.reset();
        this.#entry.text = "";
        this.#render();
    }

    #render() {
        while (true) {
            const child = this.#container.get_first_child();
            if (!child) {
                break;
            }
            this.#container.remove(child);
        }

        for (const app of this.#applist.apps) {
            if (app.isVisible) {
                const row = new Gtk.Box({
                    css_classes: app.isSelected ?
                        ["widget-launcher-row", "widget-launcher-row-active"] :
                        ["widget-launcher-row", "widget-launcher-row-inactive"],

                });
                const ctrl = new Gtk.GestureClick();
                ctrl.connect("pressed", () => {
                    app.launch();
                    this.#close();
                });
                row.add_controller(ctrl);

                row.append(new Gtk.Image({
                    icon_name: app.iconName,
                    css_classes: ["widget-launcher-icon"],
                    icon_size: Gtk.IconSize.LARGE
                }));
                row.append(new Gtk.Label({
                    css_classes: ["widget-launcher-label"],
                    label: app.name,
                    xalign: 0,
                    valign: Gtk.Align.CENTER,
                    ellipsize: Pango.EllipsizeMode.END,
                }));

                this.#container.append(row);
            }
        }
    }

    #close() {
        globalThis.app.toggleWindow("Launcher");
    }
});

export default AppList;
