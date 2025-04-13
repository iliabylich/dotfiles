# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# ignore duplicates and empty lines in history
HISTCONTROL=erasedups:ignoredups:ignorespace

# append to the history file instead of overwriting it
shopt -s histappend

HISTSIZE=500
HISTFILESIZE=5000

# check the window size after each command and, if necessary, update LINES and COLUMNS.
shopt -s checkwinsize

# expand "**" pattern
shopt -s globstar

shopt -s autocd

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

. "$HOME/.cargo/env"

eval "$(starship init bash)"

export PATH="$HOME/.local/bin:$PATH"
export PATH="$PATH:/usr/sbin"
export PATH="$PATH:/usr/local/go/bin"

repeat() {
  for ((i=0; i<$1; i++)); do
    eval ${*:2}
  done
}

notify-once-done() {
    eval "${*:1}"
    notify-send --urgency critical --wait "Command finished" "${*:1}"
}
