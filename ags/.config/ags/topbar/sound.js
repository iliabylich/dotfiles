/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

const audio = await Service.import("audio")

const Icon = () => Widget.Button({
    child: Widget.Icon().hook(audio.speaker, self => {
        const vol = audio.speaker.volume * 100
        const icon = [
            [100, "overamplified"],
            [67, "high"],
            [34, "medium"],
            [1, "low"],
            [0, "muted"],
        ].find(([threshold]) => threshold <= vol)?.[1]

        self.icon = `audio-volume-${icon}-symbolic`
        self.tooltip_text = `Volume ${Math.floor(vol)}%`
    }),
})

function Slider() {
    return Widget.Slider({
        hexpand: true,
        drawValue: false,
        onChange: ({ value }) => audio.speaker.volume = value / 100,
        value: audio.speaker.bind("volume").as(v => v * 100),
        min: 0,
        max: 100,
        vertical: false,
        class_name: "sound-slider"
    })
}

export default function Sound() {
    return Widget.Box({
        class_name: "widget sound padded",
        spacing: 10,
        vertical: false,
        children: [
            Icon(),
            Slider()
        ]
    })
}
