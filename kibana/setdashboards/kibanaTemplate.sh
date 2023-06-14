#!/bin/bash

set -ux

declare -r HOST="kibana:5601/api/status"

wait-for-url() {
    echo "Testing $1"
    timeout -s TERM 1000 bash -c \
    'while [[ "$(curl -H "Authorization: Basic ZWxhc3RpYzpjaGFuZ2VtZQ==" -s -o /dev/null -L -w ''%{http_code}'' ${0})" != "200" ]];\
    do echo "Waiting for kibana to load the dashboards." && sleep 4;\
    done' ${1}
    echo "Kibana ready!"
}
wait-for-url ${HOST}

curl -X POST -H "Content-Type: application/json" -H "kbn-xsrf: true" -H "Authorization: Basic ZWxhc3RpYzpjaGFuZ2VtZQ==" -d '@dashboards.json' kibana:5601/api/kibana/dashboards/import
