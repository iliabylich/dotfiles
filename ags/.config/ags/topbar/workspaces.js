/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

import hyperland from "../services/hyperland.js"

export default function Workspaces() {
    return Widget.Box({
        class_name: "workspaces widget",
        children: hyperland.bind("workspaces").as(ws => ws.map(({ id, active }) =>
            Widget.Button({
                on_clicked: () => hyperland.goTo(id),
                child: Widget.Label(`${id}`),
                class_name: active ? "active" : "inactive",
            })
        )),
    })
}
