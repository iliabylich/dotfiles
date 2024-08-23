import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import LayerShell from "gi://Gtk4LayerShell?version=1.0";

import LayerWindow from '../lib/LayerWindow.js';
import BoxWithChildren from '../lib/BoxWithChildren.js';
import PowerButton from '../widgets/PowerButton.js';
import Clock from '../widgets/Clock.js';
import WiFi from '../widgets/WiFi.js';
import RAM from '../widgets/RAM.js';
import CPU from '../widgets/CPU.js';
import Sound from '../widgets/Sound.js';
import Language from '../widgets/Language.js';
import Workspaces from '../widgets/Workspaces.js';

const TopBar = GObject.registerClass({
    GTypeName: 'TopBar'
}, class extends LayerWindow {
    constructor(options) {
        super({
            namespace: "TopBar",
            layer: LayerShell.Layer.OVERLAY,
            anchors: [
                LayerShell.Edge.TOP,
                LayerShell.Edge.LEFT,
                LayerShell.Edge.RIGHT
            ],
            margins: {
                [LayerShell.Edge.TOP]: 0,
            },
            css_classes: ["bar"],
            child: new Gtk.CenterBox({
                css_classes: ["main-wrapper"],
                start_widget: new BoxWithChildren({
                    spacing: 8,
                    children: [
                        new Workspaces({ minWorkspaces: 5 }).widget
                    ]
                }),
                end_widget: new BoxWithChildren({
                    spacing: 4,
                    children: [
                        new Language(),
                        new Sound().widget,
                        new CPU(),
                        new RAM().widget,
                        new WiFi().widget,
                        new Clock({
                            format: "%H:%M:%S",
                            tooltipFormat: "%Y %B %e\n%A"
                        }),
                        new PowerButton()
                    ]
                })
            }),
            ...options,
        })
    }

    prepareForShowing() { }
});

export default TopBar;
