---
title: A Rising Tide Lifts All Boats
date: 2025-07-20
---

## Providers Survey

In May 2025, we ran a small survey to gather feedback from XMPP server operators.
Our main concerns were XMPP Provider's service and the project itself.
First of all, we would like to thank almost 60 people who participated in this survey.
While the XMPP Providers project currently lists a little more than [70 providers](/statistics/), this is a good turnout.
At this point we can already tell that the general feedback is very positive!

Although we had quite a few participants, only about one third were actual server operators.
Most of the responders were listed in [category A or B](/faq/#in-which-categories-can-providers-be) or they were not listed yet.

{{< figure src="/images/survey_result_overall.png" caption="Survey category result" class="text-center pt-5" >}}

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
- Why do you make [in-band registration](https://xmpp.org/extensions/xep-0077.html) a requirement for a category A or B listing? XMPP Providers is a project made to simplify the users’ onboardings. Therefore, the criteria we use for the categorization are from a user’s perspective. This means users should be able to register directly from their XMPP client. Spam may be the most prominent reason to disable in-band registration, but that creates a barrier for newcomers.
- Why do I need to provide an extra file for XMPP Providers? We try to gather data automatically, but not all data is available in a machine-readable format. To reduce manual efforts until more data is available for automatic processing, we opted for a [provider file](/faq/#provider-file) containing additional information, which is hosted by individual providers. In the meantime, we continue to work on automating as much as possible.
- Why can I only get into category B and not into category A if my service is not free? We made this distinction to allow a completely automated registration without any user input. In the future, we would like to add payment and donation information.

## Perspective

A year after introducing the provider file, more than [60% of the currently listed XMPP providers](/statistics/#provider-file) host such a file to offer additional information.
We see this as a great success, since it helps to improve both transparency and quality of XMPP providers.

At the time of writing, about 60% of the 74 XMPP providers listed are category D providers.
This is either due to closed registration, missing information, or both.
We encourage all providers to offer a provider file to fill the missing information gap.

Furthermore, with the client monocles chat, now [three active apps have integrated information](/apps/) from the XMPP Providers project.

## Why Provider Categories?

The decentralized nature of the XMPP network allows for a wide variety of clients and servers.
While the basic features might work in many cases, more advanced features might fail to work if a client or a server does not support the necessary feature set.
On top of that, there can be servers configured with outdated settings or insufficient storage options, which may further degrade the experience.

Take for example file transfers: A provider offers file transfers via [HTTP File Upload](https://xmpp.org/extensions/xep-0363.html) with up to 10 MB per file.
Now there is a user trying to send a 12 MB file, but their client does not support alternative file transfer methods.
In this case, the user cannot send their file via XMPP.
While registering with their provider, the user might not be aware of potential limits or issues, which could be avoided otherwise.

To give newcomers the best possible experience, the XMPP Providers project groups providers into simple categories.
Each category is based on a set of criteria a provider has to meet, and thus generalizes technical details into categories.
This is the easiest way to offer newcomers a list of providers with little potential for frustration.
Frustration during the first steps with a new service may turn users away from XMPP.
That's why frictionless onboarding and initial experience for first-time users is so important.
But users don't have to rely on categories alone.
XMPP Providers offers plenty of details for tech-savvy users, which can be used to filter the list by further criteria.

Putting providers into categories may lead to conflicts, that's true.
Oftentimes providers can reach better categories by fixing configuration issues, and we are always glad to help where we can.
There is an [extensive FAQ](/faq/#how-can-server-operators-provide-properties-via-xmpp) with the most frequent configuration issues, and we offer a [support chat](/contact/) for help with technical issues or related questions.
Last but not least, categories give providers an incentive to improve their service for better first-time user experience.

## Why Another Providers List

There are many websites listing XMPP providers, ranging from wikis to user guides and personal websites.
Many of these lists have common problems - information gets stale.
In order to have up-to-date information, these lists need a lot of manual maintenance.
To avoid having to maintain a list manually, the XMPP Providers project builds on automation.
As much of the data gathering and processing as possible has been automated.
For data which cannot be gathered automatically, we are actively working on solutions.

Automating data processing and categorization needs transparency, accessibility, and good documentation to be sustainable.
To reach these goals, and to improve the XMPP onboarding experience, we built the service around XMPP Providers with the following features in mind:

- an open-source interface which can be hosted by every interested party
- extensive service documentation
- offering of automated and up-to-date information for listed providers, including categorization with soft and hard quality criteria
- helping to retrieve service information and support information beyond the registration process
- giving opportunities for providers to check and improve their service quality
- providing an API to [include the list of providers in XMPP clients](/apps/)

While this project certainly leaves room for improvement, it's a first step to make the registration process smoother and less error-prone.
Providing a public service comes with great responsibility, and we would like to support service providers in that.
Remember: a rising tide lifts all boats.

## Help the Project, Improve XMPP

For a good user experience, [apps integrating XMPP Providers](/apps/) are as important as the providers themselves.
If you are an XMPP developer, please consider [adding XMPP Provider support](https://invent.kde.org/melvo/xmpp-providers#usage) to your app.
If you are an operator of a public XMPP service, provide the [information we need](https://github.com/xsf/xmpp-providers-website/blob/2024-08_blogpost_67_perc_providers/faq/#where-do-we-have-the-providers-properties-from) and [add it to the list](https://invent.kde.org/melvo/xmpp-providers/-/blob/master/CONTRIBUTING.md#providers).
Feel free to [reach out](https://github.com/xsf/xmpp-providers-website/blob/2024-08_blogpost_67_perc_providers/contact) if you have any questions!

## Spread the Word

The XMPP Providers project lives from the community and we are happy to hear your feedback.
[Follow us and spread the word](https://fosstodon.org/@xmpp_providers)!

{{< figure src="/images/xmpp-providers-adaptive.svg" caption="XMPP Providers Logo" class="text-center w-100 pt-5" height="300" link="/" >}}
