---
title: A Rising Tide Lifts All Boats
date: 2025-07-20
---

## Providers Survey

In May we ran a small survey to gather feedback from XMPP server operators.
Our main concerns were XMPP Provider's service and the project itself.
First of all, we would like to thank almost 60 people who participated in this survey.
While the XMPP Providers project currently lists a little more than [70 operators](/statistics/), this is a good turnout.
At this point we can already tell that the general feedback is very positive!

Although we had quite a few participants, only about one third were actual server operators.
Most of the responders were listed in [category A or B](/faq/#in-which-categories-can-providers-be) or they were not listed yet.

{{< figure src="/images/survey_result_overall.png" caption="Survey overall result" class="text-center pt-5" >}}

Since we are curious about the general satisfaction with XMPP Provider's service, we made these four aspects part of the survey:
Service listing and its processes, transparency, documentation and communication.
Across all these aspects, we see mostly satisfied to very satisfied participants.
For the occasional question about project documentation, we [recommend the FAQ](/faq) as a starting point.

{{< figure src="/images/survey_result_general_experience.png" caption="Survey general experience result" class="text-center pt-5" >}}

Since being listed as a provider may come with increased public visibility, we are interested in potential changes in registration count, usage activity, maintenance efforts or spam incidents.
The results suggest that spam incidents, maintenance efforts and usage activity didn't change much.
However, registration count increased, which supports federation in the XMPP ecosystem.

{{< figure src="/images/survey_result_listing_experience.png" caption="Survey listing experience result" class="text-center pt-5" >}}

In addition to these survey results, we received a lot of written feedback.
A good share of this feedback praises the project for empowering people to make a good and informed choice about their XMPP provider.
We would like to address some of the points raised in the feedback separately:

- Which kind of providers do we list? In theory, we would like to list any publicly visible XMPP provider. XMPP Providers [gathers information about all listed providers automatically](/blog/2023-12-29-xmpp-providers-fully-automated/), which may be helpful for registration purposes, for getting an overview about providers, or for looking up information about a specific provider, even if registration is closed.
- Why do you make [inband-registration](https://xmpp.org/extensions/xep-0077.html) a requirement for a category A or B listing? XMPP Providers is a project made to simplify the users’ onboardings. Therefore, the criteria we use for the categorization are from a user’s perspective. This means users should be able to register directly from their XMPP client. Spam may be the most prominent reason to close down inband-registration, but that creates a barrier for newcomers.
- Why do I need to provide an extra file for XMPP Providers? We try to gather data automatically, but not all data is available in machine-readable format. To reduce manual efforts until more data is available for automatic processing, we opted for a [providers file](/provider-file-generator/) containing additional information, which is hosted by individual providers. In the meantime, we continue to work on automating as much as possible.

## Perspective

A year after introducing the [provider file](/provider-file-generator/), more than [60% of the currently listed XMPP providers](/statistics/#provider-file) host such a file to offer additional information.
We see this as a great success, since it helps to improve both transparency and quality of XMPP providers.

At the time of writing, about 60% of the 74 XMPP providers listed are category D providers.
This is either due to closed registration, missing information, or both.
We encourage all providers to offer a provider file to fill the missing information gap.

<!-- TODO -->

Due to the reality of the decentralised nature of the network, the discussions and the learnings required us to create more distinct and refined parameters.
The rating's main purpose is a simple recommendation for **registration of especially newcomers to the XMPP ecosystem (through your server)**.

To remind, the distances, between our highly tech-savvy knowledge and the majority of the non-tech-savvy users is huge.
And on the opposite, the tolerance of these people is often very thin.
Therefore, we should ensure a good experience right after registering to an XMPP server.

We have repeatedly discussed the minimum values of the rating parameters, the limits and the defined thresholds.
Usually, to our understanding, most providers are also interested to have more users.
It is certainly not sufficient in all cases, but your users don't care about your properties, until they realise certain functions don’t work.
Then often the chat client (!) and maybe even XMPP as technology is blamed and they leave it forever.

Ratings are sensitive and they obviously lead to conflict, no doubts.
Still, we took strong actions to de-escalate and show good intentions.
Such as, keep the requirements for A as low as possible, actively reach out and help providers on improving their setup, host our support chat where we help operators even beyond the project with technical support.

## Purpose

There are many XMPP chat clients that help users to register a new account to a (pre-)existing list of XMPP server providers.
However, one issue is the variation in quality of XMPP servers lists, due to often a manual maintained and outdated nature.
In addition, restrictive behaviour as well as no recommendation to users at all by client developers does not support the federated idea and leads to oligopoly-like distribution of users.

We intend to address the unpopular situation around onboarding and user experience as well as promote user decentralisation in XMPP through transparency, accessibility, quality and completeness of information.
To thrive trust with our service we build it

* with a federated and decentralised interface,
* with a transparent high level of semi-automated and up-to-date information of listed servers with soft and hard quality measures,
* as a service that tracks and enable quality checks overtime and even help operators with feedback to their service,
* a service that provides an API to automatically register a new account for a user, 
* a service that helps to retrieve service information and support information beyond the registration process,
* with good documentation and transparency including a [user-friendly automated setup](https://invent.kde.org/melvo/xmpp-providers-server) for everyone to have a good start.

Not being a perfect solution, it represents strong efforts in the right direction to make registration smooth and elegant.
The priority is to prevent the two extremes of unmaintained provider lists containing any server you can find and also a purely limited selection of servers only with no changes.

We encourage you to use XMPP technology and run your own server instance, maybe even by becoming a public provider.
But keep in mind that providing a public service comes with great responsibility.
Let’s make the best out of this project, regardless of how you apply to it.
We believe this project is a great chance.

And remember, a rising tide lifts all boats.
— The XMPP Providers Team

## Help the Project, Help XMPP

For a good user experience, [apps integrating XMPP Providers](https://providers.xmpp.net/apps/) are as important as the providers themselves.
If you are an XMPP developer, please consider [adding XMPP Provider support](https://invent.kde.org/melvo/xmpp-providers#usage) to your app.
If you are an operator of a public XMPP service, provide the [information we need](https://github.com/xsf/xmpp-providers-website/blob/2024-08_blogpost_67_perc_providers/faq/#where-do-we-have-the-providers-properties-from) and [add it to the list](https://invent.kde.org/melvo/xmpp-providers/-/blob/master/CONTRIBUTING.md#providers).
Feel free to [reach out](https://github.com/xsf/xmpp-providers-website/blob/2024-08_blogpost_67_perc_providers/contact) if you have any questions!

## Spread the Word

The XMPP Providers project lives from the community and we are happy to hear your feedback.
[Follow us and spread the word](https://fosstodon.org/@xmpp_providers)!

{{< figure src="/images/xmpp-providers-adaptive.svg" caption="XMPP Providers Logo" class="text-center w-100 pt-5" height="300" link="/" >}}
