import AppListModel from "../models/AppList.js";
import loadWidgets from "../lib/loadWidgets.js";

function close() {
    globalThis.app.toggleWindow("Launcher");
}

export default function AppList() {
    const [entry, ...rows] = loadWidgets(
        "LauncherEntry",

        "LauncherRow1",
        "LauncherRow2",
        "LauncherRow3",
        "LauncherRow4",
        "LauncherRow5"
    );

    const model = new AppListModel({
        maxItems: 5,
        onChange: (apps) => {
            rows.forEach((row, idx) => {
                const app = apps[idx];
                if (!app) {
                    row.set_visible(false);
                    return
                }
                row.set_visible(true);
                if (app.isSelected) {
                    row.add_css_class("active");
                } else {
                    row.remove_css_class("active");
                }

                const [image, label] = [row.get_first_child(), row.get_last_child()];
                image.set_from_icon_name(app.iconName);
                label.set_label(app.name);
            })
        }
    });

    entry.connect("activate", () => {
        if (model.runSelected()) {
            close();
        }
    });
    entry.connect("notify::text", ({ text }) => {
        model.search = text;
    });

    const keyBindings = {
        "Up": () => model.goUp(),
        "Down": () => model.goDown(),
    }

    return {
        reset: () => {
            model.reset();
            entry.text = "";
        },
        onKeyPress: (key) => {
            const f = keyBindings[key];
            if (f) f()
        }
    }
}
