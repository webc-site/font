#!/usr/bin/env bash

set -e
DIR=$(realpath $0) && DIR=${DIR%/*}
cd $DIR
set -x

if [ ! -d "gen" ]; then
  REPO_URL=$(git remote get-url origin)
  GEN_URL="${REPO_URL%.git}.gen.git"
  git clone --depth=1 "$GEN_URL" gen
  cd gen
  git lfs pull
fi

mkdir -p otf
cd otf
OTF=latinmodern-math.otf
if [ ! -f "$OTF" ]; then
  wget -c https://github.com/valxyz/fonts-lm-math/raw/refs/heads/main/fonts/$OTF
fi
