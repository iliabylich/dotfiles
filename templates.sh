#!/usr/bin/env bash

set -eu

export ACCENT_COLOR="90A959"
export ACCENT_DARK_COLOR="526035"
export TEXT_COLOR="D0D0D0"
export BG_COLOR="151515"
export SOLID_BG_COLOR="rgba(162, 162, 162, 0.4)"
export SOLID_BG_COLOR_HOVER="rgba(100, 100, 100, 0.4)"

export ALL_COLORS='$ACCENT_COLOR $ACCENT_DARK_COLOR $TEXT_COLOR $BG_COLOR $SOLID_BG_COLOR $SOLID_BG_COLOR_HOVER'

render() {
    local source="$1"
    local target="$2"

    echo "$source -> $target"
    envsubst "$ALL_COLORS" < "$source" > "$target"
}

render templates/.theme.css.template css-theme/.theme.css
render templates/colors.conf.template hypr/.config/hypr/colors.conf

hyprctl reload
