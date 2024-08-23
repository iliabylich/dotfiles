import ClockModel from '../models/Clock.js';
import loadWidgets from '../lib/loadWidgets.js';

export default class Clock {
    #format = ""
    #tooltipFormat = ""
    #widget = null;
    #label = null;

    constructor({ format, tooltipFormat }) {
        this.#format = format;
        this.#tooltipFormat = tooltipFormat;

        const [widget, label] = loadWidgets("Clock", "ClockLabel");
        this.#widget = widget;
        this.#label = label;

        new ClockModel({
            onChange: (time) => this.#render(time)
        });
    }

    get widget() {
        return this.#widget;
    }

    #render(time) {
        this.#label.label = time.format(this.#format);
        this.#label.tooltip_text = time.format(this.#tooltipFormat);
    }
}
