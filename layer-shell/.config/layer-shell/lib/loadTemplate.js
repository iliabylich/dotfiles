import GLib from "gi://GLib?version=2.0";
import Gtk from "gi://Gtk?version=4.0";

const HOME = GLib.getenv("HOME");
const WIDGETS_DIR = `${HOME}/.config/layer-shell/widgets`;

export default function loadTemplate(template, widgetNames) {
    const uiFile = `${WIDGETS_DIR}/${template}.ui`;
    const builder = Gtk.Builder.new_from_file(uiFile);
    const widgets = [];

    for (const name of widgetNames) {
        const widget = builder.get_object(name);
        if (!widget) {
            throw new Error(`[loadTemplate] template ${template}.ui doesn't have widget ${name}`);
        }
        widgets.push(widget);
    }

    return widgets;
}
