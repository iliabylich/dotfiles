/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

class Memory extends Service {
    static {
        Service.register(
            this,
            {},
            {
                "total": ["float", "r"],
                "used": ["float", "r"]
            }
        )
    }

    #total = 0
    #used = 0

    constructor() {
        super()

        this.#reload()
        setInterval(() => this.#reload(), 1000)
    }

    get total() {
        return this.#total
    }

    get used() {
        return this.#used
    }

    async #reload() {
        const stdout = await Utils.execAsync("free -m")
        const line = stdout.split("\n")[1]
        const parts = line.split(/\s+/)
        this.#total = parts[1] / 1024
        this.#used = parts[2] / 1024
        this.changed("total")
        this.changed("used")
    }
}

export default new Memory()
