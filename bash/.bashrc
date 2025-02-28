# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

HISTSIZE=1000
HISTFILESIZE=2000

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

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

. "$HOME/.cargo/env"

eval "$(starship init bash)"

export PATH="$HOME/.local/bin:$PATH"
export PATH="$PATH:/usr/sbin"
