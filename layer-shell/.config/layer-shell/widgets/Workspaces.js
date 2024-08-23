import { HyprlandWorkspaces } from "../lib/Hyprland.js";
import loadTemplate from "../lib/loadTemplate.js";

export default class Workspaces {
    #widget = null;
    #buttons = null;
    #hyprland = null;

    constructor({ minWorkspaces }) {
        const [widget, ...buttons] = loadTemplate(
            "Workspaces",

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
        );

        this.#widget = widget;
        this.#buttons = buttons;

        this.#buttons.forEach((button, idx) => {
            button.connect("clicked", () => this.#hyprland.goTo(idx + 1));
        });

        this.#hyprland = new HyprlandWorkspaces({
            minWorkspaces,
            onChange: (workspaces) => this.#render(workspaces)
        });
    }

    get widget() {
        return this.#widget;
    }

    #render(workspaces) {
        this.#buttons.forEach((button, idx) => {
            const { isVisible, isActive } = workspaces[idx];
            button.set_visible(isVisible);
            button.set_css_classes(isActive ? ["active"] : ["inactive"]);
        })
    }
}
