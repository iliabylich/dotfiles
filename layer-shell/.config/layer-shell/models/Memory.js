import execAsync from "../lib/execAsync.js";

export default class Memory {
    #onChange = null;

    constructor({ onChange }) {
        this.#onChange = onChange;

        this.#refresh();
        setInterval(() => this.#refresh(), 1000);
    }

    async #refresh() {
        try {
            const stdout = await execAsync(["free", "-m"])
            const line = stdout.split("\n")[1]
            const parts = line.split(/\s+/)
            const total = parts[1] / 1024
            const used = parts[2] / 1024
            this.#onChange({ total, used })
        } catch (e) {
            console.error("[Memory] error", e);
        }
    }
}
