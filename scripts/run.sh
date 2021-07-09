#!/usr/bin/env bash

# -e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
set -e
trap terminate SIGTERM SIGINT

WORKDIR=$PWD
BACKEND_PATH="$PWD/BackEndApp"
FRONTEND_PATH="$PWD/FrontEndApp/v1-react"


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
    echo "Usage: ./run.sh [options]
Example: './run.sh --venv virtualenv/'
Options:
    -h, --help          Show help docs with detials of command argument options
    --venv              Path of python virtualenv
    --install           Run the installation scripts to install the necessary binaries and libraries
    ";

    exit 0
}

# sudo-check
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

# python venv
pyvenv_create() {
    # installing virtualenv
    VENV_PATH="venv"
    if [[ -n $1 ]]
    then
        VENV_PATH=$1
    fi

    if [[ ! -d $VENV_PATH ]]
    then
        echo -e "${INFO} Creating virtualenv ${VENV_PATH}"
        python3 -m pip install virtualenv
        virtualenv $VENV_PATH
    fi
    source $VENV_PATH/bin/activate
    echo -e "${TICK} Virtualenv ${VENV_PATH} loaded"
}

run_install() {
    # run install.sh
    sudo $WORKDIR/scripts/install.sh
}

frontend_setup() {
    echo -e "${INFO} Setting up frontend"
    cd $FRONTEND_PATH
    npm install
}

backend_setup() {
    echo -e "${INFO} Setting up backend"
    pip install -r requirements.txt
}

run() {
    echo -e "${INFO} Starting backend server"
    cd $BACKEND_PATH
    python3 manage.py runserver &
    BACKEND_PID=$!
    echo -e "${TICK} Backend server running"
    echo ""

    echo -e "${INFO} Starting frontend server"
    cd $FRONTEND_PATH
    npm start &
    FRONTEND_PID=$!
    echo -e "${TICK} Frontend server running"

    # Since we now expect to receive SIGINT
    # process terminations might return non-zero status
    set +e
    wait $BACKEND_PID
    wait $FRONTEND_PID

}

# Terminate processes
terminate(){
    if [[ -v BACKEND_PID ]];
    then
        kill $BACKEND_PID
        printf "Backend stopped\n"
    fi
    if [[ -v FRONTEND_PID ]];
    then
        kill $FRONTEND_PID
        printf "Frontend stopped\n"
    fi
    exit
}

setup() {
    echo -e "${INFO} Setting up..."
    frontend_setup
    if [ $? -eq 0 ]
    then
        echo -e "${TICK} Frontend setup complete"
    else
        echo -e "${CROSS} Frontend setup failed"
    fi
    cd $WORKDIR
    echo ""

    backend_setup
    if [ $? -eq 0 ]
    then
        echo -e "${TICK} Backend setup complete"
    else
        echo -e "${CROSS} Backend setup failed"
    fi
    cd $WORKDIR
    echo ""
}

main() {
    setup
    run
}

while [[ "$#" -gt 0 ]]; do
    case $1 in
        "-h" | "help" | "--help")       help_func;;
        "--venv")                       pyvenv_create $2; shift;;
        "--install")                    run_install;;
        *)                              help_func;;
    esac
    shift
done

main
