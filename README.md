# providers.xmpp.net

## Software Requirements

* hugo
* python3

## Introduction to Hugo

Hugo’s [quickstart](https://gohugo.io/getting-started/quick-start/) page is a good place to learn about the basics of Hugo (installation, project skeleton, development cycle, etc.).

## Installation instructions

To run a development server on your local computer, follow these basic steps:

```bash
git clone (add repo here)
# install Hugo
cd repo
```

Running the server in development mode (reloads whenever a file is changed):

```bash
make serve
```

View at `http://localhost:1313`

## Deployment

docker build -t xmpp-providers -f ./Dockerfile .
docker run -p 80:80 -t -i xmpp-providers

## Theme development

This theme makes use of:

* [Bootstrap 5.1](https://getbootstrap.com/docs/5.1/)
* [FontAwesome 6](https://fontawesome.com/v6/docs/)
