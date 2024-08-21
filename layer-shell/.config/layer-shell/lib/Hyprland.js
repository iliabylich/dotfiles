import Gio from "gi://Gio?version=2.0";
import GLib from "gi://GLib?version=2.0";

const HYPRLAND_INSTANCE_SIGNATURE = GLib.getenv('HYPRLAND_INSTANCE_SIGNATURE');
const XDG_RUNTIME_DIR = GLib.getenv('XDG_RUNTIME_DIR');

const socketPath = `${XDG_RUNTIME_DIR}/hypr/${HYPRLAND_INSTANCE_SIGNATURE}/.socket2.sock`;
const socket = new Gio.SocketClient().connect(new Gio.UnixSocketAddress({ path: socketPath }), null)

const stream = new Gio.DataInputStream({
    close_base_stream: true,
    base_stream: socket.get_input_stream(),
});

const decoder = new TextDecoder();

const eventHandlers = [];

function readNextLine() {
    stream.read_line_async(0, null, (_s, result) => {
        const [bytes] = stream.read_line_finish(result);
        const line = decoder.decode(bytes)

        const sepIdx = line.indexOf(">>");
        const event = line.slice(0, sepIdx);
        const payload = line.slice(sepIdx + 2);

        for (const handler of eventHandlers) {
            handler(event, payload)
        }

        readNextLine();
    });
}

readNextLine()

function subscribe(handler) {
    eventHandlers.push(handler);
}

export { subscribe }
