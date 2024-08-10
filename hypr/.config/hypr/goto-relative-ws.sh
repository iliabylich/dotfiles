#!/usr/bin/env bash

set -eu

ACTIVE_ID=$(hyprctl activeworkspace -j | jq -r ".id")

IDS=$(hyprctl workspaces -j | jq -r "[.[] | .id] | sort")
FIRST_ID=$(echo $IDS | jq ".[0]")
LAST_ID=$(echo $IDS | jq ". | reverse | .[0]")

function clamp() {
    local VAL="$1"
    local LOW="$2"
    local HIGH="$3"

    echo "$VAL" | awk "\$0<$LOW{\$0=$LOW}\$0>$HIGH{\$0=$HIGH}1"
}

case "$1" in
    "left")
        NEXT_ID=$((ACTIVE_ID - 1))
        ;;

    "right")
        NEXT_ID=$((ACTIVE_ID + 1))
        ;;

    *)
        echo "Usage: gotoworkspace.sh [left|right]"
        ;;
esac

NEXT_ID=$(clamp $NEXT_ID $FIRST_ID $LAST_ID)

hyprctl dispatch workspace $NEXT_ID
