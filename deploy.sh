#!/bin/bash
aws s3 sync . s3://warmupreps --exclude ".git/*" --exclude "deploy.sh"
