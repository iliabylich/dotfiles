import loadWidgets from '../lib/loadWidgets.js';

export default function PowerButton() {
    const [widget] = loadWidgets("PowerButton");

    widget.connect("clicked", () => {
        globalThis.app.toggleWindowByNamespace("LogoutScreen");
    })
}
