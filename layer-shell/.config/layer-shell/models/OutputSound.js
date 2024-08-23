const GIRepository = imports.gi.GIRepository;
GIRepository.Repository.prepend_search_path("/usr/lib/gnome-shell");
GIRepository.Repository.prepend_library_path("/usr/lib/gnome-shell");
const Gvc = imports.gi.Gvc;

export default class OutputSound {
    #control = null;

    #outputStream = null;
    #outputSubId = null;

    #onChange = null;

    constructor({ onChange }) {
        this.#onChange = onChange;

        this.#control = new Gvc.MixerControl({ name: 'layer-shell-mixer-control' });

        this.#control.connect("default-sink-changed", (_control, id) => {
            this.#outputChanged(id);
        })

        this.#control.open();
    }

    set volume(value) {
        const max = this.#control.get_vol_max_norm();
        if (this.#outputStream) {
            this.#outputStream.set_volume(value * max);
            this.#outputStream.push_volume();
        }
    }

    #outputChanged(id) {
        if (this.#outputStream) {
            this.#outputStream.disconnect(this.#outputSubId)
            this.#outputStream = null;
            this.#outputSubId = null;
        }

        const stream = this.#control.lookup_stream_id(id);
        if (!stream) {
            return null;
        }
        const subId = stream.connect("notify::volume", () => {
            this.#changed()
        });
        this.#outputStream = stream;
        this.#outputSubId = subId;
        this.#changed()
    }

    get #currentVolume() {
        if (!this.#control || !this.#outputStream) {
            return 0;
        }
        const max = this.#control.get_vol_max_norm();
        return this.#outputStream.volume / max;
    }

    #changed() {
        this.#onChange(this.#currentVolume);
    }
}
