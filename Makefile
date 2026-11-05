# SPDX-FileCopyrightText: 2022 XMPP Providers Team
#
# SPDX-License-Identifier: AGPL-3.0-or-later

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/public
BASEURL=https://providers.xmpp.net/

help:
	@echo 'Makefile for a hugo website                                                 '
	@echo '                                                                            '
	@echo 'Usage:                                                                      '
	@echo '   make clean          remove the generated files                           '
	@echo '   make publish        generate using production settings                   '
	@echo '   make serve          serve site at http://localhost:1313                  '
	@echo '                                                                            '

clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)

serve:
	uv sync
	pre-commit install
	uv run xmpp_providers_website prepare_website
	hugo version
	hugo server --bind=0.0.0.0 --baseURL="http://localhost/" --buildFuture

publish:
	uv sync
	uv run xmpp_providers_website prepare_website
	hugo version
	hugo --baseURL=$(BASEURL)

.PHONY: help clean serve publish
