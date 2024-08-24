import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";

import TopBar from "./windows/TopBar.js";
import LogoutScreen from "./windows/LogoutScreen.js";
import Launcher from "./windows/Launcher.js";
import Networks from "./windows/Networks.js";

const App = GObject.registerClass({
    GTypeName: 'App'
}, class extends Gtk.Application {
    #windows = {}

    constructor(options) {
        super(options);

        globalThis.app = this;
    }

    toggleWindow(name) {
        if (!this.#windows[name]) {
            const message = `There is no window ${name}`;
            console.error(message);
            throw new Error(message);
        }
        const { window, reset } = this.#windows[name];
        if (!window.get_visible()) {
            reset();
        }
        window.set_visible(!window.get_visible());
    }

    vfunc_activate() {
        this.#windows = {
            TopBar: TopBar({ application: this }),
            LogoutScreen: LogoutScreen({ application: this }),
            Launcher: Launcher({ application: this }),
            Networks: Networks({ application: this })
        };
    }
});

export default App;
