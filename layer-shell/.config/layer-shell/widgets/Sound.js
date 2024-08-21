import GObject from "gi://GObject?version=2.0";
import Gtk from "gi://Gtk?version=4.0";
import Gvc from 'gi://Gvc?version=1.0';

const Sound = GObject.registerClass({
    GTypeName: 'Sound'
}, class extends Gtk.Box {
    #icon = null;
    #scale = null;

    #control = null;

    #io = {};

    constructor() {
        super({
            css_classes: ["widget", "sound", "padded"],
            spacing: 10,
            orientation: Gtk.Orientation.HORIZONTAL,
        });

        this.#icon = new Gtk.Image({
            icon_name: "dialog-question",
        });
        this.#scale = new Gtk.Scale({
            css_classes: ["sound-slider"],
            adjustment: new Gtk.Adjustment({
                lower: 0,
                upper: 1
            })
        });
        this.#scale.connect("change-value", () => {
            const value = Math.min(this.#scale.adjustment.value, 1);
            const max = this.#control.get_vol_max_norm();
            if (this.#io.output) {
                this.#io.output.stream.set_volume(value * max);
                this.#io.output.stream.push_volume();
            }
        })
        this.append(this.#icon);
        this.append(this.#scale);

        this.#control = new Gvc.MixerControl({ name: 'layer-shell-mixer-control' });

        this.#control.connect("default-sink-changed", (_control, id) => {
            this.#defaultIOChanged("output", id);
        })
        this.#control.connect("default-source-changed", (_control, id) => {
            this.#defaultIOChanged("input", id);
        })

        this.#control.open();
    }

    #defaultIOChanged(ioType, id) {
        if (this.#io[ioType]) {
            this.#io[ioType].stream.disconnect(this.#io[ioType].subId)
            this.#io[ioType] = null;
        }

        const stream = this.#control.lookup_stream_id(id);
        if (!stream) {
            return null;
        }
        const subId = stream.connect("notify::volume", () => {
            this.#repaint()
        });
        this.#io[ioType] = { stream, subId }
        this.#repaint()
    }

    #volumeOf(ioType) {
        if (!this.#control || !this.#io[ioType] || !this.#io[ioType].stream) {
            return 0;
        }
        const max = this.#control.get_vol_max_norm();
        return this.#io[ioType].stream.volume / max;
    }

    get #outputIconName() {
        const vol = this.#volumeOf("output");
        if (vol === 0) {
            return `audio-volume-muted-symbolic`;
        } else if (vol >= 0.01 && vol < 0.34) {
            return `audio-volume-low-symbolic`;
        } else if (vol >= 0.34 && vol < 0.67) {
            return `audio-volume-medium-symbolic`;
        } else if (vol >= 0.67 && vol < 1) {
            return `audio-volume-high-symbolic`;
        } else {
            return `audio-volume-overamplified-symbolic`;
        }
    }

    #repaint() {
        this.#scale.set_value(this.#volumeOf("output"))
        this.#icon.icon_name = this.#outputIconName
    }
});

export default Sound;
