#!/bin/bash

START=`pwd`
for container in `ls containers`; do
	echo $container
	cd containers/$container
	docker build --no-cache -t $container .
	cd $START
done