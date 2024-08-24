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
        const window = this.#windows[name];
        if (!window) {
            const message = `There is no window ${name}`;
            console.error(message);
            throw new Error(message);
        }
        if (!window.get_visible()) {
            window.prepareForShowing();
        }
        window.set_visible(!window.get_visible());
    }

    vfunc_activate() {
        this.#windows = {
            TopBar: new TopBar({ application: this }),
            LogoutScreen: new LogoutScreen({ application: this }),
            Launcher: new Launcher({ application: this }),
            Networks: new Networks({ application: this })
        };
    }
});

export default App;
