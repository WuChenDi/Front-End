#!/bin/bash
#
# GitHub Multi-Account Setup Script
#
# This script configures multiple GitHub accounts (e.g., personal and work)
# on the same machine. It will:
#   1. Generate SSH keys for each account (skips if already exists).
#   2. Update ~/.ssh/config to separate different GitHub hosts.
#   3. Configure Git with conditional includes to automatically switch
#      username/email based on project directory.
#
# Prerequisites:
#   - Update WD_EMAIL and CD_EMAIL with your personal and work GitHub emails.
#
# Usage:
#   1. Edit this script and set WD_EMAIL and CD_EMAIL.
#   2. Run: bash setup-github-accounts.sh
#   3. Copy the generated public keys and add them to your GitHub accounts:
#        - Personal: https://github.com/settings/keys
#        - Work:     https://github.com/settings/keys
#
# After setup:
#   - Use git@github.com-wudi:username/repo.git for wudi repos.
#   - Use git@github.com-cd996:username/repo.git for cd996 repos.
#
# Git will automatically pick the correct user.name and user.email based
# on the repository path:
#   - /app/work/wudi/ -> wudi account
#   - /app/work/cd996/ -> cd996 account

set -e

WD_EMAIL="wuchendi96@gmail.com"
CD_EMAIL="cdhj996@gmail.com"

generate_key() {
  local KEY_PATH=$1
  local EMAIL=$2

  if [ -f "$KEY_PATH" ]; then
    echo ">>> SSH key already exists: $KEY_PATH (skipped)"
  else
    echo ">>> Generating SSH key: $KEY_PATH"
    ssh-keygen -t ed25519 -C "$EMAIL" -f "$KEY_PATH" -N ""
  fi
}

# Create work directories if they don't exist
echo ">>> Creating work directories..."
mkdir -p /app/work/wudi
mkdir -p /app/work/cd996

generate_key ~/.ssh/id_ed25519_wudi "$WD_EMAIL"
generate_key ~/.ssh/id_ed25519_cd996 "$CD_EMAIL"

echo ">>> Updating ~/.ssh/config..."
if ! grep -q "Host github.com-wudi" ~/.ssh/config 2>/dev/null; then
cat <<'EOF' >> ~/.ssh/config

# Personal GitHub (wudi)
Host github.com-wudi
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_wudi
  IdentitiesOnly yes
EOF
fi

if ! grep -q "Host github.com-cd996" ~/.ssh/config 2>/dev/null; then
cat <<'EOF' >> ~/.ssh/config

# Work GitHub (cd996)
Host github.com-cd996
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_cd996
  IdentitiesOnly yes
EOF
fi

chmod 600 ~/.ssh/config

# Git
echo ">>> Updating ~/.gitconfig..."
cat <<'EOF' > ~/.gitconfig
[user]
    name = DefaultName
    email = default@example.com

[includeIf "gitdir:/app/work/cd996/"]
    path = ~/.gitconfig-cd996

[includeIf "gitdir:/app/work/wudi/"]
    path = ~/.gitconfig-wudi
EOF

cat <<EOF > ~/.gitconfig-wudi
[user]
    name = wudi
    email = $WD_EMAIL
EOF

cat <<EOF > ~/.gitconfig-cd996
[user]
    name = cd996
    email = $CD_EMAIL
EOF

# public keys
echo ""
echo ">>> Done! Now add these SSH keys to GitHub:"
echo ""
echo "Personal (wudi):"
cat ~/.ssh/id_ed25519_wudi.pub
echo ""
echo "Work (cd996):"
cat ~/.ssh/id_ed25519_cd996.pub
echo ""
echo ">>> Directory structure created:"
echo "  /app/work/wudi/  -> wudi account"
echo "  /app/work/cd996/ -> cd996 account"
echo ""
echo ">>> Usage examples:"
echo "  cd /app/work/wudi && git clone git@github.com-wudi:username/repo.git"
echo "  cd /app/work/cd996 && git clone git@github.com-cd996:username/repo.git"
