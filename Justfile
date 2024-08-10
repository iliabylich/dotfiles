default:
    @just --list

link-all:
    @just link bash
    @just link bash
    @just link hypr
    @just link waybar
    @just link code
    @just link wallpapers
    @just link wofi
    @just link wlogout
    @just link dunst

link MOD:
    stow -d . -t ~ {{MOD}}

render-templates:
    ./templates.sh

reload-waybar:
    @just render-templates
    killall -SIGUSR2 waybar

notify-send text:
    @just render-templates
    systemctl --user restart dunst
    notify-send "{{text}}-1"
    notify-send "{{text}}-2"
