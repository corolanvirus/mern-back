.PHONY: help build run
.SILENT:
.DEFAULT_GOAL = help

build: ## Build image node
	docker build -t node .

run: build  ## Run containers
	docker run -ti -v $(CURDIR):/app -p 1337:1337 node

help: #Pour générer automatiquement l'aide ## Display all commands available
	$(eval PADDING=$(shell grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk '{ print length($$1)-1 }' | sort -n | tail -n 1))
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-$(PADDING)s\033[0m %s\n", $$1, $$2}'