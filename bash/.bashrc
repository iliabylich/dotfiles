# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

HISTCONTROL=erasedups:ignoredups:ignorespace
HISTSIZE=500000
HISTFILESIZE=100000

shopt -s histappend
shopt -s checkwinsize
shopt -s globstar
shopt -s autocd
shopt -s cmdhist
shopt -s dirspell
shopt -s cdspell
bind "set completion-ignore-case on"
bind "set completion-map-case on"
bind "set show-all-if-ambiguous on"

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
if [ -f ~/.bash_host_specific ]; then
    . ~/.bash_host_specific
fi

if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
fi

if [ -d ~/.cargo ]; then
    . ~/.cargo/env
fi

if [ -d ~/.nvm ]; then
    . ~/.nvm/nvm.sh
    . ~/.nvm/bash_completion
fi

if command -v starship &> /dev/null; then
    eval "$(starship init bash)"
fi

if command -v fzf &> /dev/null; then
    export FZF_DEFAULT_COMMAND="rg --files"
    export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
    export FZF_ALT_C_COMMAND=""

    eval "$(fzf --bash)"
fi

export PATH="$HOME/.local/bin:$PATH"
export PATH="$PATH:/usr/sbin"
export PATH="$PATH:/usr/local/go/bin"
