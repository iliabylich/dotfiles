import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";
import ClockModel from '../models/Clock.js';

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

        new ClockModel({
            onChange: (time) => this.#render(time)
        });
    }

    #render(time) {
        this.center_widget.label = time.format(this.#format);
        this.center_widget.tooltip_text = time.format(this.#tooltipFormat);
    }
});

export default Clock;
