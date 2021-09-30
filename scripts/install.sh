#!/usr/bin/env bash

# -e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
set -e
trap : SIGTERM SIGINT

set_cols(){
    COL_NC='\e[0m' # No Color
    COL_LIGHT_GREEN='\e[1;32m'
    COL_LIGHT_RED='\e[1;31m'
    TICK="[${COL_LIGHT_GREEN}✓${COL_NC}]"
    CROSS="[${COL_LIGHT_RED}✗${COL_NC}]"
    INFO="[i]"
    # shellcheck disable=SC2034
    DONE="${COL_LIGHT_GREEN} done!${COL_NC}"
    OVER="\\r\\033[K"
}

set_cols

help_func() {
    echo "Usage: ./install.sh [options]
Example: './install.sh'
Options:
    -h, --help         Show help docs with detials of command argument options
    ";

    exit 0
}

sudo_check() {
    str="Root user check"
    printf "\\n"

    if [[ "${EUID}" -eq 0 ]]
    then
        # they are root and all is good
        printf "%b %s\\n" "${TICK}" "${str}"
        # Otherwise,
    else
        # They do not have enough privileges, so let the user know
        echo -e "${CROSS} sudo is needed to run installation script. Please run this script as root."
        printf "\\n"
        exit 1
    fi
}

install_binaries() {
    echo -e "${INFO} Installing..."

    if command -v python3 > /dev/null 2>&1
    then
        echo -e "${TICK} Python already exists"
        python3 --version
    else
        echo -e "${INFO} Installing latest python"
        apt-get install -y python3
        apt-get install -y python3-pip
        echo -e "${TICK} Python installed"
    fi

    if command -v node > /dev/null 2>&1
    then
        echo -e "${INFO} NodeJS already exists"
        node --version
        npm --version
    else
        echo -e "${INFO} Installing latest node.js"
        curl -fsSL https://deb.nodesource.com/setup_14.x |  bash -
        apt-get install -y nodejs
        echo -e "${TICK} NodeJS installed"
    fi
    echo -e "${TICK} Installation of binaries completed"
}

main() {
    echo ""
    sudo_check
    install_binaries
}

while [[ "$#" -gt 0 ]]; do
    case $1 in
        "-h" | "help" | "--help")       help_func;;
        *)                              help_func;;
    esac
    shift
done

main
