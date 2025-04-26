# SPDX-FileCopyrightText: 2022 XMPP Providers Team
#
# SPDX-License-Identifier: AGPL-3.0-or-later

PY=python
UV=uv
HUGO=hugo

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/public
BASEURL=https://providers.xmpp.net/
UV_SYSTEM=""

help:
	@echo 'Makefile for a hugo website                                                 '
	@echo '                                                                            '
	@echo 'Usage:                                                                      '
	@echo '   make clean          remove the generated files                           '
	@echo '   make publish        generate using production settings                   '
	@echo '   make serve          serve site at http://localhost:1313                  '
	@echo '   make serve-no-pip   serve site at http://localhost:1313 without using PIP'
	@echo '                                                                            '

clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)

serve:
	$(UV) pip install --upgrade -r pyproject.toml
	$(PY) -m src.run prepare_website
	$(HUGO) version
	$(HUGO) server --bind=0.0.0.0 --baseURL="http://localhost/" --buildFuture

serve-no-pip:
	$(PY) -m src.run prepare_website
	$(HUGO) version
	$(HUGO) server --bind=0.0.0.0 --baseURL="http://localhost/" --buildFuture

publish:
	$(UV) pip install --upgrade $(UV_SYSTEM) -r pyproject.toml
	$(PY) -m src.run prepare_website
	$(HUGO) version
	$(HUGO) --baseURL=$(BASEURL)

.PHONY: help clean serve serve-no-pip publish
