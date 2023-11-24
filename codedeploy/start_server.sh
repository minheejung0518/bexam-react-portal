#!/bin/bash

SERVER_NAME="bexam-react-portal"

DEPLOY_TYPE="war"
DEPLOY_NAME="${SERVER_NAME}.${DEPLOY_TYPE}"
BASE_HOME="/service/bexam/${SERVER_NAME}"
WAS_HOME_PATH="${BASE_HOME}/app"
WEB_HOME_PATH="${BASE_HOME}/web"

echo "## war file unpacking!"
unzip -o ${WAS_HOME_PATH}/${DEPLOY_NAME} -d ${WEB_HOME_PATH}
echo "## Start dev deploy!"
sudo service nginx restart
