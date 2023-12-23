// SPDX-FileCopyrightText: 2023 XMPP Providers Team
//
// SPDX-License-Identifier: AGPL-3.0-or-later

document.addEventListener("DOMContentLoaded", () => {
  _initialize_provider_api_version_select();
  _initialize_provider_data_form();
});

const api_versions = ["v1"];

const providers_data_form_properties_v1 = [
  {
    name: "website",
    type: "dictionary-language-web-page",
    title: "Website",
    dataDescription: "Provider website (per language).",
  },
  {
    name: "busFactor",
    type: "integer",
    title: "Bus Factor",
    dataDescription:
      "Bus factor of the XMPP service (i.e., the minimum number of team members that the service could not survive losing) or -1 for n/a.",
  },
  {
    name: "company",
    type: "boolean",
    title: "Company",
    dataDescription: "Whether the provider is a company.",
  },
  {
    name: "passwordReset",
    type: "dictionary-language-web-page",
    title: "Password Reset",
    dataDescription:
      "Password reset web page (per language) used for an automatic password reset (e.g., via email) or describing how to manually reset a password (e.g., by contacting the provider).",
  },
  {
    name: "maximumHttpFileUploadTotalSize",
    type: "integer",
    title: "Maximum HTTP File Upload Total Size",
    dataDescription:
      "Maximum size of all shared files in total per user (number in megabytes (MB), 0 for no limit or -1 for less than 1 MB). Attention: MB is used instead of MiB (i.e., 104,857,600 bytes = 100 MiB ≈ 104 MB). This property is not about the maximum size of each shared file which is already retrieved via XMPP.",
  },
  {
    name: "maximumHttpFileUploadStorageTime",
    type: "integer",
    title: "Maximum HTTP File Upload Storage Time",
    dataDescription:
      "Maximum storage duration of each shared file (number in days, 0 for no limit or -1 for less than 1 day).",
  },
  {
    name: "maximumMessageArchiveManagementStorageTime",
    type: "integer",
    title: "Maximum Message Archive Management Storage Time",
    dataDescription:
      "Maximum storage duration of each exchanged message (number in days, 0 for no limit or -1 for less than 1 day).",
  },
  {
    name: "professionalHosting",
    type: "boolean",
    title: "Professional Hosting",
    dataDescription:
      "Whether the XMPP server is hosted with good internet connection speed, uninterruptible power supply, access protection and regular backups.",
  },
  {
    name: "freeOfCharge",
    type: "boolean",
    title: "Free of Charge",
    dataDescription: "Whether the XMPP service can be used for free.",
  },
  {
    name: "legalNotice",
    type: "dictionary-language-web-page",
    title: "Legal Notice",
    dataDescription: "Legal notice web page (per language).",
  },
  {
    name: "serverLocations",
    type: "list-language-string",
    title: "Server Locations",
    dataDescription: "Server/Backup locations.",
  },
  {
    name: "since",
    type: "string-date",
    title: "Since",
    dataDescription: "Date since the XMPP service is available.",
  },
];

function _on_add_language_entry_clicked(event) {
  _add_language_entry(event.srcElement.dataset.property);
}

function _on_add_country_entry_clicked(event) {
  _add_country_entry(event.srcElement.dataset.property);
}

