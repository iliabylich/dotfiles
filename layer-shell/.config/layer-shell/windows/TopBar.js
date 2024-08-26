import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import loadWidgets from '../lib/loadWidgets.js';
import PowerButton from '../widgets/PowerButton.js';
import Clock from '../widgets/Clock.js';
import WiFi from '../widgets/WiFi.js';
import RAM from '../widgets/RAM.js';
import CPU from '../widgets/CPU.js';
import Sound from '../widgets/Sound.js';
import Language from '../widgets/Language.js';
import Workspaces from '../widgets/Workspaces.js';
import Terminal from '../widgets/Terminal.js';

export default function TopBar({ application }) {
    const [window] = loadWidgets("TopBar");
    window.set_application(application);
    LayerWindow(window, {
        namespace: "TopBar",
        layer: LayerShell.Layer.OVERLAY,
        anchors: [
            LayerShell.Edge.TOP,
            LayerShell.Edge.LEFT,
            LayerShell.Edge.RIGHT
        ],
        margins: {
            [LayerShell.Edge.TOP]: 0,
        }
    })

    Workspaces({ minWorkspaces: 5 });
    Terminal();
    Language();
    Sound();
    CPU();
    RAM();
    WiFi();
    Clock({ format: "%H:%M:%S", tooltipFormat: "%Y %B %e\n%A" });
    PowerButton();

    window.present();

    return { window, reset: () => { } }
}
