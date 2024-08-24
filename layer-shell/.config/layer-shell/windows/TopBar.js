import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

// import LayerWindow from '../lib/LayerWindow.js';
import BoxWithChildren from '../lib/BoxWithChildren.js';
import loadWidgets from '../lib/loadWidgets.js';
import PowerButton from '../widgets/PowerButton.js';
import Clock from '../widgets/Clock.js';
import WiFi from '../widgets/WiFi.js';
import RAM from '../widgets/RAM.js';
import CPU from '../widgets/CPU.js';
import Sound from '../widgets/Sound.js';
import Language from '../widgets/Language.js';
import Workspaces from '../widgets/Workspaces.js';

function LayerWindow(window, {
    layer = LayerShell.Layer.OVERLAY,
    auto_exclusive_zone_enabled = false,
    anchors = [],
    margins = {},
    child = null,
    namespace = null,
    keyboard_mode = null
}) {
    LayerShell.init_for_window(window);
    LayerShell.set_layer(window, layer);
    if (auto_exclusive_zone_enabled) {
        LayerShell.auto_exclusive_zone_enable(window);
    }
    for (const anchor of anchors) {
        LayerShell.set_anchor(window, anchor, true);
    }
    for (const key in margins) {
        LayerShell.set_margin(window, key, margins[key]);
    }
    if (child) {
        window.child = child;
    }
    if (namespace) {
        LayerShell.set_namespace(window, namespace);
    }
    if (keyboard_mode) {
        LayerShell.set_keyboard_mode(window, keyboard_mode);
    }
}

export default class TopBar {
    #window = null;

    constructor({ application }) {
        const [window] = loadWidgets("TopBar");
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
        window.set_application(application);

        Workspaces({ minWorkspaces: 5 });
        Language();
        Sound();
        CPU();
        RAM();
        WiFi();
        Clock({
            format: "%H:%M:%S",
            tooltipFormat: "%Y %B %e\n%A"
        });
        PowerButton();

        this.#window = window;

    }

    get window() {
        return this.#window;
    }

    prepareForShowing() { }
}
