/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

const Applications = await Service.import("applications")

class Launcher extends Service {
    static {
        Service.register(
            this,
            {},
            {
                "search": ["string", "r"],
                "apps": ["jsobject", "r"]
            }
        )
    }

    #search = ""
    #selectedIdx = 0
    #apps = []

    constructor() {
        super()

        this.#reset()
    }

    reset() {
        this.#reset()
        this.changed("search")
        this.changed("apps")
    }

    #reset() {
        this.#selectedIdx = 0
        this.#search = ""

        this.#updateApps()
    }

    #updateApps() {
        let re = null
        try {
            re = new RegExp(this.#search, "i")
        } catch (e) {
        }

        let slotsLeft = 8
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

        this.#apps = Applications.query("").map(app => ({
            name: app.name,
            icon_name: app.icon_name || "",
            isVisible: isVisible(app.name),
            launch: () => app.launch()
        }))
    }

    /** @return {Applications["list"][0]} */
    get selectedApp() {
        return this.#apps[this.#selectedIdx]
    }

    get #previousVisibleAppIdx() {
        for (let idx = this.#selectedIdx - 1; idx >= 0; idx--) {
            if (this.#apps[idx] && this.#apps[idx].isVisible) {
                return idx
            }
        }
        return null
    }

    get #nextVisibleAppIdx() {
        for (let idx = this.#selectedIdx + 1; idx < this.#apps.length; idx++) {
            if (this.#apps[idx].isVisible) {
                return idx
            }
        }
        return null
    }

    goUp() {
        const prevIdx = this.#previousVisibleAppIdx
        if (prevIdx !== null) {
            this.#selectedIdx = prevIdx
            this.changed("apps")
        }
    }

    goDown() {
        const nextIdx = this.#nextVisibleAppIdx
        if (nextIdx !== null) {
            this.#selectedIdx = nextIdx
            this.changed("apps")
        }
    }

    /** @param {string} value */
    set search(value) {
        if (this.#search === value) {
            return
        }
        const previouslySelectedApp = this.selectedApp
        this.#search = value
        this.#updateApps()
        this.#selectedIdx = this.#apps.findIndex(app => app.isVisible) || 0
        if (previouslySelectedApp) {
            const idInNewGeneration = this.#apps.findIndex(app => app.name === previouslySelectedApp.name && app.isVisible)
            if (idInNewGeneration !== -1) {
                this.#selectedIdx = idInNewGeneration
            }
        }
        this.changed("search")
        this.changed("apps")
    }

    get apps() {
        return this.#apps.map((app, idx) => ({
            name: app.name,
            icon_name: app.icon_name,
            isVisible: app.isVisible,
            isSelected: idx === this.#selectedIdx,
            launch: app.launch
        }))
    }

    get search() {
        return this.#search
    }

    bindByIdx(idx) {
        return this.bind("apps").as(apps => apps[idx])
    }
}

export default new Launcher()
