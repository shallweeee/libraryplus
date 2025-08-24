SHELL := /bin/bash

.PHONY: run
run:
	npm run dev

.PHONY: check
check:
	vi -q <(npm run typecheck | grep -w error | sed 's/(/:/; s/,/:/; s/)://')
