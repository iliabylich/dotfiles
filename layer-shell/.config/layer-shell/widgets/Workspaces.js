import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import { HyprlandWorkspaces } from "../lib/Hyprland.js";
import loadTemplate from "../lib/loadTemplate.js";

const Workspaces = GObject.registerClass({
    GTypeName: 'Workspaces'
}, class extends Gtk.Box {
    #buttons = [];
    #hyprland = null;

    constructor({ minWorkspaces }) {
        super({
            css_classes: ["workspaces", "widget"],
        });

        this.#buttons = loadTemplate(
            "Workspaces",
            [
                "button1",
                "button2",
                "button3",
                "button4",
                "button5",
                "button6",
                "button7",
                "button8",
                "button9",
                "button10"
            ]
        );

        this.#buttons.forEach((button, idx) => {
            this.append(button);
            button.connect("clicked", () => this.#hyprland.goTo(idx + 1));
        });

        this.#hyprland = new HyprlandWorkspaces({
            minWorkspaces,
            onChange: (workspaces) => this.#render(workspaces)
        });
    }

    #render(workspaces) {
        this.#buttons.forEach((button, idx) => {
            const { isVisible, isActive } = workspaces[idx];
            button.set_visible(isVisible);
            button.set_css_classes(isActive ? ["active"] : ["inactive"]);
        })
    }
});

export default Workspaces;
