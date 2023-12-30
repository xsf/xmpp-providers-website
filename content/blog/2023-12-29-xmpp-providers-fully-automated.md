---
title: XMPP Providers Fully Automated
date: 2023-12-29
---

## Automate all the Things

During the past year, the team behind the [XMPP Providers](/) project worked on automating the process of gathering data about XMPP providers.
Automating this process reduces manual work significantly (for example, checking websites by hand, verifying information, listing sources, etc.) and helps to sustain the team's efforts.
Automation also enables the project to be up to date -- every day!

[Last month](/blog/2023-11-22-xmpp-providers-automation/), the project reached a state that allowed the [suite of tools](https://invent.kde.org/melvo/xmpp-providers/-/blob/master/TOOLS.md#automation) to automatically query many [provider properties](https://invent.kde.org/melvo/xmpp-providers/-/blob/master/README.md#properties) via XMPP and HTTP.
All of these tools are working together in a GitLab pipeline running daily to keep the data up to date.

## API v2

Much of the work needed to be done manually previously.
After automating it, some provider properties did not seem fitting anymore.
Thus, we changed them.
While automating the process, additional properties were added because they were available through the tools.

### Changed Properties

- `lastCheck` has been replaced by `latestUpdate` specifying when at least one provider property changed since checks now run daily.
- `company` has been replaced by `organization` allowing for a finer distinction of an organization's type.

### New Properties

- `alternativeJids`: A list of JIDs a provider offers for registration other than the main JID.
- `serverTesting`: Whether tests against the provider's server are allowed (e.g., certificate checks and uptime monitoring).
- `inBandRegistrationEmailAddressRequired`: Whether an email address is required for registering an account.
- `inBandRegistrationCaptchaRequired`: Whether a [CAPTCHA](https://en.wikipedia.org/wiki/CAPTCHA) is needed to be solved for registering an account.

The [FAQ section](/faq/#where-do-we-have-the-providers-properties-from) explains how these properties can be provided by server admins.

## Provider Files for More Automation

There are properties that should be provided by the XMPP server instead of retrieving them via other methods.
To enable automatic collection of those properties via XMPP, the team works on extending existing standards and, if necessary, creating new ones.

Until standards have been extended or created, and until those changes have been implemented and deployed in the wild, a *provider file* shall fill the gap.
A provider file is a JSON file containing only the provider properties that cannot be retrieved via other methods.
Each provider can generate a provider file and supply it via its web server.

To make this as easy as possible, a [Provider File Generator](/provider-file-generator/) has been developed.
It generates a provider file from the information you enter in the form.

As soon as a provider file is discovered by the tools, all properties listed in the provider file are automatically fetched and processed.

## Spread the Word

The project lives from the community and client implementations, so [follow us and spread the word](https://fosstodon.org/@xmpp_providers)!

{{< figure src="/images/xmpp-providers-adaptive.svg" caption="XMPP Providers Logo" class="text-center w-100 pt-5" height="300" link="/" >}}
