import ClockModel from '../models/Clock.js';
import loadWidgets from '../lib/loadWidgets.js';

export default function Clock({ format, tooltipFormat }) {
    const [label] = loadWidgets("ClockLabel");

    new ClockModel({
        onChange: (time) => {
            label.label = time.format(format);
            label.tooltip_text = time.format(tooltipFormat);
        }
    });
}
