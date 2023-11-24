#!/bin/bash

SERVER_NAME="bexam-react-portal"

DATE=$(date +%Y-%m-%d)
BASE_HOME="/service/bexam/${SERVER_NAME}"
WAS_BACKUP_PATH="${BASE_HOME}/backup"
WAS_HOME_PATH="${BASE_HOME}/app"
DEPLOY_TYPE="war"
DEPLOY_NAME="${SERVER_NAME}.${DEPLOY_TYPE}"

echo "## Start Backup old files"
sudo cp -r ${WAS_HOME_PATH}/${DEPLOY_NAME} ${WAS_BACKUP_PATH}/${DEPLOY_NAME}_"${DATE}".${DEPLOY_TYPE}

echo "## Delete old files"
sudo rm -rf ${WAS_HOME_PATH}/${DEPLOY_NAME}
