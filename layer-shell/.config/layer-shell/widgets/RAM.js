import execAsync from "../lib/execAsync.js";
import Memory from "../models/Memory.js";
import loadTemplate from "../lib/loadTemplate.js";

export default class RAM {
    #widget = null;
    #label = null;

    constructor() {
        const [widget, label] = loadTemplate("RAM", "RAMLabel");
        this.#widget = widget;
        this.#label = label;

        new Memory({
            onChange: (memory) => this.#refresh(memory)
        });

        this.#widget.connect("clicked", () => {
            execAsync(["gnome-system-monitor"]);
        })
    }

    get widget() {
        return this.#widget;
    }

    #refresh({ total, used }) {
        this.#label.label = `RAM ${used.toFixed(1)}G/${total.toFixed(1)}G`
    }
}
