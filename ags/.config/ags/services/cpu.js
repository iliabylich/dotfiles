/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

class CPU extends Service {
    static {
        Service.register(
            this,
            {},
            {
                "usage": ["jsobject", "r"],
            }
        )
    }

    #usage = []
    #previous = null

    refreshIntervalInMs = 1000

    constructor() {
        super()

        this.#tryReload()
        setInterval(async () => this.#tryReload(), this.refreshIntervalInMs)
    }

    get usage() {
        return this.#usage
    }

    async #tryReload() {
        try {
            await this.#reload()
        } catch (e) {
            console.log("[CPU service]", e)
        }
    }

    async #reload() {
        const current = await this.#parse()
        if (!this.#previous) {
            this.#previous = current
            this.#usage = new Array(current.length).fill(0)
            this.changed("usage")
            return
        }

        if (this.#previous.length != current.length) {
            throw new Error(`different number of CPU cores: ${this.#previous.length} -> ${current.length}`)
        }

        this.#usage = current.map((cpu, i) => cpu.loadComparingTo(this.#previous[i]))
        this.changed("usage")
    }

    async #parse() {
        const stdout = await Utils.readFileAsync("/proc/stat")
        return stdout
            .split("\n")
            .filter(line => line.match(/^cpu\d/))
            .map(line => CpuInfo.parse(line))
    }
}

class CpuInfo {
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
        return new CpuInfo(id, idle, total)
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

export default new CPU()
