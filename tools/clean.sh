#!/bin/bash

cd ../src/main/react
cd src/main/react

npm cache clean
rm -r -f node_modules

yarn cache clean
yarn clean

rm -r -f public/dist
