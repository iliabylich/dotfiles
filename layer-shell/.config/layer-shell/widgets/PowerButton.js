import loadWidgets from '../lib/loadWidgets.js';
import { toggleWindow } from '../lib/toggleWindow.js';

export default function PowerButton() {
    const [widget] = loadWidgets("PowerButton");

    widget.connect("clicked", () => {
        toggleWindow("LogoutScreen");
    })
}
