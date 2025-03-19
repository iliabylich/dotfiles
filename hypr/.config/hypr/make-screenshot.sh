#!/usr/bin/env bash

grim -g "$(slurp)" -t ppm - | satty --filename - --fullscreen --output-filename ~/satty-$(date '+%Y%m%d-%H:%M:%S').png
