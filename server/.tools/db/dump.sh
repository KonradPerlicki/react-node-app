#!/bin/bash

BOLD="$(tput bold)"
RED="$(tput setaf 1)"
GREEN="$(tput setaf 2)"
YELLOW="$(tput setaf 3)"
RESET="$(tput sgr0)"

BASEDIR=$(dirname "$0")
ENV_FILE="$BASEDIR/../../../.env"

if [ ! -f "$ENV_FILE" ]; then
    echo "${BOLD}${RED}$ENV_FILE does not exist.${RESET}"
    exit 1
fi

eval "$(grep ^DOCKER_PREFIX= $ENV_FILE)"
eval "$(grep ^POSTGRES_DB_NAME= $ENV_FILE)"
eval "$(grep ^POSTGRES_USER= $ENV_FILE)"

echo "${YELLOW}Dumping database...${RESET}"

fileName=/db-dump.sql.gz

docker exec -i "${DOCKER_PREFIX%$'\r'}"_postgresql pg_dump -Fp -C -U ${POSTGRES_USER%$'\r'} ${POSTGRES_DB_NAME%$'\r'}  | gzip > "${BASEDIR%$'\r'}${fileName}" 

echo "${GREEN}Database was dumped to ${BOLD}${BASEDIR%$'\r'}${fileName}${RESET}"