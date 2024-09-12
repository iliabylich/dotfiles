default:
    @just --list

link-all:
    @just _link bash
    @just _link hypr
    @just link-code
    @just _link wallpapers
    @just _link wofi
    @just _link dunst
    @just _link layer-shell

_link MOD:
    stow -d . -t ~ {{MOD}}

link-code:
    mkdir -p ~/.config/Code/User
    @just _link code

render-templates:
    ./templates.sh

notify-send text:
    @just render-templates
    systemctl --user restart dunst
    notify-send "{{text}}-1"
    notify-send "{{text}}-2"

install-chrome:
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O google-chrome.deb
    sudo apt install -y ./google-chrome.deb
    rm -f google-chrome.deb

install-vscode:
    wget "https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64" -O vscode.deb
    sudo apt install -y ./vscode.deb
    rm -f vscode.deb

install-1pasword:
    wget https://downloads.1password.com/linux/debian/amd64/stable/1password-latest.deb
    sudo apt install -y ./1password-latest.deb
    rm -f 1password-latest.deb

install-docker:
    sudo apt remove docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc || true
    sudo apt install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc
    echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian bookworm stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo docker ps

generate-ssh-key:
    git config --global user.email "ibylich@gmail.com"
    git config --global user.name "Ilya Bylich"
    ssh-keygen -t ed25519 -C "ibylich@gmail.com"
    /bin/cat ~/.ssh/id_ed25519.pub
