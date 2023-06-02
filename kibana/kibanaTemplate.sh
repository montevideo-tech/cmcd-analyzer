#!/bin/bash

curl -X POST -H "Content-Type: application/json" -H "kbn-xsrf: true" -H "Authorization: Basic ZWxhc3RpYzpjaGFuZ2VtZQ==" -d '@dashboards.json' localhost:5601/api/kibana/dashboards/import
