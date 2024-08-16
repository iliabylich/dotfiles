import launcher from "../services/launcher.js"

const AppItem = (app, idx) => {
    const appBind = launcher.bindByIdx(idx)

    return Widget.EventBox({
        on_primary_click: () => app.launch(),
        child: Widget.Box({
            class_names: appBind.as(app => app.isSelected ?
                ["widget-launcher-row", "widget-launcher-row-active"] :
                ["widget-launcher-row", "widget-launcher-row-inactive"]
            ),
            visible: appBind.as(app => app.isVisible),
            children: [
                Widget.Icon({
                    class_names: ["widget-launcher-icon"],
                    icon: app.icon_name,
                    size: 32,
                }),
                Widget.Label({
                    class_names: ["widget-launcher-label"],
                    label: appBind.as(app => app.name),
                    xalign: 0,
                    vpack: "center",
                    truncate: "end",
                }),
            ],
        }),
    })
}

const Applauncher = () => {
    let searchBox = null

    return Widget.Box({
        vertical: true,
        class_names: ["widget-launcher-wrapper"],
        children: [
            Widget.Entry({
                hexpand: true,
                class_names: ["widget-launcher-search-box"],
                text: launcher.bind("search"),
                primary_icon_name: "system-search",

                on_accept: () => {
                    if (launcher.selectedApp) {
                        launcher.selectedApp.launch()
                        App.toggleWindow("widget-launcher")
                    }
                },

                on_change: ({ text }) => launcher.search = text || "",
                setup: self => searchBox = self,
            }),

            Widget.Scrollable({
                hscroll: "never",
                class_names: ["widget-launcher-scroll-list"],
                child: Widget.Box({
                    vertical: true,
                    class_names: ["widget-launcher-row-list"],
                    children: launcher.apps.map((app, idx) => AppItem(app, idx))
                }),
                can_focus: false
            })
        ],
        setup: self => {
            launcher.reset() // initial load

            self.hook(App, (_, windowName, visible) => {
                if (windowName === "widget-launcher" && visible) {
                    launcher.reset() // re-open
                }
            })
        },
    })
}

const applauncher = Widget.Window({
    name: "widget-launcher",
    setup: self => {
        self.keybind("Escape", () => App.closeWindow("widget-launcher"))
        self.keybind("Down", () => launcher.goDown())
        self.keybind("Up", () => launcher.goUp())
    },
    class_names: ["widget-launcher"],
    visible: true,
    keymode: "exclusive",
    child: Applauncher(),
    width_request: 700,
})

export default applauncher
