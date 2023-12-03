---
title: Provider File Generator
---

### What is a Provider File

A provider file is a JSON file containing only the provider properties that cannot be retrieved via other methods.
Each provider can supply such a provider file via its web server (replace `<provider>` and `<version>` with the desired values):

```url
https://<provider>/.well-known/provider-v<version>.json
```

Example for a provider file of version **1**:

```url
https://example.org/.well-known/provider-v1.json
```

### Generate a Provider File

If you are an admin of a provider, and you plan to make additional data available to the XMPP Providers project, this generator is for you.

Fill out the form below and click 'Generate' at the bottom to create and download your own Provider File.

{{< provider-file-generator >}}
