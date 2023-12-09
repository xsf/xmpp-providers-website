// SPDX-FileCopyrightText: 2022 XMPP Providers Team
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const providers_data_form_properties = [
  {
    name: "website",
    type: "dictionary-language-website",
    title: "Website",
    dataDescription:
      "Provider website (per language).",
  },
  {
    name: "busFactor",
    type: "integer",
    title: "Bus Factor",
    dataDescription:
      "Minimum number of team members that the service could not survive losing.",
  },
  {
    name: "company",
    type: "boolean",
    title: "Company",
    dataDescription: "Whether the provider is a company.",
  },
  {
    name: "passwordReset",
    type: "dictionary-language-website",
    title: "Password Reset",
    dataDescription:
      "Password reset website (per language). Website should contain infos about automatic password reset (e.g., via email) / web page describing how to manually reset password (e.g., by contacting the provider).",
  },
  {
    name: "maximumHttpFileUploadTotalSize",
    type: "integer",
    title: "Maximum HTTP File Upload Total Size",
    dataDescription:
      "Maximum size of all shared file in total (number in megabytes (MB), 0 for no limit or -1 for less than 1 MB).",
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
    type: "dictionary-language-website",
    title: "Legal Notice",
    dataDescription:
      "Legal notice website (per language).",
  },
  {
    name: "serverLocations",
    type: "list-language-string",
    title: "Server Locations",
    dataDescription: "Countries the service is hosted in.",
  },
  {
    name: "since",
    type: "string-date",
    title: "Since",
    dataDescription: "Date since the XMPP service is available or listed for.",
  },
];

document.addEventListener("DOMContentLoaded", (event) => {
  initialize_provider_filters();
  initialize_copy_badge_button();
  initialize_contact_page_clients();
  initialize_provider_data_form();
  initialize_bootstrap_tooltips();
});

function initialize_provider_filters() {
  // Provider filtering in overview
  const checkboxes = document.querySelectorAll("#status-selector input");
  const show_hide = function (checkbox) {
    const property = checkbox.getAttribute("name");
    if (property == "free") {
      const relevant_providers = document.querySelectorAll(
        "[data-property-free=false]"
      );
      relevant_providers.forEach(function (provider) {
        provider.hidden = checkbox.checked;
      });
    }
    if (property == "professional-hosting") {
      const relevant_providers = document.querySelectorAll(
        "[data-property-professional-hosting=false]"
      );
      relevant_providers.forEach(function (provider) {
        provider.hidden = checkbox.checked;
      });
    }
    if (property == "rating-green-web-check") {
      const relevant_providers = document.querySelectorAll(
        "[data-property-rating-green-web-check=false]"
      );
      relevant_providers.forEach(function (provider) {
        provider.hidden = checkbox.checked;
      });
    }
    if (property == "in-band-registration") {
      const relevant_providers = document.querySelectorAll(
        "[data-property-ibr=false]"
      );
      relevant_providers.forEach(function (provider) {
        provider.hidden = checkbox.checked;
      });
    }
    if (property == "password-reset") {
      const relevant_providers = document.querySelectorAll(
        "[data-property-password-reset=false]"
      );
      relevant_providers.forEach(function (provider) {
        provider.hidden = checkbox.checked;
      });
    }
    checkbox.addEventListener("click", function (event) {
      show_hide(event.target);
    });
  };
  checkboxes.forEach(show_hide);
}

function initialize_copy_badge_button() {
  // Copy badge embed link to clipboard
  const badge_link_copy = document.getElementById("badge_link_copy");
  if (badge_link_copy) {
    badge_link_copy.addEventListener("click", function () {
      navigator.clipboard.writeText(
        document.getElementById("badge_link_input").value
      );

      // Notifications
      const copy_toast = document.getElementById("copy_toast");
      const toast_alert = bootstrap.Toast.getOrCreateInstance(copy_toast);
      toast_alert.show();
      const tooltip = bootstrap.Tooltip.getInstance("#badge_link_copy");
      tooltip.hide();
    });
  }
}

