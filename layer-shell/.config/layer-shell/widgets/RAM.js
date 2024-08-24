import execAsync from "../lib/execAsync.js";
import Memory from "../models/Memory.js";
import loadWidgets from "../lib/loadWidgets.js";

export default function RAM() {
    const [widget, label] = loadWidgets("RAM", "RAMLabel");

    new Memory({
        onChange: ({ total, used }) => {
            label.label = `RAM ${used.toFixed(1)}G/${total.toFixed(1)}G`
        }
    });

    widget.connect("clicked", () => {
        execAsync(["gnome-system-monitor"]);
    })
}
