---
title: Frequently Asked Questions (FAQ)
---

## Why do we collect and categorize providers?

When we tried to onboard users in the past, there were different but similar bad stories:
We usually did not know if we suggested the best provider to that person.
After a couple of registration attempts, we found out that the provider did not provide registrations via the user's app.

So, we switched to another one we recalled to be a *good* one for previous registrations.
The registration was finally successful but the user told us that some functionalities did not work.
After some hours of investigation, we found out that the provider did simply not support all features the user's app supported.

There were similar situations each time we wanted to help people using XMPP.
Thus, we decided to collect all data we could find about several providers.
We [categorized](#how-are-categories-determined) them to quickly find providers with properties users would expect nowadays.

XMPP Providers is a project made to simplify the users' onboardings.
Therefore, the criteria we use for the categorization are from a user's perspective.
We evaluated all of them with an ordinary user without XMPP experience in mind.
That should help more people to find their way to free communication via XMPP.

## How are categories determined?

The category of a provider is determined by its properties.
Those properties must be verifiable.

In case of the compatibility or security ratings, that means that there have to be results for the providers.
The account registration via an app has to work without complications.
For properties such as the web registration or the website language alternatives, there must be links.
And there have to be statements e.g. about the service price or the support channels on the provider's website.

If properties are not verifiable, they are seen as not available which often results in a bad [category](#in-which-categories-can-providers-be).
Verifiable properties must meet specific {{< external-link text="criteria" url="https://invent.kde.org/melvo/xmpp-providers#criteria" >}} we decided on for a good user experience.

The criteria are used to answer different questions.
Here are some of them:
Does the provider have good security settings?
Does it support all common features of modern XMPP apps?
Does it allow to share files up to a specific limit?

If a provider meets all criteria of a category, it is part of the providers in that category.

## In which categories can providers be?

Here are all categories from best to worst.
If you want to integrate XMPP Providers in your app, have a look at the {{< external-link text="category details" url="https://invent.kde.org/melvo/xmpp-providers#categories" >}}.

{{< category-heading category="A" >}}

Providers in this category can be used for registrations without user interaction.
Users can simply confirm to register on a randomly chosen provider and start to chat right away.
Those providers must have the best properties.
They have to support registrations via XMPP apps and be free of charge.

{{< category-heading category="B" >}}

Providers in this category can be used for registrations with user interaction.
Users can select a provider based on individual preferences (e.g., the provider's name).
Those providers must have the best properties.
But they only need to support registrations via a web page and their service does not need to be free of charge.

{{< category-heading category="C" >}}

Providers in this category can be used for registrations with user interaction but provide only average properties.
Those providers should only be offered to users if there is a certain reason for it.

{{< category-heading category="D" >}}

Providers in this category cannot, if no registration is supported, or should not, because of bad properties, be used for registrations.
Those providers should only be used for autocomplete (e.g., while adding a contact).

## Where do we have the providers' properties from?

For each property, there must be a corresponding source.
That is needed for transparency and maintainability of the data.
In most cases, that is a statement on a provider's website or the result page of a rating service.
The source of a property can also be the property itself.
That is the case when the property is a web page (e.g., a web registration page).

All sources are stored in the {{< external-link text="providers file" url="https://invent.kde.org/melvo/xmpp-providers/-/blob/master/providers.json" >}}.
That file is the data source of all provider properties.
This website's provider listings and details are based on it.

{{< spacer size="middle" >}}

## Glossary

Unfamiliar terms are explained here.

### Unknown

A property is called *unknown* if no [source](#where-do-we-have-the-providers-properties-from) is available.

### Bus Factor

The term *bus factor* describes the minimum number of people that have to leave before the provider becomes inoperable.

### Client-to-Server

The client-to-server (C2S) connection is used for the communication between your app and your provider.

### HTTP Upload

{{< external-link text="XEP-0363 HTTP File Upload" url="https://xmpp.org/extensions/xep-0363.html" >}} is a standard for sharing files between you and others.

### Server to Server

Server-to-server (S2S) connections are used for the communication between your provider and the provider of your contact.
