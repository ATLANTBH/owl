#!/bin/bash

cd ..

mvn clean verify sonar:sonar -Dsonar.host.url=http://localhost:9999
