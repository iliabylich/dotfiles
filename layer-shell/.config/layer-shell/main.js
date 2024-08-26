import Gtk from "gi://Gtk?version=4.0";

import TopBar from "./windows/TopBar.js";
import LogoutScreen from "./windows/LogoutScreen.js";
import Launcher from "./windows/Launcher.js";
import Networks from "./windows/Networks.js";
import Terminal from "./windows/Terminal.js";
import { registerWindow } from './lib/toggleWindow.js';
import load_css from "./css/load.js";
import initMessaging from "./lib/messages.js";

const application = new Gtk.Application({ "application-id": "com.me.layershell" });
initMessaging(application);

application.connect("activate", () => {
    registerWindow("TopBar", TopBar({ application }));
    registerWindow("LogoutScreen", LogoutScreen({ application }));
    registerWindow("Launcher", Launcher({ application }));
    registerWindow("Networks", Networks({ application }));
    registerWindow("Terminal", Terminal({ application }));
});
application.connect("startup", () => {
    load_css()
});

application.run([])
