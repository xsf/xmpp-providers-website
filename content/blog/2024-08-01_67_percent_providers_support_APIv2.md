---
title: Currently more than 50% of the listed XMPP providers support API version 2
date: 2024-09-01
---

Six months after we have offered hosting a [generic JSON files](https://providers.xmpp.net/provider-file-generator/) which are based on our API version 2, more than 50% of the currently listed XMPP service providers on their XMPP instance.
This is a great achievement for decentralization in XMPP onboarding. Still, our efforts go beyond the project goals and draw a road to better transparency, quality and understanding of the entire XMPP network.

At the moment we have 72 XMPP providers listed in our setup. By end of 2024 we aim to cross the 100, maybe even 150.
This is just a very small percentage of the [existing instances](https://xmppnetwork.goodbytes.im) out there. Our main static shows that about 50% of the listed servers are categorized in D.
This is of course unfortunate.
The main reasons are either closed registrations, missing information or both.
We recommend to also support the automated way we have established to not just support better onboarding, but also transparency of the network and general quality measures.

## Perspective &  Criticism

First of all, big thanks to all the supporters and applies of our projects and the helpful and constructive and last but not least welcome feedback.
We really did our best to apply and adapt in the exploitative sphere we are in.
Since we started about four years ago there have always been confronted criticism, part of which we also expected:
- Strong criticism on the rating
- Boycott of the service
- Abusive behavior
Though, some criticism we certainly did not expect.
In general, we do understand many complains. In this article I would like to invite you to take a very certain perspective: The users and newcomers to XMPP.

What do we know what they know?
What do we know what they understand?
The distances, between our highly tech-savvy knowledge and this of the majority of the users we often build our services and software for is huge.
And on the opposite, the tolerance of these people is often very thin.
As thin as is your tolerance is possibly with the limits and threshold we have defined to rate your server setup.
The perspective we take is to ensure a good experience right after registering to an XMPP server.
At least, the server should not be part of any issue.

When it comes to the rating parameter minimums, limits and thresholds we have defined, we usually went through long and reiterating discussions that partly have not yet even come to settle.
The main focus is the question for example of how too low parameter for HTTP file upload could affect the user experience.
If you believe 5 MB are enough, then you have not have had the situation that maybe some clients do not compress files sent.
Videos being transfered easily reach sizes that exceed this by the factor of 10.
Is this good? Is this something you as operator should care about?
Well, you run a public server and with this unfortunately have some responsibility and, to our understanding, most providers are interested to have more users.
This is why we argued to have a minimum of 20 MB for example.
It is certainly not sufficient in all cases, but it will cover the commonly transferred sizes and ensures a good experience with a greater likelihood.
If you disagree, that is fine, this is why we love decentralization.
However, then it is maybe not the best to registers newcomers that have certain expectations right away to your server.
Sorry to say, but especially public server maintainers have and have show the potential to ruin the user experience and reputation of the network and also your XMPP apps.
Note to client developers: Users will regardless of the origin of the issue blame your app.

Due to the reality of the decentralized nature of the network, the discussions and the learnings required us to create more distinct and refined parameters that now may bug you.
Did you know that there are XMPP providers that only open registration during the weekend?
Yes, no joke.
Parameter-wise - do they now have registration enabled or not? Is registration now ‘true’ or ‘false’? You tell us…
There are many more examples on how difficult it can be to find the right and good metric.

Clear is, the rating is not made to blame, but expose user-friendly setups in a simple manner.
In a simple manner, that we only barely need exclude setups from reaching a good rating for smooth onboarding.
The rating can indicate quality issues, still the main purpose is the recommendation to register especially non-tech-savvy newcomers to a server or not.

Ratings are sensitive and they obviously lead to conflict, no doubts.
Still, we can proof that we did four strong actions to keep it to a limit and have good intentions.
- Keep the requirements for A as low as possible. We believe that even hobby-operators can easily meet these requirements if they want to.
- Actively reach out and help providers on their setup. And this lead to significant quality improvements in many setups, besides increasing their service rating. Yes, we even sent a postcard to an XMPP service operator and even got a response!
- We spent extra time and for about six month now also host our support chat where we help operators even beyond the project with technical support with honorable improvements of their services.
- Melvin did a big effort and wrote a user-friendly, clearly documented and also semi-automated [XMPP Providers Server](https://invent.kde.org/melvo/xmpp-providers-server) setup that anybody can use and start with a good configured setup.
- After four years we also showed persistence and consistent improvement of quality assurance.

## Vision

The XMPP universe has many chat clients, and many that in one or the other way list and help users to register a new account to an existing or pre-existing list of XMPP server providers.
This is great and this is what the network nature should be.
However, on the one side the quality of the provided choice of XMPP server providers varies and has often a manual maintained, outdated and uninformed nature which leads to bad experiences.
On the other side a too restrictive behavior or no recommendation at all does not support the federated idea.
That leads to oligopoly-like distribution of users.
These two extrema of ignorance or mistrust are neither a solution.
We intend to address the problematic onboarding and user experience but also at the same time user decentralization in XMPP great again, at least be an enabler for it.
An enabler through transparency, accessibility, quality and completeness of information.

We often hear that trust of services is a big issue. And yes this is of course an important topic.
Here we need control and checks to some extend.
However, to the same extend we also need to trust.
There is no guarantee that a service will not run into problems.
In this context we argue that never before there was a more trustworthy open service solution in the XMPP community than XMPP Providers:
- a service that keeps and supports a federated and decentralized interface
- a service that provides a transparent high level of even semi-automated and up-to-date information of listed servers with soft and hard quality measures
- a service tracks and enable quality checks overtime and even help operators with feedback to their service
- a service provides an API to automatically register a new account for a user
- a service that helps you as developer as well the user to retrieve service information and support contacts beyond the registration process

Is this a perfect complete response to the difficulties we experience within server, registration and usability? For sure not.
But it is a strong effort to improve the general situation.
Onboarding in XMPP is a problem since ever and this has barely been tackled across the entire network, and if so with rather isolated solutions.
It is the very unpopular effort we need to do in a decentralized network.
And even if you think it as a bad solution: It is better than any manually maintained lists we saw before.
It is better than any unmaintained lists containing any server you can find and expose themselves in a lottery-manner to uninformed users to pick from.
It is better than keeping a purely limited selection of servers in your client that for sure may work, but unfortunately jeopardizes the idea of federation we all actually like so much.

XMPP Providers with all the great achievements we have made so far is not the end of the road.
From a simple list for automatic registration we have evolved to build an API and a website with interesting statistics on the network.
We also think that keeping up with good documentation and transparency is another great achievement.
And, as said, instead of talking how to setup you server, we also wrote our own [automated setup](https://invent.kde.org/melvo/xmpp-providers-server) for everyone to have a good start.
We encourage you to use XMPP and run your own server instance, maybe even by becoming a public provider.
Yes, if you want to host your own infrastructure you should do it. 
But keep in mind that providing a public service comes with great responsibility you should be aware of!

From this point we also believe that the project to some extend evolved from a single purpose to a multi-purpose project.
We propagate a prerequisite for smooth and sustainable registration process based on up-to-date information and the XMPP users in mind.
Still, by today this project will likely have more purposes than a good automatic onboarding experience.
Pick the points that help your projects and solutions.

Servers are a key instance in the network and they have many interfaces.
There is not the one thing to solve and to improve.
Let’s make the best out of this project, regardless of how you apply to it. We believe it is a great chance.
Remember, a rising tide lifts all boats.

## Outlook

We plan to expand our API with more measure and more way that you actually can expose the quality of your service, such as up-time and automated ways of confirming existing support.
But the project is nothing without usage. Gajim will soon publish their implementation of a new registration and on-boarding experience. Stay tuned!

If you got interested to list your service you can start with hosting a [generic JSON file](https://providers.xmpp.net/provider-file-generator/) and then create an issue, see section below.

Thank you for reading. We ask you to join this endeavor. Reach us in our support chat below.

- The XMPP Providers Team

## Help Us

For a good user experience, [apps integrating XMPP Providers](https://providers.xmpp.net/apps/) are as important as the providers themselves.
If you are an XMPP developer, please consider [adding XMPP Provider support](https://invent.kde.org/melvo/xmpp-providers#usage) to your app.
If you are an operator of a public XMPP service, provide the [information we need](/faq/#where-do-we-have-the-providers-properties-from) and [add it to our list](https://invent.kde.org/melvo/xmpp-providers/-/blob/master/CONTRIBUTING.md#providers).

Feel free to [reach out to us](/contact/) if you have any questions!

## Spread the Word

The XMPP Providers project lives from the community.
We are happy to hear your feedback!
[Follow us and spread the word](https://fosstodon.org/@xmpp_providers)!

{{< figure src="/images/xmpp-providers-adaptive.svg" caption="XMPP Providers Logo" class="text-center w-100 pt-5" height="300" link="/" >}}

