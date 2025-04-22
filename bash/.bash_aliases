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
