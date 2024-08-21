import Gtk from "gi://Gtk?version=4.0";
import Gdk from "gi://Gdk?version=4.0";
import GLib from "gi://GLib?version=2.0";

const HOME = GLib.getenv("HOME");

export default function load_css() {
    const provider = new Gtk.CssProvider();

    provider.connect("parsing-error", (self, section, error) => {
        console.error("Failed to parse CSS:", section.to_string(), error.message);
    });

    const path = `${HOME}/.config/layer-shell/css/style.css`;
    provider.load_from_path(path);

    Gtk.StyleContext.add_provider_for_display(
        Gdk.Display.get_default(),
        provider,
        Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION
    );
}
