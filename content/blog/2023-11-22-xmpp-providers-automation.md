---
title: XMPP Providers Automation
date: 2023-11-22
---

## Automating the Automatable

During the past year, the team behind the [XMPP Providers](https://providers.xmpp.net/) project worked on automating the process of gathering data about XMPP providers.
Automating this process reduces manual work significantly (for example, checking websites by hand, verifying information, listing sources, etc.) and helps to sustain the team's efforts.
Automation also enables the project to be up to date - every day!

At the beginning of this year, work on automating the collection of several provider 'properties' (for example, available size for file uploads) started.
An overview of all these provider properties gathered for each XMPP provider can be found on the [overview page](https://providers.xmpp.net/overview/).
Some of these properties were already available in a machine-readable format, making it easy to be collected.

A {{< external-link url="https://invent.kde.org/melvo/xmpp-providers/-/blob/master/TOOLS.md#automation" text="suite of tools" >}} has been developed since, providing the ability to query properties via XMPP and through the web.
All of these tools are working together in a GitLab pipeline, which runs every night to keep the data up to date.

**So far, the following properties are collected automatically:**

- Account Creation via XMPP Apps: For determining whether a server supports the creation of accounts via XMPP apps, {{< external-link url="https://xmpp.org/extensions/xep-0077.html" text="XEP-0077: In-Band Registration" >}} is used.
- Account Creation via Web Page: For retrieving a web page that can be used to create accounts, {{< external-link url="https://xmpp.org/extensions/xep-0077.html#redirect" text="XEP-0077: In-Band Registration - Redirection" >}} is used.
- Server Software: For determining which software (including its version) a server runs, {{< external-link url="https://xmpp.org/extensions/xep-0092.html" text="XEP-0092: Software Version" >}} is used.
- Support Addresses: For retrieving the support addresses of a provider, {{< external-link url="https://xmpp.org/extensions/xep-0157.html" text="XEP-0157: Contact Addresses for XMPP Services" >}} is used.
Support addresses will be available in version 2 (`v2`) of the API.
Please note that due to limitations of the standard, only one language is supported for addresses.
- Upload Limits and Storage Durations: For determining how much users can upload to a server and how long those files are stored, {{< external-link url="https://xmpp.org/extensions/xep-0363.html#disco" text="XEP-0363: HTTP File Upload - Discovering Support" >}} is used.

The [FAQ section](https://providers.xmpp.net/faq/#where-do-we-have-the-providers-properties-from) explains how these properties can be provided by server admins.

## More Automation

Not all of the properties collected by the XMPP Providers project are machine-readable yet.
To enable automatic collection of the missing properties, the team works on extending existing standards and, if necessary, creating new ones.
Due to the amount of manual work for maintaining all the provider properties, no new providers have been included in the recent past.
With increasing automation and thus reduced manual intervention, the XMPP Providers project will soon be open for including new providers again!

## Spread the Word

The project lives from the community and client implementations, so {{< external-link url="https://fosstodon.org/@xmpp_providers" text="follow us and spread the word" >}}!

{{< figure src="/images/xmpp-providers.svg" caption="XMPP Providers Logo" class="text-center w-100 pt-5" height="300" link="https://providers.xmpp.net" >}}
