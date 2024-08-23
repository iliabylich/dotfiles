import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import CPULoad from "../models/CPU.js";

const CPU = GObject.registerClass({
    GTypeName: "CPU"
}, class extends Gtk.Box {
    #hasLabels = false

    constructor() {
        super({
            css_classes: ["widget", "cpu", "padded"],
            spacing: 3,
            orientation: Gtk.Orientation.HORIZONTAL,
        });

        new CPULoad({
            onChange: (usage) => this.#render(usage)
        })
    }

    #render(usage) {
        if (this.#hasLabels) {
            // re-render
            let label = this.get_first_child();
            let idx = 0;
            while (label) {
                label.label = indicator(usage[idx]);
                label = label.get_next_sibling();
                idx += 1;
            }
        } else {
            // initial render
            for (const load of usage) {
                this.append(
                    new Gtk.Label({
                        label: indicator(load),
                        use_markup: true
                    })
                )
            }
            this.#hasLabels = true;
        }
    }
});

const INDICATORS = [
    "<span color='#FFFFFF'>▁</span>",
    "<span color='#FFD5D5'>▂</span>",
    "<span color='#FFAAAA'>▃</span>",
    "<span color='#FF8080'>▄</span>",
    "<span color='#FF5555'>▅</span>",
    "<span color='#FF2B2B'>▆</span>",
    "<span color='#FF0000'>▇</span>",
    "<span color='#E60000'>█</span>"
]

function indicator(load) {
    let idx = Math.trunc(load / 100 * INDICATORS.length)
    if (idx == INDICATORS.length) {
        idx -= 1
    }
    return INDICATORS[idx]
}

export default CPU;
