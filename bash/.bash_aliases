shopt -s autocd

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

alias code="code --ozone-platform-hint=wayland"
alias cat="batcat"
alias ls="ls --color"

eval "$(starship init bash)"

export PATH="$HOME/.local/bin:$PATH"
