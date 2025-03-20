#!/usr/bin/env bash

set -eu

backgrounds_dir=~/.local/share/backgrounds
filename="$(ls $backgrounds_dir | grep unsplash | shuf -n 1)"
filepath="$backgrounds_dir/$filename"

echo "Choosing $filepath"

rm -f ~/.local/share/backgrounds/current.jpeg
ln -s $filepath ~/.local/share/backgrounds/current.jpeg

matugen --show-colors --type scheme-neutral --mode dark image ~/.local/share/backgrounds/current.jpeg
