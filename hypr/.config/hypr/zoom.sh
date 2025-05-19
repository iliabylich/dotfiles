#!/usr/bin/env bash

case "$1" in
    "in")
        echo "Zooming in..."
        current="$(hyprctl getoption cursor:zoom_factor | grep float | awk '{print $2}')"
        echo "Current zoom: $current"
        new="$(echo "$current" | awk '{print $1 + 0.1}')"
        echo "New zoom: $new"
        hyprctl keyword cursor:zoom_factor "$new"
        ;;

    "reset")
        echo "Resetting zoom..."
        hyprctl keyword cursor:zoom_factor 1.0
        ;;

    *)
        echo "Usage: zoom.sh [in|reset]"
        ;;
esac
