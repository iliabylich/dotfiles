/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

import language from "../services/language.js"

export default function Language({ prettyLayoutName }) {
    return Widget.CenterBox({
        class_name: "widget language padded",
        center_widget: Widget.Label({
            label: language.bind("layout").as(layout => prettyLayoutName[layout] || layout)
        })
    })
}
