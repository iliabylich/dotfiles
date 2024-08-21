import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import GLib from "gi://GLib?version=2.0";

const Clock = GObject.registerClass({
    GTypeName: 'Clock'
}, class extends Gtk.CenterBox {
    #format = ""
    #tooltipFormat = ""

    constructor({ format, tooltipFormat }) {
        super({
            center_widget: new Gtk.Label({
                label: "",
                tooltip_text: ""
            }),
            css_classes: ["clock", "widget", "padded"]
        })

        this.#format = format;
        this.#tooltipFormat = tooltipFormat;

        this.#refresh()
        setInterval(() => this.#refresh(), 1000);
    }

    #refresh() {
        const time = GLib.DateTime.new_now_local()
        this.center_widget.label = this.#formatLabel(time);
        this.center_widget.tooltip_text = this.#formatTooltipText(time);
    }

    #formatLabel(time) {
        return time.format(this.#format)
    }
    #formatTooltipText(time) {
        return time.format(this.#tooltipFormat)
    }
});

export default Clock;
