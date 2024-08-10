#!/usr/bin/env bash

APPLET=waybar-network-applet

if $(pidof $APPLET > /dev/null)
then
    killall -QUIT $APPLET
else
    $APPLET --width 500 --offset-right 120
fi
