if [[ $(tty) =~ /dev/tty[1-6] ]]; then
    for tty in /dev/tty{1..6}; do
        setfont -C "$tty" /usr/share/consolefonts/Lat2-Terminus32x16.psf.gz 2> /dev/null
    done
fi

if [ -z "$DISPLAY" ] && [ "$XDG_VTNR" = 1 ]; then
    exec Hyprland
fi

if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
