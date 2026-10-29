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

print_msg "Mise environment verified."

# Reserved for future use
# GIT=$(which git)
# $MISE exec -- pre-commit install --install-hooks --hook-type commit-msg
# $GIT config --global pull.rebase false