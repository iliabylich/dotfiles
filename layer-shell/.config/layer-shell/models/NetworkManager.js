import NM from "gi://NM?version=1.0";

const nm = new NM.Client();
nm.init(null);

export class WiFiStatus {
    #onChange = null;

    constructor({ onChange }) {
        this.#onChange = onChange;

        this.#refresh();
        setInterval(() => this.#refresh(), 1000);
    }

    #refresh() {
        this.#onChange(this.#status);
    }

    get #status() {
        const wifi = nm.
            get_all_devices().
            find(d => d.get_device_type() === NM.DeviceType.WIFI);
        if (!wifi) {
            return null;
        }

        const accessPoint = wifi.get_active_access_point();
        if (!accessPoint) {
            return {};
        }

        const rawSSID = accessPoint.ssid.get_data() || new Uint8Array();
        const ssid = NM.utils_ssid_to_utf8(rawSSID);

        return { ssid, strength: accessPoint.strength };
    }
}

export function allNetworks() {
    const interfaces = [];
    for (const device of nm.get_all_devices()) {
        const iface = device.get_iface();
        const ipv4Config = device.get_ip4_config();
        if (iface && ipv4Config) {
            const ips = ipv4Config.get_addresses().map(a => a.get_address());
            if (ips.length > 0) {
                interfaces.push({ name: iface, ip: ips[0] });
            }
        }
    }
    return interfaces;
}
