/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

import Workspaces from "./workspaces.js"
import Power from "./power.js"
import Clock from "./clock.js"
import Network from "./network.js"
import Memory from "./memory.js"
import CPU from "./cpu.js"
import Sound from "./sound.js"
import Language from "./language.js"

export default function Topbar(monitor = 0) {
    return Widget.Window({
        name: `bar-${monitor}`, // name has to be unique
        class_name: "bar",
        monitor,
        anchor: ["top", "left", "right"],
        exclusivity: "exclusive",
        child: Widget.CenterBox({
            class_name: "main-wrapper",
            start_widget: Widget.Box({
                spacing: 8,
                children: [
                    Workspaces(),
                ],
            }),
            end_widget: Widget.Box({
                hpack: "end",
                spacing: 4,
                children: [
                    Language({
                        prettyLayoutName: {
                            "English (US)": "EN"
                        }
                    }),
                    Sound(),
                    CPU(),
                    Memory(),
                    Network(),
                    Clock({
                        format: "%H:%M:%S",
                        tooltipFormat: "%Y %B %e\n%A"
                    }),
                    Power()
                ],
            }),
        }),
    })
}
