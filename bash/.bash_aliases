if command -v lsd &> /dev/null; then
    alias ls="lsd"
fi
alias ll="ls -l"
alias la="ls -la"

alias gc="git commit"
alias gb="git branch"
alias gco="git checkout"
alias glog="git log --oneline"
alias ga="git add"
alias gst="git status"
alias gd="git diff"
alias branch="git rev-parse --abbrev-ref HEAD"

if command -v code &> /dev/null; then
    alias code="code --ozone-platform-hint=wayland"
fi
if command -v batcat &> /dev/null; then
    alias cat="batcat"
fi

alias ...="../.."

alias tree="tree --dirsfirst -C"

repeat() {
  for ((i=0; i<$1; i++)); do
    eval ${*:2}
  done
}

notify-once-done() {
    eval "${*:1}"
    notify-send --urgency critical --wait "Command finished" "${*:1}"
}

foreach-rust-dir() {
    for cargo_toml_path in $(find $1 -maxdepth 2 -name Cargo.toml); do
        local dir="$(dirname "$cargo_toml_path")"
        echo "Entering $dir:"
        pushd "$dir"
        eval "$2"
        popd
    done
}

cargo-update-all() {
    foreach-rust-dir "$1" "cargo update --verbose && cargo outdated && cargo check"
}

cargo-clean-all() {
    foreach-rust-dir "$1" "cargo clean"
}

df() {
    /bin/df ${*:1} | grep -vE "tmpfs|udev|efivars"
}
