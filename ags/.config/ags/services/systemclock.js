/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

import GLib from "gi://GLib"

class SystemClock extends Service {
    static {
        Service.register(
            this,
            {},
            {
                "time": ["string", "r"]
            }
        )
    }

    #time = GLib.DateTime.new_now_local()

    constructor() {
        super()

        setInterval(() => this.#reload(), 1000)
    }

    get time() {
        return this.#time
    }

    bindWithFormat(fmt) {
        return this.bind("time").as(v => v.format(fmt))
    }

    #reload() {
        this.#time = GLib.DateTime.new_now_local()
        this.changed("time")
    }
}

export default new SystemClock()
