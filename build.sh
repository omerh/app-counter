#!/bin/bash

START=`pwd`

AWS_REGION='eu-west-1'
ACCOUNT_ID=$(aws sts get-caller-identity | jq -r '.Account')
ECR="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

aws ecr get-login-password --region $AWS_REGION | \
	docker login --username AWS --password-stdin $ECR

for container in `ls containers`; do
	echo $container
	cd containers/$container
	docker build --no-cache -t $ECR/$container .
	aws ecr create-repository --region $AWS_REGION \
		--repository-name $container --no-cli-pager || true
	docker push $ECR/$container
	cd $START
done