import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import execAsync from "../lib/execAsync.js";

const CPU = GObject.registerClass({
    GTypeName: "CPU"
}, class extends Gtk.Box {
    #previous = null
    #hasLabels = false

    constructor() {
        super({
            css_classes: ["widget", "cpu", "padded"],
            spacing: 3,
            orientation: Gtk.Orientation.HORIZONTAL,
        });

        this.#refresh();
        setInterval(() => this.#refresh(), 1000);
    }

    async #refresh() {
        try {
            const usage = await this.#getUsage();
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
        } catch (e) {
            console.error("[CPU] error", e)
        }
    }

    async #getUsage() {
        const current = await this.#parse()
        if (!this.#previous) {
            this.#previous = current
            return new Array(current.length).fill(0)
        }

        if (this.#previous.length != current.length) {
            throw new Error(`different number of CPU cores: ${this.#previous.length} -> ${current.length}`)
        }

        const usage = current.map((cpu, i) => cpu.loadComparingTo(this.#previous[i]))
        this.#previous = current;
        return usage;
    }

    async #parse() {
        const stdout = await execAsync(["cat", "/proc/stat"])
        return stdout
            .split("\n")
            .filter(line => line.match(/^cpu\d/))
            .map(line => CpuInfo.parse(line))

    }
});

class CpuInfo {
    constructor(id, idle, total) {
        this.id = id
        this.idle = idle
        this.total = total
    }

    static parse(line) {
        const parts = line.split(" ")
        const id = parseInt(parts[0].replace("cpu", ""), 10)
        const times = parts.slice(1).map(n => parseInt(n, 10))
        const idle = times[3] + times[4]
        const total = times.reduce((acc, n) => acc + n, 0)
        return new CpuInfo(id, idle, total)
    }

    loadComparingTo(previous) {
        if (this.id != previous.id) {
            throw new Error(`can't compare different CPUs (cpu${this.id} vs cpu${previous.id})`)
        }

        const idle_d = this.idle - previous.idle
        const total_d = this.total - previous.total

        return 100 * (1 - idle_d / total_d)
    }
}

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
