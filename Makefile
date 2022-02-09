
# HELP
# This will output the help for each task
.PHONY: help

help: ## This help that you're reading now
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# DOCKER Tasks
build: ## Build the container
	docker image build . -t vcatsinch/node-handle-incoming-call

build-nc: ## Build the container without cache
	docker image build . --no-cache -t vcatsinch/node-handle-incoming-call

run: ## Run the container attached
	docker container run -a STDOUT -p 3000:3000 --name node-handle-incoming-call vcatsinch/node-handle-incoming-call

run-d: ## Run the container dettached
	docker container run -d -p 3000:3000 --name node-handle-incoming-call vcatsinch/node-handle-incoming-call

up: build run ## Build and run the container

logs: ## See the logs of the running container
	docker container logs --follow node-handle-incoming-call

stop: ## Stop and remove the running container
	docker container stop node-handle-incoming-call; docker container rm node-handle-incoming-call
