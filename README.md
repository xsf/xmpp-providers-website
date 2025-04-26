<!--
SPDX-FileCopyrightText: 2022 XMPP Providers Team

SPDX-License-Identifier: AGPL-3.0-or-later
-->

# XMPP Providers Website

[![Website Build](https://github.com/xsf/xmpp-providers-website/actions/workflows/build-website.yml/badge.svg)](https://github.com/xsf/xmpp-providers-website/actions/workflows/build-website.yml) [![REUSE Compliance Check](https://github.com/xsf/xmpp-providers-website/actions/workflows/reuse.yml/badge.svg)](https://github.com/xsf/xmpp-providers-website/actions/workflows/reuse.yml)

[providers.xmpp.net](https://providers.xmpp.net) is a website generated based on data from the [XMPP Providers project](https://invent.kde.org/melvo/xmpp-providers).

Changes of the [provider data](https://invent.kde.org/melvo/xmpp-providers) may take a while to become visible on the [website](https://providers.xmpp.net).
This is due to some delay in building and deploying.

1. The filtered lists are provided by `https://invent.kde.org/melvo/xmpp-providers`
1. The website is deployed by the server on xmpp.net (every hour)

## Software Requirements

* hugo
* python >=3.13

## Development

### Building the Website

To run a development server on your local computer, follow these basic steps:

```bash
git clone https://github.com/xsf/xmpp-providers-website.git
# install Hugo
cd xmpp-providers-website
```

Running the server in development mode (reloads whenever a file is changed):

```bash
make serve
```

or, to use installed dependencies instead of using pip:

```bash
make serve-no-pip
```

View at `http://localhost:1313`

### Run via Docker

```bash
docker build -t xmpp-providers -f ./Dockerfile .
docker run -p 80:80 -t -i xmpp-providers
```

If you want to change Hugo’s baseURL for the generated website, build the image with `--build-arg BASEURL=http://yoururl/` set, for example with `http://localhost/`:

```bash
docker build -t xmpp-providers --build-arg BASEURL=http://localhost/ -f ./Dockerfile .
```

### Hugo Static Site Generator

Hugo’s [quickstart](https://gohugo.io/getting-started/quick-start/) page is a good place to learn about the basics of Hugo (installation, project skeleton, development cycle, etc.).

### Theme

This website makes use of:

* [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/)
* [FontAwesome 6](https://fontawesome.com/v6/docs/)

### API Levels

Currently, this website is based on the [v2 version](https://invent.kde.org/melvo/xmpp-providers/-/tree/stable/v2) of the Providers API.

When moving to another API version, URLs have to be changed in both `Dockerfile` and `tools/prepare.py`.
