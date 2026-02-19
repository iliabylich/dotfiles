#!/usr/bin/env bash

set -euo pipefail

rm -f ~/.local/share/backgrounds/*

get_all_collections() {
    curl --silent https://wallpapercat.com/category/nature |
        htmlq "#collections_segment" |
        htmlq --attribute href a |
        shuf -n 10
}
mapfile -t collections < <(get_all_collections)

get_images_in_collection() {
    curl --silent "$1" |
        htmlq --attribute data-fullimg div |
        grep 3840x2160 |
        sed 's|^|https://wallpapercat.com|' |
        shuf -n 2
}

urls=()
for collection in "${collections[@]}"; do
    echo "Selecting collection $collection"
    mapfile -t sub < <(get_images_in_collection "$collection")
    urls+=("${sub[@]}")
done

printf '%s\n' "${urls[@]}" | xargs -P 5 -I {} wget -q -P ~/.local/share/backgrounds {}
