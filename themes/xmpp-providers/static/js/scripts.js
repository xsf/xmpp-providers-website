// SPDX-FileCopyrightText: 2022 XMPP Providers Team
//
// SPDX-License-Identifier: AGPL-3.0-or-later

document.addEventListener("DOMContentLoaded", () => {
  initialize_provider_filters();
  initialize_copy_badge_button();
  initialize_contact_page_clients();
  initialize_bootstrap_tooltips();
});

function initialize_provider_filters() {
  // Provider filtering in overview
  const checkboxes = document.querySelectorAll("#status-selector input");
  for (const checkbox of checkboxes) {
    checkbox.addEventListener("click", function (event) {
      _filter_providers(event.target);
    });
  }
}

function _filter_providers(checkbox) {
  const property = checkbox.getAttribute("name");

  const toggle_provider = function(relevant_providers, checked) {
    for (const provider of relevant_providers) {
      provider.hidden = checked
    }
  }

  if (property == "free") {
    const relevant_providers = document.querySelectorAll(
      "[data-property-free=false]"
    );
    toggle_provider(relevant_providers, checkbox.checked)
    return
  }
  if (property == "professional-hosting") {
    const relevant_providers = document.querySelectorAll(
      "[data-property-professional-hosting=false]"
    );
    toggle_provider(relevant_providers, checkbox.checked)
    return
  }
  if (property == "rating-green-web-check") {
    const relevant_providers = document.querySelectorAll(
      "[data-property-rating-green-web-check=false]"
    );
    toggle_provider(relevant_providers, checkbox.checked)
    return
  }
  if (property == "in-band-registration") {
    const relevant_providers = document.querySelectorAll(
      "[data-property-ibr=false]"
    );
    toggle_provider(relevant_providers, checkbox.checked)
    return
  }
  if (property == "password-reset") {
    const relevant_providers = document.querySelectorAll(
      "[data-property-password-reset=false]"
    );
    toggle_provider(relevant_providers, checkbox.checked)
    return
  }
};

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
    const _filter_clients = function (os_name) {
      for (const client of recommended_clients_list.children) {
        client.hidden = os_name != client.getAttribute("data-os");
      }
    };
    if (navigator.userAgent.indexOf("Android") >= 0) {
      _filter_clients("Android");
    } else if (navigator.userAgent.indexOf("Linux") >= 0) {
      _filter_clients("Linux");
    } else if (navigator.userAgent.indexOf("iPhone") >= 0) {
      _filter_clients("iPhone");
    } else {
      _filter_clients("Windows");
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

function get_random_id() {
  return (Math.random() + 1).toString(36).substring(7);
}
