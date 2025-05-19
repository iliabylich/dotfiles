#!/usr/bin/env sh

set -eu

if pgrep -x fuzzel > /dev/null; then
    pkill fuzzel
else
    fuzzel
fi
