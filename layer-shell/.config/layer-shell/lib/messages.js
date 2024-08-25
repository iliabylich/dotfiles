import GLib from "gi://GLib?version=2.0";
import Gio from "gi://Gio?version=2.0";

import { toggleWindow } from "./toggleWindow.js";

const HOME = GLib.getenv("HOME");
const messagesPath = `${HOME}/.config/layer-shell/.messages`;

const stream = new Gio.DataInputStream({
    base_stream: Gio.file_new_for_path(messagesPath).read(null)
});
const decoder = new TextDecoder();

function readAndProcessOneMessage(app) {
    stream.read_line_async(0, null, (_s, result) => {
        const [bytes] = stream.read_line_finish(result);
        const line = decoder.decode(bytes).trimEnd();

        try {
            const message = JSON.parse(line);
            switch (message.type) {
                case "stop": {
                    app.quit();
                    break;
                }
                case "toggleWindow": {
                    toggleWindow(message.name);
                    break;
                }
                default: {
                    console.error(`Unsupported message ${line}`);
                }
            }
        } catch (e) {
            console.error("[Messaging] error", e)
        }
    });
}

function addSignal(app) {
    GLib.unix_signal_add(1, 10 /* SIGUSR1 */, () => {
        readAndProcessOneMessage(app);
        addSignal(app);
    })
}

export default function initMessaging(app) {
    addSignal(app);
}
