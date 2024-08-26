import Gtk from "gi://Gtk?version=4.0";
import Vte from "gi://Vte?version=3.91";
import GLib from "gi://GLib?version=2.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import { toggleWindow } from "../lib/toggleWindow.js";
import keybindings from "../lib/keybindings.js";
import LayerWindow from '../lib/LayerWindow.js';

export default function Terminal({ application }) {
    const terminal = new Vte.Terminal();
    terminal.spawn_async(
        Vte.PtyFlags.DEFAULT,
        GLib.getenv("HOME"),
        ["htop"],
        [],
        GLib.SpawnFlags.DEFAULT,
        (..._args) => {
            // finished
        },
        -1,
        null,
        (..._args) => {
            // started
        },
    )

    const window = new Gtk.Window({
        css_classes: ["widget-terminal"],
        application,
        child: terminal,
        width_request: 1000,
        height_request: 700
    });
    LayerWindow(window, {
        namespace: "Terminal",
        layer: LayerShell.Layer.OVERLAY,
        anchors: [
            LayerShell.Edge.TOP,
            LayerShell.Edge.RIGHT,
        ],
        margins: {
            [LayerShell.Edge.TOP]: 50,
            [LayerShell.Edge.RIGHT]: 600
        },
        keyboard_mode: LayerShell.KeyboardMode.EXCLUSIVE,
    });

    keybindings(
        window,
        { "Escape": () => toggleWindow("Terminal") },
        (_key) => { }
    );

    return { window, reset: () => { } }
}
