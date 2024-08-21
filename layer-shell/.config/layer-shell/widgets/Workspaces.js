import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import execAsync from "../lib/execAsync.js";
import { subscribe } from "../lib/Hyprland.js";

const Workspaces = GObject.registerClass({
    GTypeName: 'Workspaces'
}, class extends Gtk.Box {
    #buttons = [];
    #minWorkspaces = 0;
    #workspacesIds = new Set();
    #activeId = 0;

    constructor({ minWorkspaces }) {
        super({
            css_classes: ["workspaces", "widget"],
        });

        this.#minWorkspaces = minWorkspaces;

        for (let i = 0; i < 10; i++) {
            const button = new Gtk.Button({
                visible: true,
                child: new Gtk.Label({ label: `${i + 1}` }),
                css_classes: ["inactive"]
            });
            button.connect("clicked", () => this.#goTo(i + 1));
            this.append(button);
            this.#buttons.push(button);
        }

        this.#loadInitialValueAndRender();

        subscribe(async (event, payload) => {
            try {
                if (event === "createworkspace") {
                    this.#workspacesIds.add(parseInt(payload, 10));
                    this.#render();
                } else if (event === "destroyworkspace") {
                    this.#workspacesIds.delete(parseInt(payload, 10));
                    this.#render();
                } else if (event === "workspace") {
                    this.#activeId = parseInt(payload, 10);
                    this.#render();
                }
            } catch (e) {
                console.error("[Workspace] error", e);
            }
        })
    }

    async #execHyprctl(cmd) {
        const stdout = await execAsync(["hyprctl", ...cmd]);
        return JSON.parse(stdout)
    }

    async #resync() {
        const workspaces = await this.#execHyprctl(["workspaces", "-j"]);
        this.#workspacesIds = new Set(workspaces.map(w => w.id));

        const activeWorkspaces = await this.#execHyprctl(["activeworkspace", "-j"]);
        this.#activeId = activeWorkspaces.id;
    }

    async #loadInitialValueAndRender() {
        try {
            await this.#resync();
            this.#render();
        } catch (e) {
            console.error("[Workspaces] error", e);
        }
    }

    #goTo(id) {
        execAsync(["hyprctl", "dispatch", "workspace", `${id}`])
    }

    #render() {
        const idsToShow = new Set(this.#workspacesIds)
        idsToShow.add(this.#activeId)

        // create min required number of workspaces
        for (let id = 1; id <= this.#minWorkspaces; id++) {
            idsToShow.add(id)
        }

        for (let id = 1; id <= 10; id++) {
            const button = this.#buttons[id - 1];

            button.set_visible(idsToShow.has(id));
            button.set_css_classes(
                id === this.#activeId ? ["active"] : ["inactive"]
            );
        }
    }
});

export default Workspaces;
