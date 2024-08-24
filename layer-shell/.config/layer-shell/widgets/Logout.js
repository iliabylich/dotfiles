import execAsync from "../lib/execAsync.js";
import loadWidgets from "../lib/loadWidgets.js";

const actions = [
    () => {
        close();
        execAsync(["hyprlock"])
    },
    () => {
        close();
        execAsync(["systemctl", "reboot"])
    },
    () => {
        close();
        execAsync(["systemctl", "poweroff"])
    },
    () => {
        close();
        execAsync(["hyprctl", "dispatch", "exit"])
    }
]

function close() {
    globalThis.app.toggleWindow("LogoutScreen");
}

class Model {
    #idx = 0;
    #max = 4;
    #onChange = null;

    constructor({ max, onChange }) {
        this.#max = max;
        this.#onChange = onChange;
        this.#changed();
    }

    reset() {
        this.#idx = 0;
        this.#changed();
    }

    left() {
        this.#idx = Math.max(0, this.#idx - 1);
        this.#changed();
    }
    right() {
        this.#idx = Math.min(this.#max - 1, this.#idx + 1);
        this.#changed();
    }

    #changed() {
        this.#onChange({ activeIdx: this.#idx });
    }
}

export default function Logout() {
    const buttons = loadWidgets(
        "LockButton",
        "RebootButton",
        "ShutdownButton",
        "LogoutButton",
    );

    if (buttons.length !== actions.length) {
        const message = `[Logout] Different number of buttons and actions: ${buttons.length} vs ${actions.length}`;
        console.error(message);
        throw new Error(message);
    }
    buttons.forEach((button, idx) => {
        button.connect("clicked", actions[idx]);
    })

    const model = new Model({
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
    })

    const keyBindings = {
        "Escape": close,
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
