#!/bin/bash

# Install Node.js version 22
sudo apt-get update &&
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - &&
  sudo apt-get install -y nodejs &&
  sudo npm install -g npm@latest pnpm@latest &&
  sudo corepack disable pnpm
