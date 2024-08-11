/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

const hyprland = await Service.import("hyprland")

class Language extends Service {
    static {
        Service.register(
            this,
            {},
            {
                "layout": ["string", "r"],
            }
        )
    }

    #layout = ""

    constructor() {
        super()


        const devices = JSON.parse(Utils.exec("hyprctl devices -j"))
        this.#layout = devices.keyboards.find(kb => kb.main).active_keymap

        hyprland.connect("keyboard-layout", (_h, _name, layout) => {
            this.#layout = layout
            this.changed("layout")
        })
    }

    get layout() {
        return this.#layout
    }
}

export default new Language()
