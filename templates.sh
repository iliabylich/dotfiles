#!/usr/bin/env bash

set -eu

export ACCENT_COLOR="90A959"
export ACCENT_DARK_COLOR="526035"
export TEXT_COLOR="D0D0D0"
export BG_COLOR="151515"

for SOURCE in $(find . -name "*.template"); do
    TARGET="${SOURCE%.template}"
    echo "$SOURCE -> $TARGET"

    envsubst '$ACCENT_COLOR $ACCENT_DARK_COLOR $TEXT_COLOR $BG_COLOR' < "$SOURCE" > "$TARGET"
done
