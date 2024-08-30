---
title: Frequently Asked Questions (FAQ)
---

{{< toc >}}

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
Verifiable properties must meet specific [criteria](https://invent.kde.org/melvo/xmpp-providers#criteria) we decided on for a good user experience.

The criteria are used to answer different questions.
Here are some of them:
Does the provider have good security settings?
Does it support all common features of modern XMPP apps?
Does it allow to share files up to a specific limit?

If a provider meets all criteria of a category, it is part of the providers in that category.

## In which categories can providers be?

Here are all categories from best to worst.
If you want to integrate XMPP Providers in your app, have a look at the [category details](https://invent.kde.org/melvo/xmpp-providers#categories).

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

Each property is retrieved by one of the following methods:
* A rating service's HTTP server is requested to gather a provider's rating.
* A provider's [XMPP server is requested](#how-can-server-operators-provide-properties-via-xmpp) to gather data specified by an [XMPP Extension Procotol (XEP)](https://xmpp.org/extensions/).
* A provider's [HTTP server is requested](#how-can-server-operators-provide-properties-via-http) to gather data via a [provider file](#provider-file).

Those methods define a property's source.
A source is needed for transparency and maintainability of the data.

Furthermore, several properties are updated automatically on a daily basis.
E.g., our web bot retrieves ratings from rating services and a provider file from a provider's web server while our XMPP bot retrieves registration support and upload limits from a providers' XMPP server.
The specific update methods for both [basic information](https://invent.kde.org/melvo/xmpp-providers/-/tree/master#basic-information) and [criteria](https://invent.kde.org/melvo/xmpp-providers/-/tree/master#criteria) are denoted in the *Automatic Updates* column.

All sources are stored in the [providers file](https://invent.kde.org/melvo/xmpp-providers/-/blob/master/providers.json).
That file is the data source of all provider properties.
This website's provider listings and details are based on it.

## How can server operators provide properties via XMPP?

Our XMPP bot requests many properties via XMPP from the providers' servers.
Here are some hints on how to configure the server to provide the properties.

### Account Creation via XMPP Apps

For determining whether a server supports the creation of accounts via XMPP apps, [XEP-0077: In-Band Registration](https://xmpp.org/extensions/xep-0077.html) is used.

Please enable that feature to simplify the onboarding process for new users:
* ejabberd: [mod_register](https://docs.ejabberd.im/admin/configuration/modules/#mod-register)
* Prosody: [mod_register_ibr](https://prosody.im/doc/modules/mod_register_ibr)
* Tigase: [jabber:iq:register](https://docs.tigase.net/en/latest/Tigase_Administration/Configuration/_Configuration.html#session-manager)

### Account Creation via Web Page

For retrieving a web page that can be used to create accounts, [XEP-0077: In-Band Registration - Redirection](https://xmpp.org/extensions/xep-0077.html#redirect) is used.

Please use that feature to either provide an alternative way for users to create an account or if your server does not support account creation via XMPP apps:
* ejabberd: [mod_register](https://docs.ejabberd.im/admin/configuration/modules/#mod-register) - `redirect_url`
* Prosody: [mod_register_oob_url](https://modules.prosody.im/mod_register_oob_url.html) - `register_oob_url`
* Tigase: [jabber:iq:register](https://docs.tigase.net/en/latest/Tigase_Administration/Configuration/_Configuration.html#session-manager)

### Server Software

For determining which software (including its version) a server runs, [XEP-0092: Software Version](https://xmpp.org/extensions/xep-0092.html) is used.

Please enable that feature for checking whether your server runs the software desired by the user and whether it is up-to-date:
* ejabberd: [mod_version](https://docs.ejabberd.im/admin/configuration/modules/#mod-version)
* Prosody: [mod_version](https://prosody.im/doc/modules/mod_version)
* Tigase: [jabber:iq:version](https://docs.tigase.net/en/latest/Tigase_Administration/Configuration/_Configuration.html#session-manager)

### Support Addresses

For retrieving the support addresses of a provider, [XEP-0157: Contact Addresses for XMPP Services](https://xmpp.org/extensions/xep-0157.html) is used.

Please provide those addresses to enable users and our upcoming support bots to reach you (**Important: Append `?join` to group chat addresses**):
* ejabberd: [mod_disco](https://docs.ejabberd.im/admin/configuration/modules/#mod-disco) - `server_info`, entry with `name: support-addresses`
* Prosody: [mod_server_contact_info](https://prosody.im/doc/modules/mod_server_contact_info) - `support`
* Tigase: [disco-extensions](https://docs.tigase.net/en/latest/Tigase_Administration/Configuration/_Configuration.html#abuse-contacts) - `support-addresses`

### Upload Limits and Storage Durations

For determining how much users can upload to a server and how long those files are stored, [XEP-0363: HTTP File Upload - Discovering Support](https://xmpp.org/extensions/xep-0363.html#disco) is used.

Please set those limits as high as possible to enable users to share large files (such as videos) over a long period of time (e.g., if the recipient is offline on vacation):
* ejabberd:
    * [mod_http_upload](https://docs.ejabberd.im/admin/configuration/modules/#mod-http-upload) - `max_size`
    * [mod_http_upload_quota](https://docs.ejabberd.im/admin/configuration/modules/#mod-http-upload-quota) - `access_hard_quota`, `access_soft_quota`, `max_days`
* Prosody: [mod_http_file_share](https://prosody.im/doc/modules/mod_http_file_share) - `http_file_share_size_limit`, `http_file_share_daily_quota`, `http_file_share_expires_after`
* Tigase: [HTTP File Upload component](https://docs.tigase.net/projects/tigase-tigase-http-api/en/latest/Administration/HTTP_File_Upload_component.html#logic) - `max-file-size`

## How can server operators provide properties via HTTP?

Our web bot requests several properties via HTTP from the providers' servers.
For that purpose, a [provider file](#provider-file) is used.

{{< spacer size="middle" >}}

## Glossary

Unfamiliar terms are explained here.

### Bus Factor

The term [bus factor](https://en.wikipedia.org/wiki/Bus_factor) describes the minimum number of team members that the service could not survive losing.

### Client-to-Server

The *client-to-server (C2S)* connection is used for the communication between your app and your provider.

### Green Hosting

[thegreenwebfoundation.org](https://www.thegreenwebfoundation.org/) offers a [Green Web Check](https://www.thegreenwebfoundation.org/green-web-check/) which enables you to check if your provider's servers run on green energy. Please note that we use the provider's XMPP host for checking, which might differ from the provider's public internet address.

### HTTP Upload

[XEP-0363 HTTP File Upload](https://xmpp.org/extensions/xep-0363.html) is a standard for sharing files between you and others.

### Professional Hosting

A provider's service is seen as *professionally hosted* if it has a good internet connection speed, an uninterruptible power supply, access protection and regular backups.
That is usually the case if the service is hosted in a data center.

### Provider File

A provider file is a JSON file containing only the provider properties that cannot be retrieved via other methods.
Each provider can [generate a provider file](/provider-file-generator/) and supply it via its web server.

### Server-to-Server

*Server-to-server (S2S)* connections are used for the communication between your provider and the provider of your contact.

### Storage

Servers usually store messages via [XEP-0313: Message Archive Management](https://xmpp.org/extensions/xep-0313.html).
That is needed to deliver messages that are sent while the recipient is offline.
In addition, users can retrieve old messages (excluding [OMEMO](https://xmpp.org/extensions/xep-0384.html) messages) that are not locally stored from the server.
Messages are stored for a maxmimum duration the server defines.
But users can disable it completely if the server supports [XEP-0441: Message Archive Management Preferences](https://xmpp.org/extensions/xep-0441.html).

Files are mostly stored on the server as well.
That is done to avoid aborts while transferring a file if the recipient has connection problems.
But it is also needed in order to share a file while the recipient is offline.
That way, the recipient can download the file after coming online.
Furthermore, it enables the recipient to decide when to download the file.

### Unknown

A property is called *unknown* if no [source](#where-do-we-have-the-providers-properties-from) is available.
