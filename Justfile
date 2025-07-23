default:
    @just --list

link-all:
    @just _link bash
    @just _link hypr
    @just _link dunst
    @just _link layer-shell
    @just _link ghostty
    @just _link starship
    @just _link git
    @just _link wezterm
    @just _link unsplash-wallpaper
    @just _link matugen
    @just _link systemd
    @just _link satty
    @just _link fuzzel
    @just link-code

_link MOD:
    stow -d . -t ~ {{MOD}}

link-code:
    mkdir -p ~/.config/Code/User
    rm -rf ~/.config/Code/User/settings.json
    @just _link code

install-deb url name:
    wget "{{url}}" -O "{{name}}"
    sudo apt install -y "./{{name}}"
    rm -f "{{name}}"

install-chrome:
    @just install-deb "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb" google-chrome.deb

install-vscode:
    @just install-deb "https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64" vscode.deb

install-1password:
    @just install-deb "https://downloads.1password.com/linux/debian/amd64/stable/1password-latest.deb" 1password-latest.deb

generate-ssh-key:
    git config --global user.email "ibylich@gmail.com"
    git config --global user.name "Ilya Bylich"
    ssh-keygen -t ed25519 -C "ibylich@gmail.com"
    /bin/cat ~/.ssh/id_ed25519.pub

install-rust:
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

binstall:
    cargo binstall -y cargo-binstall || cargo install cargo-binstall
    cargo binstall -y \
        cargo-bloat \
        cargo-deb \
        cargo-expand \
        cargo-llvm-lines \
        cargo-ndk \
        cargo-outdated \
        cargo-udeps \
        cbindgen \
        dbus-codegen \
        mdbook \
        tokio-console \
        zbus_xmlgen

build-ruby-master:
    ./scripts/build-ruby-master.sh

install-xremap:
    sudo rm -f /etc/xremap.yml /usr/lib/systemd/system/xremap.service
    sudo cp $PWD/xremap/xremap.yml /etc/xremap.yml
    sudo cp $PWD/xremap/xremap.service /usr/lib/systemd/system/xremap.service
    sudo systemctl daemon-reload
    sudo systemctl daemon-reexec
    sudo systemctl enable --now xremap