function _add_country_entry(property_name) {
  const input_row = document.createElement("div");
  input_row.classList.add("row", "g-2", "align-items-end", "mb-3");

  const country_col = document.createElement("div");
  country_col.classList.add("col-6");

  const country_label = document.createElement("label");
  const country_select_id = get_random_id();
  country_label.htmlFor = `property-country-${property_name}-${country_select_id}`;
  country_label.classList.add("form-label");
  country_label.innerHTML = "Country";

  const country_select = document.createElement("select");
  country_select.id = `property-country-${property_name}-${country_select_id}`;
  country_select.classList.add("form-select", "form-select-sm");
  country_select.required = true;

  const default_option = document.createElement("option");
  default_option.value = "placeholder";
  default_option.text = "Choose...";
  country_select.append(default_option);

  for (const country in country_codes) {
    const option = document.createElement("option");
    option.value = country_codes[country];
    option.text = country;
    country_select.append(option);
  }

  country_col.append(country_label);
  country_col.append(country_select);
  input_row.append(country_col);

  const remove_button_col = document.createElement("div");
  remove_button_col.classList.add("col-1");
  const remove_button = document.createElement("button");
  const random_id = get_random_id();
  remove_button.id = `remove_button_${random_id}`;
  remove_button.classList.add("btn", "btn-sm", "btn-secondary");
  remove_button.title = "Remove Entry";
  remove_button.setAttribute("data-bs-toggle", "tooltip");
  remove_button.addEventListener("click", _remove_language_entry);
  const remove_button_icon = document.createElement("i");
  remove_button_icon.classList.add("fa-solid", "fa-trash");
  remove_button.append(remove_button_icon);
  remove_button_col.append(remove_button);
  input_row.append(remove_button_col);

  const container = document.getElementById(`container-${property_name}`);
  const add_entry_row = document.getElementById(
    `add-entry-row-${property_name}`
  );
  container.insertBefore(input_row, add_entry_row);

  initialize_bootstrap_tooltips();
}

function _add_language_entry(property_name) {
  const input_row = document.createElement("div");
  input_row.classList.add("row", "g-2", "align-items-end", "mb-3");

  const language_col = document.createElement("div");
  language_col.classList.add("col-4");

  const language_label = document.createElement("label");
  const language_select_id = get_random_id();
  language_label.htmlFor = `property-language-${property_name}-${language_select_id}`;
  language_label.classList.add("form-label");
  language_label.innerHTML = "Language";

  const language_select = document.createElement("select");
  language_select.id = `property-language-${property_name}-${language_select_id}`;
  language_select.classList.add("form-select", "form-select-sm");
  language_select.required = true;

  const default_option = document.createElement("option");
  default_option.value = "placeholder";
  default_option.text = "Choose...";
  language_select.append(default_option);

  for (const language of language_codes) {
    const option = document.createElement("option");
    option.value = language.code;
    option.text = language.name;
    language_select.append(option);
  }

  language_col.append(language_label);
  language_col.append(language_select);
  input_row.append(language_col);

  const website_col = document.createElement("div");
  website_col.classList.add("col-7");

  const website_label = document.createElement("label");
  const website_input_id = get_random_id();
  website_label.htmlFor = `property-website-${property_name}-${website_input_id}`;
  website_label.classList.add("form-label");
  website_label.innerHTML = "Website";

  const website_input = document.createElement("input");
  website_input.id = `property-website-${property_name}-${website_input_id}`;
  website_input.classList.add("form-control", "form-control-sm");
  website_input.placeholder = "https://example.org/page";
  website_input.type = "url";
  website_input.pattern = "https://.*";
  website_input.required = true;

  website_col.append(website_label);
  website_col.append(website_input);
  input_row.append(website_col);

  const remove_button_col = document.createElement("div");
  remove_button_col.classList.add("col-1");
  const remove_button = document.createElement("button");
  const random_id = get_random_id();
  remove_button.id = `remove_button_${random_id}`;
  remove_button.classList.add("btn", "btn-sm", "btn-secondary");
  remove_button.title = "Remove Entry";
  remove_button.setAttribute("data-bs-toggle", "tooltip");
  remove_button.addEventListener("click", _remove_language_entry);
  const remove_button_icon = document.createElement("i");
  remove_button_icon.classList.add("fa-solid", "fa-trash");
  remove_button.append(remove_button_icon);
  remove_button_col.append(remove_button);
  input_row.append(remove_button_col);

  const container = document.getElementById(`container-${property_name}`);
  const add_entry_row = document.getElementById(
    `add-entry-row-${property_name}`
  );
  container.insertBefore(input_row, add_entry_row);

  initialize_bootstrap_tooltips();
}

