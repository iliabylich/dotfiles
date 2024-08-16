/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

import memory from "../services/memory.js"

export default function Memory() {
    return Widget.Button({
        class_name: "widget memory padded clickable",
        on_primary_click: () => {
            Utils.execAsync("gnome-system-monitor")
        },
        child: Widget.Label({
            label: Utils.merge(
                [memory.bind("used"), memory.bind("total")],
                (used, total) => `RAM ${used.toFixed(1)}G/${total.toFixed(1)}G`
            )
        })
    })
}
