import loadWidgets from "../lib/loadWidgets.js";
import LogoutModel from "../models/Logout.js";

export default function Logout() {
    const buttons = loadWidgets(
        "LockButton",
        "RebootButton",
        "ShutdownButton",
        "LogoutButton",
    );

    const model = new LogoutModel({
        max: buttons.length,
        onChange: ({ activeIdx }) => {
            buttons.forEach((button, idx) => {
                if (idx === activeIdx) {
                    button.add_css_class("widget-logout-button-action");
                } else {
                    button.remove_css_class("widget-logout-button-action");
                }
            })
        }
    });

    buttons[0].connect("clicked", () => model.lock());
    buttons[1].connect("clicked", () => model.reboot());
    buttons[2].connect("clicked", () => model.shutdown());
    buttons[3].connect("clicked", () => model.logout());

    const keyBindings = {
        "Left": () => model.left(),
        "Right": () => model.right(),
    }

    return {
        reset: () => model.reset(),
        onKeyPress: (key) => {
            const f = keyBindings[key];
            if (f) f()
        }
    }
}
