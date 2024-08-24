import { HyprlandWorkspaces } from "../models/Hyprland.js";
import loadWidgets from "../lib/loadWidgets.js";

export default function Workspaces({ minWorkspaces }) {
    const buttons = loadWidgets(
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

    const hyprland = new HyprlandWorkspaces({
        minWorkspaces,
        onChange: (workspaces) => {
            buttons.forEach((button, idx) => {
                const { isVisible, isActive } = workspaces[idx];
                button.set_visible(isVisible);
                button.set_css_classes(isActive ? ["active"] : ["inactive"]);
            })
        }
    });

    buttons.forEach((button, idx) => {
        button.connect("clicked", () => hyprland.goTo(idx + 1));
    });
}
