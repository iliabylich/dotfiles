import Gio from "gi://Gio?version=2.0";
import execAsync from "../lib/execAsync.js";

function exclude(appName) {
    if (appName === "Google Chrome") {
        return true;
    }
    return false;
}

function customApps() {
    return [
        {
            name: "Google Chrome (wayland, gtk4)",
            iconName: "google-chrome",
            launch: () => execAsync(["google-chrome-stable", "--gtk-version=4", "--ozone-platform-hint=wayland"])
        }
    ]
}

export default class AppList {
    #selectedIdx = 0;
    #globalAppList = [];
    #visibleAppList = [];
    #maxItems;
    #onChange;

    constructor({ maxItems, onChange }) {
        this.#maxItems = maxItems;
        this.#onChange = onChange;
        this.#refreshGlobalAppList();
        this.#refreshVisibleAppList("");
        this.#changed();
    }

    goUp() {
        this.#selectedIdx = Math.max(0, this.#selectedIdx - 1);
        this.#changed();
    }
    goDown() {
        this.#selectedIdx = Math.min(this.#maxItems - 1, this.#selectedIdx + 1);
        this.#changed();
    }

    set search(search) {
        this.#selectedIdx = 0;
        this.#refreshVisibleAppList(search);
        this.#changed();
    }

    runSelected() {
        const app = this.#visibleAppList[this.#selectedIdx];
        if (app) {
            app.launch();
            return true;
        } else {
            return false;
        }
    }

    #refreshVisibleAppList(search) {
        let re = null
        try {
            re = new RegExp(search, "i")
        } catch (e) {
        }

        if (!re) {
            this.#visibleAppList = this.#globalAppList;
            return;
        }

        this.#visibleAppList = this.#globalAppList
            .filter(app => app.name.match(re) !== null)
            .filter(app => !exclude(app.name))
            .slice(0, this.#maxItems)
    }

    reset() {
        this.#selectedIdx = 0;
        this.#refreshGlobalAppList();
        this.#refreshVisibleAppList("");
    }

    #refreshGlobalAppList() {
        this.#globalAppList = [
            ...customApps(),
            ...Gio.AppInfo.get_all()
                .filter(app => app.should_show())
                .map(app => Gio.DesktopAppInfo.new(app.get_id() || ''))
                .map(app => ({
                    name: app.get_name(),
                    iconName: app.get_string('Icon') || "",
                    launch: () => app.launch([], null)
                }))
        ];
    }

    #changed() {
        const apps = this.#visibleAppList
            .map((app, idx) => ({ ...app, isSelected: idx === this.#selectedIdx }));
        this.#onChange(apps)
    }
}