function _remove_language_entry(event) {
  let button_id = null;

  if (event.srcElement.tagName === "BUTTON") {
    button_id = event.srcElement.id;
  } else {
    button_id = event.srcElement.parentElement.id;
  }

  const tooltip = bootstrap.Tooltip.getInstance(`#${button_id}`);
  if (tooltip) {
    tooltip.dispose();
  }

  const row = event.srcElement.closest(".row");
  row.remove();
}

function _save_as_json(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, "\t")], {
    type: "application/json",
  });
  const link = document.createElement("a");

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = [
    "application/json",
    link.download,
    link.href,
  ].join(":");

  const evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  link.dispatchEvent(evt);
  link.remove();
}

function _on_generate_json_file_clicked() {
  let generated_properties_dict = {};

  const selected_api_version =
    document.getElementById("api_version_select").value;
  let properties_list = undefined;
  if (selected_api_version === "v1") {
    properties_list = providers_data_form_properties_v1;
  }

  for (const property of properties_list) {
    if (property.type === "dictionary-language-web-page") {
      const container = document.getElementById(`container-${property.name}`);
      const entry_rows = container.querySelectorAll(
        `.row:not(#add-entry-row-${property.name})`
      );

      let entries = {};
      for (const row of entry_rows) {
        const language_code = row.querySelector("select").value;
        const website = row.querySelector("input").value;
        if (language_code != "placeholder" && website != "") {
          entries[language_code] = website;
        }
      }

      generated_properties_dict[property.name] = entries;
      continue;
    }

    if (property.type === "list-language-string") {
      const container = document.getElementById(`container-${property.name}`);
      const entry_rows = container.querySelectorAll(
        `.row:not(#add-entry-row-${property.name})`
      );

      let entries = [];
      for (const row of entry_rows) {
        const country_code = row.querySelector("select").value;
        if (country_code != "placeholder") {
          entries.push(country_code.toLowerCase());
        }
      }

      generated_properties_dict[property.name] = entries;
      continue;
    }

    const element = document.getElementById(`property-${property.name}`);

    if (property.type === "boolean") {
      generated_properties_dict[property.name] = element.checked;
      continue;
    }

    if (property.type === "integer") {
      generated_properties_dict[property.name] = Number(element.value);
      continue;
    }

    generated_properties_dict[property.name] = element.value;
  }

  _save_as_json(
    `xmpp-provider-${selected_api_version}.json`,
    generated_properties_dict
  );
}

function _on_api_version_changed() {
  _initialize_provider_data_form();
}
function _initialize_provider_api_version_select() {
  const container = document.getElementById(
    "provider_api_version_select_container"
  );

  const api_select_row = document.createElement("div");
  api_select_row.classList.add("row", "pb-4");

  const api_select_col = document.createElement("div");
  api_select_col.classList.add(
    "col-4",
    "mx-auto",
    "p-3",
    "rounded",
    "border",
    "shadow-sm",
    "bg-body-tertiary"
  );
  api_select_row.append(api_select_col);

  const api_select_label = document.createElement("label");
  api_select_label.htmlFor = "api_version_select";
  api_select_label.classList.add("form-label");
  api_select_label.innerHTML = "API Version";
  api_select_col.append(api_select_label);

  const api_select = document.createElement("select");
  api_select.id = "api_version_select";
  api_select.classList.add("form-select");
  api_select.addEventListener("change", _on_api_version_changed);
  api_select_col.append(api_select);

  for (const api_version of api_versions) {
    const option = document.createElement("option");
    option.label = api_version;
    option.value = api_version;
    api_select.append(option);
  }
  container.append(api_select_row);
}

