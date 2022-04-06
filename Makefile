# SPDX-FileCopyrightText: 2022 XMPP Providers Team
#
# SPDX-License-Identifier: AGPL-3.0-or-later

PY=python3
HUGO=hugo

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/public
TOOLSDIR=$(BASEDIR)/tools

help:
	@echo 'Makefile for a hugo website                                            '
	@echo '                                                                       '
	@echo 'Usage:                                                                 '
	@echo '   make clean                       remove the generated files         '
	@echo '   make publish                     generate using production settings '
	@echo '   make serve                       serve site at http://localhost:1313'
	@echo '                                                                       '

clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)

serve:
	$(PY) $(TOOLSDIR)/prepare.py
	$(HUGO) version
	$(HUGO) server --bind=0.0.0.0 --baseURL="http://localhost/" --buildFuture

publish:
	$(PY) $(TOOLSDIR)/prepare.py
	$(HUGO) version
	$(HUGO)

.PHONY: help clean serve publish
