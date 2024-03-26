---
title: XMPP Providers Support Chat and Server
date: 2024-03-28
---


## XMPP Providers Server

We recently started to set up our own XMPP server to provide a [support chat](/blog/2024-03-11-xmpp-providers-chat/).
Our goal was to automate as much as possible to reduce the maintenance effort to a minimum.
While doing that, we also thought about how the experience is for XMPP newcomers to set up their own XMPP server.

There are many [XMPP servers](https://xmpp.org/software/) available.
But only few projects focus on quick and simple setups.
Therefore, we started another small project called [XMPP Providers Server](https://invent.kde.org/melvo/xmpp-providers-server).
Its main purpose is to manage our XMPP server.
And in the future, we will possibly run additional services on that server.
But it also allows interested operators to have a smooth start with running their own XMPP server.

The XMPP Providers Server is an automated server setup.
It makes use of Ansible to configure a Debian-based server.
The Ansible playbooks as well as the guide we wrote are an all-in-one setup for fully-featured XMPP servers.
By using sensible defaults, the project focuses on simplicity rather than on covering all possible use cases.
With more experience, the setup can be expanded in order to use a more complex configuration.

There is no support for a regular web server yet.
Thus, the setup cannot be used to serve a website.
But since the Ansible setup is very modular, that functionality can be added as well as other functionality.
If you do so, consider to [contribute](https://invent.kde.org/melvo/xmpp-providers-server/-/blob/master/CONTRIBUTING.md) those improvements to the official project :)
That way, everybody can benefit from your effort!
We are happy to hear your feedback!

We encourage you to use XMPP and run your own server instance, maybe even by becoming a public provider.
But keep in mind that providing a public service comes with great responsibility you should be aware of.
Best practices can be discussed in the [official XMPP operators chat](https://xmpp.org/community/chat/#operators-chatroom).
If your topic does not suit one of them, there are plenty of other [public XMPP group chats](https://search.jabber.network) in the [XMPP network](https://xmppnetwork.goodbytes.im).
## Help Us

For a good user experience, [apps integrating XMPP Providers](https://providers.xmpp.net/apps/) are as important as the providers themselves.
If you are an XMPP developer, please consider [adding XMPP Provider support](https://invent.kde.org/melvo/xmpp-providers#usage) to your app.
If you are an operator of a public XMPP service, provide the [information we need](https://providers.xmpp.net/faq/#where-do-we-have-the-providers-properties-from) and [add it to our list](https://invent.kde.org/melvo/xmpp-providers/-/blob/master/CONTRIBUTING.md#providers).

Feel free to [reach out to us](/contact/) if you have any questions!
## Spread the Word

The XMPP Providers project lives from the community.
[Follow us and spread the word](https://fosstodon.org/@xmpp_providers)!

{{< figure src="/images/xmpp-providers-adaptive.svg" caption="XMPP Providers Logo" class="text-center w-100 pt-5" height="300" link="/" >}}
