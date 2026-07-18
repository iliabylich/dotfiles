#!/usr/bin/env sh

printf s | socat - UNIX-CONNECT:/run/user/1000/layer-shell.sock
