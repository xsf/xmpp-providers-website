---
title: More adaption of XMPP Providers in the XMPP Ecosystem
date: 2025-09-15
---

We are very pleased to see that recently the XMPP web-client [converse.js](https://github.com/conversejs/converse.js/releases/tag/v12.0.0) has adapted their application to refer to our service.
So if users are looking for a way to register a new account when accessing converse.js they will be guided to our web page.
This is of course, not a full integration as we propose to do and other [apps](https://providers.xmpp.net/apps/) already do, but we are happy to see more general adoption of our project.

Even more the XMPP Server ejabberd has added [mod_providers](https://docs.ejabberd.im/admin/configuration/modules/#mod_providers) from version `25.08`.
More details in their [Github commit](https://github.com/processone/ejabberd/commit/97e1b419a0189b4a5a87f0fc6ef709af799beaa0).
As we were not involved or have reached out in this regard this is a big honour for us.

This circumstance, but also level of acceptance and adoption will motivate us even more to realise a long-standing thought:
Publish a new XEP to improve formalising and accessing public server information in the XMPP Community.
We believe this is another piece to enhance accessing of XMPP server information smoothly for everyone in the future.

Speaking of enhancement pieces: Ejabberd Great Invitations. As XMPP operators are often confronted with abuse, many have turned of their so called [in-band registration](https://xmpp.org/extensions/xep-0077.html).
With this, users can easily register through an XMPP client without going to any other webpage.
Still, activation of this feature is required to qualify for [category A](https://providers.xmpp.net/faq/#in-which-categories-can-providers-be).
Enabling simple registrations is a key improvement area in the XMPP ecosystem and also the background of our service.
Therefore, we welcome this development!

## Help the Project, Improve XMPP

For a good user experience, [apps integrating XMPP Providers](/apps/) are as important as the providers themselves.
If you are an XMPP developer, please consider [adding XMPP Providers support](https://invent.kde.org/melvo/xmpp-providers#usage) to your app.
If you are an operator of a public XMPP service, provide the [information we need](/faq/#where-do-we-have-the-providers-properties-from) and [add it to the list](https://invent.kde.org/melvo/xmpp-providers/-/blob/master/CONTRIBUTING.md#providers).
You can also consider to run our (automated) [XMPP Providers Server setup](https://invent.kde.org/melvo/xmpp-providers-server/-/blob/master/README.md?ref_type=heads).

If you like to support XMPP Providers, please consider [making a donation](https://liberapay.com/xmpp_providers).

Feel free to [reach out to us](/contact/) if you have any questions!

## Spread the Word

The XMPP Providers project lives from the community and we are happy to hear your feedback.
[Follow us and spread the word](https://fosstodon.org/@xmpp_providers)!

{{< figure src="/images/xmpp-providers-adaptive.svg" caption="XMPP Providers Logo" class="text-center w-100 pt-5" height="300" link="/" >}}
