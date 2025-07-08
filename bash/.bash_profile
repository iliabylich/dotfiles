if [[ $(tty) =~ /dev/tty[1-6] ]]; then
    for tty in /dev/tty{1..6}; do
        setfont -C "$tty" /usr/share/consolefonts/Lat2-Terminus32x16.psf.gz 2> /dev/null
    done
fi

if [[ $(tty) == /dev/tty1 ]] && uwsm check may-start; then
    exec uwsm start hyprland-uwsm.desktop
fi

if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
