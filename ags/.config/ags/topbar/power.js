/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

export default function Power() {
    return Widget.Button({
        on_clicked: () => console.log("clicked"),
        child: Widget.Label("      "),
        cursor: "pointer",
        class_name: "power widget padded clickable"
    })
}