function initialize_contact_page_clients() {
  // Recommended clients list filtering on /contact page
  const recommended_clients_list = document.getElementById(
    "recommended_clients_list"
  );
  if (recommended_clients_list) {
    const filter_clients = function (os_name) {
      for (const client of recommended_clients_list.children) {
        client.hidden = os_name != client.getAttribute("data-os");
      }
    };
    if (navigator.userAgent.indexOf("Android") >= 0) {
      filter_clients("Android");
    } else if (navigator.userAgent.indexOf("Linux") >= 0) {
      filter_clients("Linux");
    } else if (navigator.userAgent.indexOf("iPhone") >= 0) {
      filter_clients("iPhone");
    } else {
      filter_clients("Windows");
    }
  }
}

function initialize_bootstrap_tooltips() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}

function _get_random_id() {
  return (Math.random() + 1).toString(36).substring(7);
}

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
  const country_select_id = _get_random_id();
  country_label.htmlFor = `property-country-${property_name}-${country_select_id}`;
  country_label.classList.add("form-label");
  country_label.innerHTML = "Country";

  const country_select = document.createElement("select");
  country_select.id = `property-country-${property_name}-${country_select_id}`;
  country_select.classList.add("form-select", "form-select-sm");
  country_select.required = true

  const default_option = document.createElement("option");
  default_option.value = "placeholder";
  default_option.text = "Choose Country...";
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
  const random_id = _get_random_id();
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
  const language_select_id = _get_random_id();
  language_label.htmlFor = `property-language-${property_name}-${language_select_id}`;
  language_label.classList.add("form-label");
  language_label.innerHTML = "Language";

  const language_select = document.createElement("select");
  language_select.id = `property-language-${property_name}-${language_select_id}`;
  language_select.classList.add("form-select", "form-select-sm");
  language_select.required = true

  const default_option = document.createElement("option");
  default_option.value = "placeholder";
  default_option.text = "Choose Language...";
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
  const website_input_id = _get_random_id();
  website_label.htmlFor = `property-website-${property_name}-${website_input_id}`;
  website_label.classList.add("form-label");
  website_label.innerHTML = "Website";

  const website_input = document.createElement("input");
  website_input.id = `property-website-${property_name}-${website_input_id}`;
  website_input.classList.add("form-control", "form-control-sm");
  website_input.placeholder = "For example: https://example.org/page";
  website_input.type = "url";
  website_input.pattern = "https://.*";
  website_input.required = true

  website_col.append(website_label);
  website_col.append(website_input);
  input_row.append(website_col);

  const remove_button_col = document.createElement("div");
  remove_button_col.classList.add("col-1");
  const remove_button = document.createElement("button");
  const random_id = _get_random_id();
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
  let button_id = null

  if (event.srcElement.tagName === "BUTTON") {
    button_id = event.srcElement.id;
  } else {
    button_id = event.srcElement.parentElement.id
  }

  const tooltip = bootstrap.Tooltip.getInstance(`#${button_id}`);
  if (tooltip) {
    tooltip.dispose();
  }

  const row = event.srcElement.closest(".row");
  row.remove();
}

function save_as_json(filename, data) {
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

  for (const property of providers_data_form_properties) {
    if (property.type === "dictionary-language-website") {
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

      generated_properties_dict[property.name] = {};
      generated_properties_dict[property.name]["content"] = entries;
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

      generated_properties_dict[property.name] = {};
      generated_properties_dict[property.name]["content"] = entries;
      continue;
    }

    const element = document.getElementById(`property-${property.name}`);

    if (property.type === "boolean") {
      generated_properties_dict[property.name] = {
        content: element.checked,
      };
      continue;
    }

    if (property.type === "integer") {
      generated_properties_dict[property.name] = {
        content: Number(element.value),
      };
      continue;
    }

    generated_properties_dict[property.name] = {
      content: element.value,
    };
  }

  save_as_json("provider-v1.json", generated_properties_dict);
}

function initialize_provider_data_form() {
  const container = document.getElementById(
    "provider_file_generator_container"
  );

  for (const property of providers_data_form_properties) {
    const card = document.createElement("div")
    card.classList.add("card", "mb-3")

    const card_header = document.createElement("div")
    card_header.classList.add("card-header")
    const heading = document.createElement("b")
    heading.innerHTML = property.title
    card_header.append(heading)
    card.append(card_header)

    const card_body = document.createElement("div")
    card_body.classList.add("card-body")
    card.append(card_body)

    container.append(card)

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
      input.value = -1

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
      _add_country_entry(property.name)

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

    if (property.type === "dictionary-language-website") {
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