function _initialize_provider_data_form() {
  const container = document.getElementById("provider_file_form_container");
  container.innerHTML = "";

  const selected_api_version =
    document.getElementById("api_version_select").value;
  let properties_list = undefined;
  if (selected_api_version === "v1") {
    properties_list = providers_data_form_properties_v1;
  }

  for (const property of properties_list) {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");

    const card_header = document.createElement("div");
    card_header.classList.add("card-header");
    const heading = document.createElement("b");
    heading.innerHTML = property.title;
    card_header.append(heading);
    card.append(card_header);

    const card_body = document.createElement("div");
    card_body.classList.add("card-body");
    card.append(card_body);

    container.append(card);

    const property_name = document.createElement("code");
    property_name.innerHTML = property.name;
    card_body.append(property_name);

    const data_description = document.createElement("p");
    data_description.classList.add("text-muted", "small");
    data_description.innerHTML = property.dataDescription;
    card_body.append(data_description);

    const outer_div = document.createElement("div");
    outer_div.id = `container-${property.name}`;
    card_body.append(outer_div);

    if (property.type === "boolean") {
      const div = document.createElement("div");
      div.classList.add("form-check", "form-switch");

      const label = document.createElement("label");
      label.htmlFor = `property-${property.name}`;
      label.classList.add("form-check-label");

      if (property.name === "professionalHosting") {
        label.innerHTML = `Provider offers ${property.title.toLocaleLowerCase()}`;
      } else {
        label.innerHTML = `Provider is ${property.title.toLowerCase()}`;
      }

      const input = document.createElement("input");
      input.id = `property-${property.name}`;
      input.classList.add("form-check-input");
      input.type = "checkbox";
      input.role = "switch";

      div.append(label);
      div.append(input);
      outer_div.append(div);
    }

    if (property.type === "integer") {
      const label = document.createElement("label");
      label.htmlFor = `property-${property.name}`;
      label.classList.add("form-label");
      label.innerHTML = "Number";

      const input = document.createElement("input");
      input.id = `property-${property.name}`;
      input.classList.add("form-control");
      input.type = "number";
      input.min = -1;
      input.value = -1;

      outer_div.append(label);
      outer_div.append(input);
    }

    if (property.type === "string-date") {
      const label = document.createElement("label");
      label.htmlFor = `property-${property.name}`;
      label.classList.add("form-label");
      label.innerHTML = "Date";

      const input = document.createElement("input");
      input.id = `property-${property.name}`;
      input.classList.add("form-control");
      input.type = "date";

      outer_div.append(label);
      outer_div.append(input);
    }

    if (property.type === "list-language-string") {
      _add_country_entry(property.name);

      // "Add Entry" button
      const button_row = document.createElement("div");
      button_row.classList.add("row", "mt-3");
      button_row.id = `add-entry-row-${property.name}`;

      const button_col = document.createElement("div");
      button_col.classList.add("col");

      const add_button = document.createElement("button");
      add_button.classList.add("btn", "btn-sm", "btn-secondary");
      add_button.innerHTML = "Add Entry";
      add_button.dataset.property = property.name;
      add_button.addEventListener("click", _on_add_country_entry_clicked);

      button_col.append(add_button);
      button_row.append(button_col);

      outer_div.append(button_row);
    }

    if (property.type === "dictionary-language-web-page") {
      _add_language_entry(property.name);

      // "Add Entry" button
      const button_row = document.createElement("div");
      button_row.classList.add("row", "mt-3");
      button_row.id = `add-entry-row-${property.name}`;

      const button_col = document.createElement("div");
      button_col.classList.add("col");

      const add_button = document.createElement("button");
      add_button.classList.add("btn", "btn-sm", "btn-secondary");
      add_button.innerHTML = "Add Entry";
      add_button.dataset.property = property.name;
      add_button.addEventListener("click", _on_add_language_entry_clicked);

      button_col.append(add_button);
      button_row.append(button_col);

      outer_div.append(button_row);
    }
  }

  const generate_button = document.createElement("button");
  generate_button.innerHTML = "Generate Provider File";
  generate_button.classList.add("btn", "btn-primary");
  generate_button.addEventListener("click", _on_generate_json_file_clicked);
  container.append(generate_button);
}
