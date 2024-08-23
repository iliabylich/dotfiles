import Gio from "gi://Gio?version=2.0";
import GLib from "gi://GLib?version=2.0";

import execAsync from "../lib/execAsync.js";

const HYPRLAND_INSTANCE_SIGNATURE = GLib.getenv('HYPRLAND_INSTANCE_SIGNATURE');
const XDG_RUNTIME_DIR = GLib.getenv('XDG_RUNTIME_DIR');

const socketPath = `${XDG_RUNTIME_DIR}/hypr/${HYPRLAND_INSTANCE_SIGNATURE}/.socket2.sock`;
const socket = new Gio.SocketClient().connect(new Gio.UnixSocketAddress({ path: socketPath }), null)

const stream = new Gio.DataInputStream({
    close_base_stream: true,
    base_stream: socket.get_input_stream(),
});

const decoder = new TextDecoder();

const eventHandlers = [];

function readNextLine() {
    stream.read_line_async(0, null, (_s, result) => {
        const [bytes] = stream.read_line_finish(result);
        const line = decoder.decode(bytes)

        const sepIdx = line.indexOf(">>");
        const event = line.slice(0, sepIdx);
        const payload = line.slice(sepIdx + 2);

        for (const handler of eventHandlers) {
            handler(event, payload)
        }

        readNextLine();
    });
}

readNextLine()

export class HyprlandWorkspaces {
    #minWorkspaces = 0;
    #workspaceIds = new Set();
    #activeId = 0;
    #onChange = () => { };

    constructor({ minWorkspaces, onChange }) {
        this.#minWorkspaces = minWorkspaces;
        this.#onChange = onChange;

        eventHandlers.push(async (event, payload) => {
            try {
                if (event === "createworkspace") {
                    this.#workspaceIds.add(parseInt(payload, 10));
                    this.#changed();
                } else if (event === "destroyworkspace") {
                    this.#workspaceIds.delete(parseInt(payload, 10));
                    this.#changed();
                } else if (event === "workspace") {
                    this.#activeId = parseInt(payload, 10);
                    this.#changed();
                }
            } catch (e) {
                console.error("[Workspace] error", e);
            }
        })

        this.#loadInitialData();
    }

    goTo(id) {
        execAsync(["hyprctl", "dispatch", "workspace", `${id}`])
    }

    async #execHyprctl(cmd) {
        const stdout = await execAsync(["hyprctl", ...cmd]);
        return JSON.parse(stdout)
    }

    async #resync() {
        const workspaces = await this.#execHyprctl(["workspaces", "-j"]);
        this.#workspaceIds = new Set(workspaces.map(w => w.id));

        const activeWorkspaces = await this.#execHyprctl(["activeworkspace", "-j"]);
        this.#activeId = activeWorkspaces.id;
    }

    async #loadInitialData() {
        try {
            await this.#resync();
            this.#changed();
        } catch (e) {
            console.error("[Workspaces] error", e);
        }
    }

    #changed() {
        this.#onChange(this.#data);
    }

    get #data() {
        const idsToShow = new Set(this.#workspaceIds)
        idsToShow.add(this.#activeId)

        // create min required number of workspaces
        for (let id = 1; id <= this.#minWorkspaces; id++) {
            idsToShow.add(id)
        }

        const workspaces = [];
        for (let id = 1; id <= 10; id++) {
            workspaces.push({
                id,
                isVisible: idsToShow.has(id),
                isActive: id === this.#activeId
            })
        }
        return workspaces;
    }
}

export class HyprlandLanguage {
    #onChange = null;

    constructor({ onChange }) {
        this.#onChange = onChange;

        this.#loadInitialValue();

        eventHandlers.push((event, payload) => {
            if (event === "activelayout") {
                const payloadParts = payload.split(",")
                const layout = payloadParts[payloadParts.length - 1];

                this.#onChange(layout)
            }
        });
    }

    async #loadInitialValue() {
        try {
            const devices = JSON.parse(await execAsync(["hyprctl", "devices", "-j"]));
            const layout = devices.keyboards.find(kb => kb.main).active_keymap;
            this.#onChange(layout)
        } catch (e) {
            console.error("[Language] error", e)
        }
    }
}
