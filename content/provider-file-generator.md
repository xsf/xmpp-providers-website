---
title: Provider File Generator
provider_file_generator: true
---

### What is a Provider File

A provider file is a JSON file containing only the provider properties that cannot be retrieved via other methods.

Each provider can supply such a provider file via its web server (replace `<provider>` and `<version>` with the desired values):

```url
https://<provider>/.well-known/xmpp-provider-v<version>.json
```

Example for a provider file of version **2**:

```url
https://example.org/.well-known/xmpp-provider-v2.json
```

### Generate a Provider File

If you are an admin of a provider, and you plan to make additional data available to the XMPP Providers project, this generator is for you.
Fill out the form below and click **Generate Provider File** at the bottom to create and download your own provider file.
Don't hesitate to [contact us](/contact/) if there are any problems.

Please keep each provider file for the duration specified in the following table:

{{< table table_class="table table-hover table-sm" >}}
Version | Duration
---|---
v2 | No end date yet
{{</ table >}}

{{< provider-file-generator >}}
