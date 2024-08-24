import CPULoad from "../models/CPU.js";
import loadWidgets from "../lib/loadWidgets.js";

export default function CPU() {
    const labels = loadWidgets(
        "CPU1",
        "CPU2",
        "CPU3",
        "CPU4",
        "CPU5",
        "CPU6",
        "CPU7",
        "CPU8",
        "CPU9",
        "CPU10",
        "CPU11",
        "CPU12",
    );

    new CPULoad({
        onChange: (usage) => {
            if (usage.length !== labels.length) {
                throw new Error(`[CPU] got ${usage.length} CPUs for ${labels.length} labels`);
            }
            usage.forEach((load, idx) => {
                labels[idx].label = indicator(load);
            })
        }
    })
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
