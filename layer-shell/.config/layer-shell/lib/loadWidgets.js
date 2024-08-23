import GLib from "gi://GLib?version=2.0";
import Gtk from "gi://Gtk?version=4.0";

const HOME = GLib.getenv("HOME");
const UI_FILE = `${HOME}/.config/layer-shell/widgets/Widgets.ui`;

let builder = null;

function getBuilder() {
    if (!builder) {
        builder = Gtk.Builder.new_from_file(UI_FILE);
    }
    return builder;
}

export default function loadWidgets(...widgetNames) {
    const widgets = [];

    for (const name of widgetNames) {
        const widget = getBuilder().get_object(name);
        if (!widget) {
            throw new Error(`[loadWidgets] widget ${name} isn't defined`);
        }
        widgets.push(widget);
    }

    return widgets;
}
