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
RUN apt-get install -y make hugo

ARG BASEURL=https://providers.xmpp.net/

# Build and copy in place
WORKDIR /var/tmp/src/xmpp-providers
COPY . /var/tmp/src/xmpp-providers
ADD https://invent.kde.org/melvo/xmpp-providers/-/jobs/artifacts/master/download/?job=filtered-provider-lists /var/tmp/src/xmpp-providers/downloads-docker/providers_data.zip
ADD https://invent.kde.org/melvo/xmpp-providers/-/jobs/artifacts/master/download/?job=badges /var/tmp/src/xmpp-providers/downloads-docker/badges_data.zip
RUN cd /var/tmp/src/xmpp-providers && make publish BASEURL=$BASEURL

FROM nginx
COPY deploy/xmpp-providers.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /var/tmp/src/xmpp-providers/public/ /var/www/html/
