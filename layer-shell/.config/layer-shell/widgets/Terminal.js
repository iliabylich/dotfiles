import loadWidgets from '../lib/loadWidgets.js';
import { toggleWindow } from '../lib/toggleWindow.js';

export default function Terminal() {
    const [widget] = loadWidgets("Terminal");

    widget.connect("clicked", () => {
        toggleWindow("Terminal");
    })
}
