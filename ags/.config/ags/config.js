/// <reference path="/usr/share/com.github.Aylur.ags/types/ags.d.ts" />

import Topbar from "./topbar/index.js"

import hyperland from "./services/hyperland.js"
hyperland.minWorkspaces = 5

import cpu from "./services/cpu.js"
cpu.refreshIntervalInMs = 1000


App.config({
    style: "./style.css",
    windows: [
        Topbar(),
    ],
})
