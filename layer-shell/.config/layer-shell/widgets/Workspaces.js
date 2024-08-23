import { HyprlandWorkspaces } from "../lib/Hyprland.js";
import loadTemplate from "../lib/loadTemplate.js";

export default class Workspaces {
    #widget = null;
    #buttons = null;
    #hyprland = null;

    constructor({ minWorkspaces }) {
        const [widget, ...buttons] = loadTemplate(
            "Workspaces",

            "WorkspaceButton1",
            "WorkspaceButton2",
            "WorkspaceButton3",
            "WorkspaceButton4",
            "WorkspaceButton5",
            "WorkspaceButton6",
            "WorkspaceButton7",
            "WorkspaceButton8",
            "WorkspaceButton9",
            "WorkspaceButton10"
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
