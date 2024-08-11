/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

import systemclock from "../services/systemclock.js"

export default function Clock({ format, tooltipFormat }) {
    return Widget.CenterBox({
        class_name: "clock widget padded",
        center_widget: Widget.Label({
            label: systemclock.bindWithFormat(format),
            tooltip_text: systemclock.bindWithFormat(tooltipFormat)
        })
    })
}
