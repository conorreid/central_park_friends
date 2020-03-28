SHELL := /bin/bash
.DEFAULT_GOAL=help
.PHONY: help

define HELP_TEXT
Help:
-------------------------
  $$ make setup                   - Setup the project.
  $$ make clean                   - Clean the project.
endef
export HELP_TEXT

help:
	@echo "$$HELP_TEXT"

clean:
	@echo "Removing garbage..."
	@find . -name '*.pyc' -delete
	@rm -rf .coverage *.egg-info *.log build dist MANIFEST

reset-database:
	@while [ -z "$$CONTINUE" ]; do \
		read -p "Are you sure that you want drop the default database?. [y/N] " -r CONTINUE; \
	done ; \
		if [ "$$CONTINUE" == "y" ] || [ "$$CONTINUE" == "Y" ]; then \
			psql -U the_people -c "DROP DATABASE test_central_park_friends;" ; make setup-database ; echo "Exiting..." ; \
		fi

run-javascript:
	@yarn run start

run-python:
	@python backend/webapp.py

setup-python:
	@if [ -z $$VIRTUAL_ENV ]; then \
		echo "===================================================="; \
		echo "Please run this inside a VIRTUAL_ENV"; \
		echo "===================================================="; \
		exit 1; \
	fi
	@if [ -z $$SKIP_DEPS ]; then \
		echo "Installing dependencies..."; \
		pip install --quiet -r development.txt; \
	fi

setup-javascript:
	@yarn --cwd frontend install

setup-database:
	@echo "Creating role: the_people"
	@createuser the_people --createdb || true
	@echo "Creating database..."
	# @psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'central_park_friends'" | grep -q 1 || psql -U the_people -c "CREATE DATABASE central_park_friends;"
	@psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'test_central_park_friends'" | grep -q 1 || psql -U postgres -c "CREATE DATABASE test_central_park_friends;"

setup: clean setup-python setup-javascript setup-database
