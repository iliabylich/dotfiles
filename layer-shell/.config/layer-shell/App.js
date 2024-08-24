import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";

import TopBar from "./windows/TopBar.js";
import LogoutScreen from "./windows/LogoutScreen.js";
import Launcher from "./windows/Launcher.js";
import Networks from "./windows/Networks.js";

const App = GObject.registerClass({
    GTypeName: 'App'
}, class extends Gtk.Application {
    topBar = null;
    logoutScreen = null;

    constructor(options) {
        super(options);

        globalThis.app = this;
    }

    toggleWindowByNamespace(namespace) {
        const w = this.get_windows().find(w => w.namespace === namespace);
        if (!w) {
            const message = `Can't find window with namespace ${namespace}`
            console.error(message);
            throw new Error(message);
        }
        if (!w.get_visible()) {
            w.prepareForShowing();
        }
        w.set_visible(!w.get_visible());
    }

    vfunc_activate() {
        this.topBar = new TopBar({ application: this }).window;
        this.topBar.present()

        this.logoutScreen = new LogoutScreen({ application: this });
        // this.logoutScreen.present()

        this.launcher = new Launcher({ application: this });
        // this.launcher.present();

        this.networks = new Networks({ application: this });
        // this.networks.present();
    }
});

export default App;
