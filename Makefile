SHELL := /bin/bash

.PHONY: run
run:
	npm run dev

.PHONY: format
format:
	npm run format

.PHONY: check
check:
	vi -q <(npm run typecheck | grep -w error | sed 's/(/:/; s/,/:/; s/)://')

.PHONY: setup
setup: HOOK = .git/hooks/pre-commit
setup:
	npm i
	@if [ -f $(HOOK) ]; then echo '* pre-commit hook already exists, skip.'; exit; fi
	@sed -n '/```pre-commit/,/```/{/^```/d; p}' README.md > $(HOOK)
	@chmod u+x $(HOOK)

.PHONY: revision
revision:
	npm run db:generate

.PHONY: upgrade
upgrade:
	npm run db:migrate
