/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

import cpu from "../services/cpu.js"

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

export default function CPU() {
    return Widget.Box({
        class_name: "widget cpu padded",
        vertical: false,
        spacing: 3,
        children: cpu.bind("usage")
            .as(loads => loads.map(load =>
                Widget.Label({
                    label: indicator(load),
                    useMarkup: true
                })
            ))
    })
}
