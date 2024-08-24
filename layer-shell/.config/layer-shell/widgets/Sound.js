import OutputSound from "../models/OutputSound.js";
import loadWidgets from "../lib/loadWidgets.js";

export default function Sound() {
    const [icon, scale] = loadWidgets("SoundImage", "SoundScale");

    const output = new OutputSound({
        onChange: (volume) => {
            scale.set_value(volume)
            if (volume === 0) {
                icon.icon_name = `audio-volume-muted-symbolic`;
            } else if (volume >= 0.01 && volume < 0.34) {
                icon.icon_name = `audio-volume-low-symbolic`;
            } else if (volume >= 0.34 && volume < 0.67) {
                icon.icon_name = `audio-volume-medium-symbolic`;
            } else if (volume >= 0.67 && volume < 1) {
                icon.icon_name = `audio-volume-high-symbolic`;
            } else {
                icon.icon_name = `audio-volume-overamplified-symbolic`;
            }
        }
    })

    scale.connect("change-value", () => {
        output.volume = Math.min(scale.adjustment.value, 1);
    })
}
