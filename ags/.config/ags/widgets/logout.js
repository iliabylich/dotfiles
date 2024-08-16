/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

const activeButtonIdx = Variable(0)
let buttonsCount = 0

function makeButton({ label, onclick }) {
    const idx = buttonsCount;
    buttonsCount += 1

    return Widget.Button({
        on_primary_click: onclick,
        class_name: activeButtonIdx.bind().as(v => `widget-logout-button ${v === idx ? "widget-logout-button-action" : ""}`),
        child: Widget.Label(label)
    })
}

const buttons = [
    {
        label: "Lock",
        onclick: () => {
            App.closeWindow("widget-logout")
            Utils.execAsync("hyprlock")
        }
    },
    {
        label: "Reboot",
        onclick: () => {
            App.closeWindow("widget-logout")
            Utils.execAsync("systemctl poweroff")
        }
    },
    {
        label: "Shutdown",
        onclick: () => {
            App.closeWindow("widget-logout")
            Utils.execAsync("systemctl reboot")
        }
    },
    {
        label: "Logout",
        onclick: () => {
            App.closeWindow("widget-logout")
            Utils.execAsync("hyprctl dispatch exit")
        }
    }
]

export default Widget.Window({
    name: "widget-logout",
    class_names: ["widget-logout"],
    visible: false,
    anchor: ["top", "right", "bottom", "left"],
    keymode: "exclusive",
    setup: self => {
        self.keybind("Escape", () => App.closeWindow("widget-logout"))
        self.keybind("Left", () => activeButtonIdx.value = Math.max(0, activeButtonIdx.value - 1))
        self.keybind("Right", () => activeButtonIdx.value = Math.min(buttonsCount - 1, activeButtonIdx.value + 1))
        self.keybind("Return", () => buttons[activeButtonIdx.value].onclick())
    },
    child: Widget.EventBox({
        on_primary_click: () => App.closeWindow("widget-logout"),
        child: Widget.Box({
            vertical: false,
            homogeneous: true,
            spacing: 200,
            class_names: ["widget-logout-wrapper"],
            children: buttons.map(makeButton)
        })
    })
})
