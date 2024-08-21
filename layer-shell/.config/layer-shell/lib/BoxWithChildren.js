import GObject from 'gi://GObject?version=2.0';
import Gtk from "gi://Gtk?version=4.0";

const BoxWithChildren = GObject.registerClass({
    GTypeName: 'BoxWithChildren'
}, class extends Gtk.Box {
    constructor({ children, ...options }) {
        super(options);

        for (const child of children) {
            this.append(child)
        }
    }
});

export default BoxWithChildren;
