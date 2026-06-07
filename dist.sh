#!/usr/bin/env bash

set -e
DIR=$(realpath $0) && DIR=${DIR%/*}
cd $DIR
set -x

./dist.js
cd woff2
npm publish --access=public --registry=https://registry.npmjs.org
cp -f package.json ../
