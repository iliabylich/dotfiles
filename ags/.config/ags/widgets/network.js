/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

import network_list from "../services/network_list.js"

let NetworkWidget

function row({ label, icon_name, class_name, on_click }) {
    const labelWidget = Widget.Label({
        label,
        justification: "left",
        xalign: 0
    })

    return Widget.EventBox({
        on_primary_click: () => on_click(labelWidget),
        class_names: ["widget-network-clickable"],
        child: Widget.CenterBox({
            vertical: false,
            halign: 0,
            class_names: ["widget-network-row", class_name],
            start_widget: labelWidget,
            end_widget: Widget.Box({
                halign: 2,
                class_names: ["widget-network-icon-box"],
                children: [
                    Widget.Icon({ icon: icon_name, size: 30 }),
                ]
            })
        })
    })
}

function networkRow({ ip, name }) {
    return row({
        label: `${name}: ${ip}`,
        icon_name: "edit-copy",
        class_name: "widget-network-ip-row",
        on_click: (label) => {
            clipboard.set_text(ip, ip.length)
            label.label = "Copied!"
            setTimeout(() => {
                label.label = `${name}: ${ip}`
            }, 1000)
        }
    })
}

function settingsRow() {
    return row({
        label: "Settings (nmtui)",
        icon_name: "preferences-system-network",
        class_name: "widget-network-settings-row",
        on_click: () => {
            Utils.execAsync("kitty --name nmtui nmtui")
            NetworkWidget.visible = !NetworkWidget.visible
        }
    })
}

const clipboard = imports.gi.Gtk.Clipboard.get("CLIPBOARD")

function exitRow() {
    return row({
        label: "Close",
        icon_name: "window-close",
        class_name: "widget-network-exit-row",
        on_click: () => NetworkWidget.visible = !NetworkWidget.visible
    })
}

NetworkWidget = Widget.Window({
    name: "widget-network",
    anchor: ["top", "right"],
    margins: [0, 0, 0, 0],
    exclusivity: "exclusive",
    monitor: 0,
    class_names: ["widget-network"],
    visible: false,
    keymode: "exclusive",
    setup: self => self.keybind("Escape", () => {
        App.closeWindow("widget-network")
    }),
    child: Widget.Box({
        vertical: true,
        class_names: ["widget-network-row-list"],
        children: network_list.bind("list").as(networks => [
            ...networks.map(networkRow),
            settingsRow(),
            exitRow(),
        ])
    })
})

export default NetworkWidget
