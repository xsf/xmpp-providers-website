# SPDX-FileCopyrightText: 2022 XMPP Providers Team
#
# SPDX-License-Identifier: AGPL-3.0-or-later

# Dockerfile to build a docker image for xmpp-providers

FROM python:3.11-slim-bookworm

# Set environment variables
ENV DEBIAN_FRONTEND noninteractive

# Update system
RUN apt-get update && apt-get dist-upgrade -y && apt-get autoremove -y && apt-get clean

# Install dependencies
RUN apt-get install -y make curl

RUN curl -L https://github.com/gohugoio/hugo/releases/download/v0.121.1/hugo_0.121.1_linux-amd64.deb -o hugo.deb
RUN apt-get install ./hugo.deb

ARG API_VERSION=v2
ARG BASEURL=https://providers.xmpp.net/

# Build and copy in place
WORKDIR /var/tmp/src/xmpp-providers
COPY . /var/tmp/src/xmpp-providers

ADD https://invent.kde.org/melvo/xmpp-providers/-/jobs/artifacts/stable/$API_VERSION/download/?job=filtered-provider-lists /var/tmp/src/xmpp-providers/downloads-docker/providers_data.zip
ADD https://invent.kde.org/melvo/xmpp-providers/-/jobs/artifacts/stable/$API_VERSION/download/?job=badges /var/tmp/src/xmpp-providers/downloads-docker/badges_data.zip
ADD https://data.xmpp.net/providers/$API_VERSION/providers.json /var/tmp/src/xmpp-providers/downloads-docker/providers.json

RUN cd /var/tmp/src/xmpp-providers && make publish BASEURL=$BASEURL

FROM nginx
COPY deploy/xmpp-providers.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /var/tmp/src/xmpp-providers/public/ /var/www/html/
