#!/usr/bin/env bash
set -e

# Pretty print
print_msg() {
    local message=$1
    echo -e "\e[34m==>\e[0m \e[32m$message\e[0m"
}

# Mise
MISE=$(which mise)

if [ -z "$MISE" ]; then
  print_msg "Error: mise is not installed."
  exit 1
fi

# Permissions
print_msg "Setting permissions"
sudo chown -R vscode:vscode /mnt/mise-data

# Mise config
print_msg "Configuring mise"

$MISE trust .
echo "eval \"\$($MISE activate bash)\"" >> ~/.bashrc
echo "eval \"\$($MISE activate zsh)\"" >> ~/.zshrc

print_msg "Installing tools via mise"

# If the .env file exists, export the variables (expecting GITHUB_TOKEN to be set)
if [ -f "/workspaces/juan-miii.github.io/.devcontainer/.env" ]; then
    export $(grep -v '^#' /workspaces/juan-miii.github.io/.devcontainer/.env | xargs)
fi

if [ -n "$GITHUB_TOKEN" ]; then
    export GITHUB_TOKEN=$GITHUB_TOKEN
    print_msg "Added GitHub token to environment"
fi

$MISE install --locked

print_msg "Mise setup completed."