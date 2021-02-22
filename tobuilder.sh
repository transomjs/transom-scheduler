#!/bin/bash


mkdir ../builder/node_modules/transom-scheduler

cp package.json ../builder/node_modules/transom-scheduler/
cp -r dist/ ../builder/node_modules/transom-scheduler/

echo "done cp to builder app ..."
