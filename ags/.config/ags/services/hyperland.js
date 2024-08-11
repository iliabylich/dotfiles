/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

const hyprland = await Service.import("hyprland")

class Hyperland extends Service {
    static {
        Service.register(
            this,
            {},
            {
                "workspaces": ["jsobject", "r"],
            }
        )
    }

    #workspaces = []

    minWorkspaces = 5

    constructor() {
        super()

        this.#reload(
            hyprland.workspaces.map(w => w.id),
            hyprland.active.workspace.id
        )

        hyprland.connect("event", (hyprland, name, data) => {
            if (name == "workspace") {
                const activeId = parseInt(data, 10)
                let ids = hyprland.workspaces.filter(w => w.windows > 0).map(w => w.id)
                this.#reload(ids, activeId)
            }
        })
    }

    get workspaces() {
        return this.#workspaces
    }

    goTo(id) {
        hyprland.messageAsync(`dispatch workspace ${id}`)
    }

    #reload(ids, activeId) {
        ids = new Set(ids)
        ids.add(activeId)

        // create min required number of workspaces
        for (let id = 1; id <= this.minWorkspaces; id++) {
            ids.add(id)
        }

        this.#workspaces = [...ids]
            .sort((a, b) => a - b)
            .map(id => ({ id, active: id == activeId }))
        this.changed("workspaces")
    }
}

export default new Hyperland()
