#!/bin/bash

BOLD="$(tput bold)"
RED="$(tput setaf 1)"
GREEN="$(tput setaf 2)"
YELLOW="$(tput setaf 3)"
RESET="$(tput sgr0)"

BASEDIR=$(dirname "$0")
ENV_FILE="$BASEDIR/../../.env"

if [ ! -f "$ENV_FILE" ]; then
    echo "${BOLD}${RED}$ENV_FILE does not exist.${RESET}"
    exit 1
fi

eval "$(grep ^DOCKER_PREFIX= $ENV_FILE)"
eval "$(grep ^DOCKER_REACT_PORT= $ENV_FILE)"

echo "${YELLOW}Starting containers for '${BOLD}${DOCKER_PREFIX%$'\r'}'...${RESET}"
docker-compose up -d

echo "${BOLD}${RED}--------------------------------------------------------------------------------${RESET}"
echo -e "${BOLD}${YELLOW}Installing server dependencies...${RESET}\n"
docker exec -i "${DOCKER_PREFIX%$'\r'}"_node npm install

echo "${BOLD}${RED}--------------------------------------------------------------------------------${RESET}"
echo -e "${BOLD}${YELLOW}Installing front-end dependencies...${RESET}\n"
docker exec -i "${DOCKER_PREFIX%$'\r'}"_react npm install

echo "${BOLD}${RED}--------------------------------------------------------------------------------${RESET}"

#import database from other script
server/.tools/db/import.sh

echo "${BOLD}${RED}--------------------------------------------------------------------------------${RESET}"
echo "${YELLOW}The panel is available at: ${BOLD}${GREEN}http://localhost:${DOCKER_REACT_PORT%$'\r'}/${RESET}"
echo "${YELLOW}The database panel is available at: ${BOLD}${GREEN}http://localhost:5050/${RESET}"
