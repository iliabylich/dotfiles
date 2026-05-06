#!/usr/bin/env bash

set -euo pipefail

backgrounds_dir=~/.local/share/backgrounds
filename="$(ls $backgrounds_dir | grep -v current | shuf -n 1)"
filepath="$backgrounds_dir/$filename"

echo "Choosing $filepath"

rm -f ~/.local/share/backgrounds/current.jpeg
ln -s $filepath ~/.local/share/backgrounds/current.jpeg

systemctl --user restart swaybg
