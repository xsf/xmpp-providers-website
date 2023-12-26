---
title: XMPP Providers Fully Automated
date: 2023-12-29
---

## Automate All The Things

During the past year, the team behind the [XMPP Providers](/) project worked on automating the process of gathering data about XMPP providers.
Automating this process reduces manual work significantly (for example, checking websites by hand, verifying information, listing sources, etc.) and helps to sustain the team's efforts.
Automation also enables the project to be up to date -- every day!

[Last month](/blog/2023-11-22-xmpp-providers-automation/), the project reached a state that allowed the [suite of tools](https://invent.kde.org/melvo/xmpp-providers/-/blob/master/TOOLS.md#automation) to automatically query many [provider properties](https://invent.kde.org/melvo/xmpp-providers/-/blob/master/README.md#properties) via XMPP and through the web.
All of these tools are working together in a GitLab pipeline, which runs every night to keep the data up to date.

## API v2

After automating much of the work which needed to be done manually previously, some provider properties did not seem fitting anymore and needed to change.
This alone is of course no reason for bumping an API's version.
While automating the process, additional properties were added, because they were available through the tools.

**Which properties did change in API `v2`?**

- `lastCheck` has been replaced by `latestUpdate`, since checks now run daily.
- `company` has been replaced by `organization`, which allows for a finer distinction of an organization's type.

**Additional new properties that are collected automatically:**

- Account creation process: For determining whether an email address is required for registering an account, [XEP-0077: In-Band Registration](https://xmpp.org/extensions/xep-0077.html) is used.
- Account creation process: For determining whether a [CAPTCHA](https://en.wikipedia.org/wiki/CAPTCHA) need to be solved for registering an account, [XEP-0077: In-Band Registration](https://xmpp.org/extensions/xep-0077.html) is used.
- Support Addresses: For retrieving the support addresses of a provider, [XEP-0157: Contact Addresses for XMPP Services](https://xmpp.org/extensions/xep-0157.html) is used. Please note that due to limitations of the standard, only one language is supported for addresses.

The [FAQ section](/faq/#where-do-we-have-the-providers-properties-from) explains how these properties can be provided by server admins.

**Additional new properties:**

- `alternativeJids`: A list of JIDs a provider offers for registration other than the main JID.
- `serverTesting`: Whether tests against the provider's server are allowed (e.g., certificate checks and uptime monitoring).

## A Provider File For More Automation

Not all of the properties collected by the XMPP Providers project are machine-readable yet.
To enable automatic collection of the missing properties, the team works on extending existing standards and, if necessary, creating new ones.

As a workaround until standards have been extended or created, and until those changes have been implemented and deployed in the wild, a 'provider file' shall fill the gap.
A provider file is a JSON file containing only the provider properties that cannot be retrieved via other methods.
Each provider can generate a provider file and supply it via its web server.
To make this as easy as possible, a [Provider File Generator](/provider-file-generator/) has been developed.
It generates a provider file from the information you supply.

As soon as a provider file is discovered by the tools, all properties listed in the provider file are automatically fetched and processed.

**Properties which can be fetched automatically via a provider file:**

- Website: Provider website (per language).
- Alternative JIDs: List of JIDs a provider offers for registration other than the main JID. New in API `v2`.
- [Bus factor](https://en.wikipedia.org/wiki/Bus_factor): Bus factor of the XMPP service (i.e., the minimum number of team members that the service could not survive losing).
- Organization: Type of organization providing the XMPP service. New in API `v2`, formerly `company`.
- Password reset: Password reset web page (per language) used for an automatic password reset (e.g., via email) or describing how to manually reset a password (e.g., by contacting the provider).
- Maximum HTTP File Upload total size: Maximum size of all shared files in total per user. This property is *not* about the maximum size of each shared file, which is already retrieved via XMPP.
- Maximum HTTP File Upload storage time: Maximum storage duration of each shared file.
- Maximum Message Archive Management storage time: Maximum storage duration of each exchanged message.
- Professional hosting: Whether the XMPP server is hosted with good internet connection speed, uninterruptible power supply, access protection and regular backups.
- Free of charge: Whether the XMPP service can be used for free.
- Legal notice: Legal notice web page (per language).
- Server locations: Server/Backup locations (countries).
- Server testing: Whether tests against the provider's server are allowed (e.g., certificate checks and uptime monitoring). New in API `v2`.
- Since: Date since the XMPP service is available.

## Spread the Word

The project lives from the community and client implementations, so [follow us and spread the word](https://fosstodon.org/@xmpp_providers)!

{{< figure src="/images/xmpp-providers.svg" caption="XMPP Providers Logo" class="text-center w-100 pt-5" height="300" link="/" >}}
