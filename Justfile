default:
    @just --list

link-all:
    @just link bash
    @just link hypr
    @just link code
    @just link wallpapers
    @just link wofi
    @just link dunst
    @just link ags

link MOD:
    stow -d . -t ~ {{MOD}}

render-templates:
    ./templates.sh

notify-send text:
    @just render-templates
    systemctl --user restart dunst
    notify-send "{{text}}-1"
    notify-send "{{text}}-2"
