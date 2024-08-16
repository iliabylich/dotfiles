/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

const network = await Service.import("network")

function Wifi() {
    return Widget.Label({
        label: network.bind("wifi").as(wifi =>
            `${wifi.ssid || "Unknown"} (${wifi.strength}%) `
        ),
    })
}

function Wired() {
    return Widget.Label({
        label: network.bind("wired").as(wired =>
            `${wired.state} `
        )
    })
}

function NoConnection() {
    return Widget.Label("No connection")
}

export default function Network() {
    return Widget.Button({
        class_name: "network widget padded clickable",
        on_primary_click: () => App.toggleWindow("widget-network"),
        cursor: "pointer",
        child: Widget.Stack({
            children: {
                "wifi": Wifi(),
                "wired": Wired(),
                "no-connection": NoConnection()
            },
            shown: network.bind("primary").as(p => p || "no-connection")
        })
    })
}
