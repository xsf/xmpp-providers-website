# SPDX-FileCopyrightText: 2022 XMPP Providers Team
#
# SPDX-License-Identifier: AGPL-3.0-or-later

PY=python3
PIP=pip3
HUGO=hugo

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/public
TOOLSDIR=$(BASEDIR)/tools
BASEURL=https://providers.xmpp.net/

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
	$(PIP) install --upgrade -r $(TOOLSDIR)/requirements.txt
	$(PY) $(TOOLSDIR)/prepare.py
	$(HUGO) version
	$(HUGO) server --bind=0.0.0.0 --baseURL="http://localhost/" --buildFuture

serve-no-pip:
	$(PY) $(TOOLSDIR)/prepare.py
	$(HUGO) version
	$(HUGO) server --bind=0.0.0.0 --baseURL="http://localhost/" --buildFuture

publish:
	$(PIP) install --upgrade -r $(TOOLSDIR)/requirements.txt
	$(PY) $(TOOLSDIR)/prepare.py
	$(HUGO) version
	$(HUGO) --baseURL=$(BASEURL)

.PHONY: help clean serve serve-no-pip publish
