/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

const network = await Service.import("network")

class NetworkList extends Service {
    static {
        Service.register(
            this,
            {},
            {
                "list": ["jsobject", "r"]
            }
        )
    }

    #list = []

    constructor() {
        super()

        this.#reload()
        setInterval(() => this.#reload(), 5000)
    }

    get list() {
        return this.#list
    }

    async #reload() {
        const interfaces = []
        for (const device of network._client.get_all_devices()) {
            const iface = device.get_iface()
            const ipv4Config = device.get_ip4_config()
            if (iface && ipv4Config) {
                const ips = ipv4Config.get_addresses().map(a => a.get_address())
                if (ips.length > 0) {
                    interfaces.push({ name: iface, ip: ips[0] })
                }
            }
        }
        this.#list = interfaces

        this.changed("list")
    }
}

export default new NetworkList()
