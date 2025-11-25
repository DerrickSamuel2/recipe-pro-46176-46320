#!/bin/bash
cd /home/kavia/workspace/code-generation/recipe-pro-46176-46320/WebFrontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

