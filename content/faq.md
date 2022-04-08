---
title: FAQ
---

# Frequently Asked Questions

## Why do we collect and categorize providers?

When we tried to onboard users in the past, there were different but similar bad stories:
We usually did not know if we suggested the best provider to that person.
After a couple of registration attempts, we found out that the provider did not provide registrations via the user's app.

So, we switched to another one we recalled to be a *good* one for previous registrations.
The registration was finally successful but the user told us that some functionalities did not work.
After some hours of investigation, we found out that the provider did simply not support all features the user's app supported.

There were similar situations each time we wanted to help people using XMPP.
Thus, we decided to collect all data we could find about several providers.
We categorized them to quickly find providers with properties users would expect nowadays.

XMPP Providers is a project made to simplify the users' onboardings.
Therefore, the criteria we use for the categorization are from a user's perspective.
We evaluated all of them with an ordinary user without XMPP experience in mind.
That should help more people to find their way to free communication via XMPP.

## How are categories determined?

The category of a provider is determined by its properties.
Those properties must be verifiable.

In case of the compliance or security ratings, that means that there have to be results for the providers.
The account registration via an app has to work without complications.
For properties such as the web registration or the website language versions, there must be links.
And there have to be statements e.g. about the service price or the support channels on the provider's website.

If properties are not verifiable, they are seen as not available which often results in a bad category.
Verifiable properties must meet specific criteria we decided on for a good user experience.

The criteria are used to answer different questions.
Here are some of them:
Does the provider have good security settings?
Does it support all common features of modern XMPP apps?
Does it allow to share files up to a specific limit?

If a provider meets all criteria of a category, it is part of the providers in that category.

## In which categories can providers be?

Here are all categories from best to worst.

### Category A

Providers in this category can be used for a registration without user interaction.
Users can simply confirm to register on a randomly chosen provider and start to chat right away.
Those providers must have the best properties and support registrations via XMPP apps.

### Category B

Providers in this category can be used for registration with user interaction.
Users can select a provider based on individual preferences (e.g., the provider's name).
Those providers must have the best properties but do only need to support registrations via a web page.

### Category C

Providers in this category can be used for web registrations but do only need to have average properties.
Those providers should only be offered to users if there is a certain reason for it.

### Category D

Providers in this category cannot, if no registration is supported, or should not, because of bad properties, be used for registrations.
Those providers should only be used for autocomplete (e.g., while adding a contact).

{{< spacer size="middle" >}}

## Glossary

Unfamiliar terms are explained here.

#### Bus Factor

The term _bus factor_ describes the minimum number of people that have to leave before the provider becomes inoperable.

#### Client to Server

The Client to Server (C2S) connection is used for communication between your app and your provider’s server.

#### HTTP Upload

{{< external-link text="XEP-0363 HTTP File Upload" url="https://xmpp.org/extensions/xep-0363.html" >}} is a standard for transferring files between you and others.

#### In Band Registration

{{< external-link text="XEP-0077 In Band Registration" url="https://xmpp.org/extensions/xep-0077.html" >}} (IBR) allows you to register with a provider directly from your app.

#### Server to Server

Server to Server (S2S) connections are used for communication between your provider’s server and servers of your contacts for example.
