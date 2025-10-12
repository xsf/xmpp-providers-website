---
title: More Adoption of XMPP Providers in the XMPP Ecosystem & XMPP Providers Server Update
date: 2025-10-11
aliases: ["/blog/2025-10-11-more_adoption_xmpp_providers/"]
---

## Adoption of XMPP Providers

We are very pleased to see that the XMPP web client [Converse 12.0.0](https://github.com/conversejs/converse.js/releases/tag/v12.0.0) refers to XMPP Providers' service.
If users of Converse are looking for a way to register a new account, they are guided to [providers.xmpp.net](https://providers.xmpp.net).
Even if this is not a fully integrated solution as other [apps](/apps/) provide, we are happy to see more general adoption of the XMPP Providers project.

Furthermore, the XMPP server software [ejabberd](https://www.ejabberd.im/) has added a [module for XMPP provider files](https://docs.ejabberd.im/admin/configuration/modules/#mod_providers) in version 25.08.
We were neither involved in its development nor reached out to its author in this regard, so this is great news and a helpful addition.

This circumstance, but also the level of acceptance and adoption motivates us even more to realize a long-standing thought:
Publishing a new XEP to improve formalizing and accessing public XMPP server information.

## XMPP Providers Server Update

To keep up with the latest changes, we updated the [XMPP Providers Server](https://invent.kde.org/melvo/xmpp-providers-server) to Debian Trixie (13) and ejabberd 24.12.
Furthermore, a number of smaller improvements have been made to allow updating all software packages and to upgrade the system to new releases.

The XMPP Providers Server is the automated server setup used by XMPP Providers.
It makes use of Ansible to set up a Debian-based server and contains playbooks for a simple all-in-one setup with a fully-featured XMPP server.

## Help the Project, Improve XMPP

For a good user experience, [apps integrating XMPP Providers](/apps/) are as important as the [providers](/overview/) themselves.
If you are an XMPP developer, please consider [adding XMPP Providers support](https://invent.kde.org/melvo/xmpp-providers#usage) to your app.
If you are an operator of a public XMPP service, provide the [information XMPP Providers needs](/faq/#where-do-we-have-the-providers-properties-from) and [add your service to the list](https://invent.kde.org/melvo/xmpp-providers/-/blob/master/CONTRIBUTING.md#providers).
You can also consider to run our (automated) [XMPP Providers Server setup](https://invent.kde.org/melvo/xmpp-providers-server) yourself.
It is easily configurable to be used as a public or private XMPP server.

Feel free to [reach out to us](/contact/) if you have any questions!
If you like to support XMPP Providers, please consider [making a donation](https://liberapay.com/xmpp_providers).
[Follow us and spread the word](https://fosstodon.org/@xmpp_providers)!

{{< figure src="/images/xmpp-providers-adaptive.svg" caption="XMPP Providers Logo" class="text-center w-100 pt-5" height="300" link="/" >}}
