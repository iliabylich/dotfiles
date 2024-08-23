import execAsync from "../lib/execAsync.js";

export default class CPU {
    #onChange = null;
    #previous = null

    constructor({ onChange }) {
        this.#onChange = onChange;

        this.#refresh();
        setInterval(() => this.#refresh(), 1000);
    }

    async #refresh() {
        try {
            const usage = await this.#getUsage();
            this.#onChange(usage);
        } catch (e) {
            console.error("[CPU] error", e)
        }
    }

    async #getUsage() {
        const current = await this.#parse()
        if (!this.#previous) {
            this.#previous = current
            return new Array(current.length).fill(0)
        }

        if (this.#previous.length != current.length) {
            throw new Error(`different number of CPU cores: ${this.#previous.length} -> ${current.length}`)
        }

        const usage = current.map((cpu, i) => cpu.loadComparingTo(this.#previous[i]))
        this.#previous = current;
        return usage;
    }

    async #parse() {
        const stdout = await execAsync(["cat", "/proc/stat"])
        return stdout
            .split("\n")
            .filter(line => line.match(/^cpu\d/))
            .map(line => CpuCoreInfo.parse(line))

    }
}

class CpuCoreInfo {
    constructor(id, idle, total) {
        this.id = id
        this.idle = idle
        this.total = total
    }

    static parse(line) {
        const parts = line.split(" ")
        const id = parseInt(parts[0].replace("cpu", ""), 10)
        const times = parts.slice(1).map(n => parseInt(n, 10))
        const idle = times[3] + times[4]
        const total = times.reduce((acc, n) => acc + n, 0)
        return new CpuCoreInfo(id, idle, total)
    }

    loadComparingTo(previous) {
        if (this.id != previous.id) {
            throw new Error(`can't compare different CPUs (cpu${this.id} vs cpu${previous.id})`)
        }

        const idle_d = this.idle - previous.idle
        const total_d = this.total - previous.total

        return 100 * (1 - idle_d / total_d)
    }
}
