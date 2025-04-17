#!/usr/bin/env bash

set -eux

sudo apt install ruby libyaml-dev

today=$(date +%d-%m-%Y)

mkdir -p "$HOME/experiments"
cd "$HOME/experiments"

rm -rf "ruby-$today"
git clone --depth=1 git@github.com:ruby/ruby.git "ruby-$today"
cd "ruby-$today"
./autogen.sh
./configure --prefix="$PWD/local"
make -j`nproc`
make install
echo "export PATH=\"\$HOME/experiments/ruby-$today/local/bin:\$PATH\""
