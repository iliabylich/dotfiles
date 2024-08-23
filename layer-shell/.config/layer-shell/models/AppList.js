import Gio from "gi://Gio?version=2.0";

export default class AppList {
    #selectedIdx = 0;
    #apps = [];
    #search = "";
    #maxSlots;

    constructor(maxSlots = 8) {
        this.#maxSlots = maxSlots;
        this.#fetchApps();
    }

    get apps() {
        return this.#visibleApps.
            map((app, idx) => ({ ...app, isSelected: idx == this.#selectedIdx }))
    }

    goUp() {
        const prevIdx = this.#previousVisibleAppIdx
        if (prevIdx !== null) {
            this.#selectedIdx = prevIdx
        }
    }
    goDown() {
        const nextIdx = this.#nextVisibleAppIdx
        if (nextIdx !== null) {
            this.#selectedIdx = nextIdx
        }
    }

    set search(search) {
        const previouslySelectedApp = this.selectedApp
        this.#search = search
        this.#selectedIdx = this.#visibleApps.findIndex(app => app.isVisible) || 0
        if (previouslySelectedApp) {
            const idInNewGeneration = this.#visibleApps.findIndex(app => app.name === previouslySelectedApp.name && app.isVisible)
            if (idInNewGeneration !== -1) {
                this.#selectedIdx = idInNewGeneration
            }
        }
    }

    get selectedApp() {
        return this.#visibleApps[this.#selectedIdx]
    }

    reset() {
        this.#selectedIdx = 0;
        this.#search = "";
        this.#fetchApps();
    }

    #fetchApps() {
        this.#apps = Gio.AppInfo.get_all()
            .filter(app => app.should_show())
            .map(app => Gio.DesktopAppInfo.new(app.get_id() || ''))
            .map(app => ({
                name: app.get_name(),
                iconName: app.get_string('Icon') || "",
                launch: () => app.launch([], null)
            }));
    }

    get #visibleApps() {
        let re = null
        try {
            re = new RegExp(this.#search, "i")
        } catch (e) {
        }

        let slotsLeft = this.#maxSlots;
        const isVisible = (appName) => {
            if (re && appName.match(re) === null) {
                return false
            }
            if (slotsLeft === 0) {
                return false
            }
            slotsLeft -= 1
            return true
        }

        return this.#apps.map(app => ({
            isVisible: isVisible(app.name),
            ...app
        }))
    }

    get #previousVisibleAppIdx() {
        for (let idx = this.#selectedIdx - 1; idx >= 0; idx--) {
            if (this.#visibleApps[idx] && this.#visibleApps[idx].isVisible) {
                return idx
            }
        }
        return null
    }

    get #nextVisibleAppIdx() {
        for (let idx = this.#selectedIdx + 1; idx < this.#visibleApps.length; idx++) {
            if (this.#visibleApps[idx].isVisible) {
                return idx
            }
        }
        return null
    }
}
