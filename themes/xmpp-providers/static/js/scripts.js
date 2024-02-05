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
      _filter_providers();
    });
  }
  const filter_server_locations = document.getElementById("filter_server_locations");
  if (filter_server_locations) {
    filter_server_locations.addEventListener("change", _filter_providers)
  }
}

function _filter_providers() {

  function intersection (a, b) {
    const setA = new Set(a);
    return b.filter(value => setA.has(value));
  }

  const freeOfChargeOnly = document.getElementById("filter_free_of_charge").checked
  const professionalHostingOnly = document.getElementById("filter_professional_hosting").checked
  const ratingGreenWebCheckOnly = document.getElementById("filter_rating_green_web_check").checked
  const inBandRegistrationOnly = document.getElementById("filter_in_band_registration").checked
  const passwordResetOnly = document.getElementById("filter_password_reset").checked
  const serverLocationOnly = document.getElementById("filter_server_locations").value

  const allProviders = document.querySelectorAll("[data-provider]")

  let freeOfChargeProviders = []
  if (freeOfChargeOnly) {
    freeOfChargeProviders = document.querySelectorAll(
      "[data-property-free=true]"
    );
  }

  let professionalHostingProviders = []
  if (professionalHostingOnly) {
    professionalHostingProviders = document.querySelectorAll(
      "[data-property-professional-hosting=true]"
    );
  }

  let ratingGreenWebCheckProviders = []
  if (ratingGreenWebCheckOnly) {
    ratingGreenWebCheckProviders = document.querySelectorAll(
      "[data-property-rating-green-web-check=true]"
    );
  }

  let inBandRegistrationProviders = []
  if (inBandRegistrationOnly) {
    inBandRegistrationProviders = document.querySelectorAll(
      "[data-property-ibr=true]"
    );
  }

  let passwordResetProviders = []
  if (passwordResetOnly) {
    passwordResetProviders = document.querySelectorAll(
      "[data-property-password-reset=true]"
    );
  }

  let serverLocationProviders = document.querySelectorAll(
    "[data-property-server-locations]")
  if (serverLocationOnly !== "all") {
    serverLocationProviders = document.querySelectorAll(
      `[data-property-server-locations*="${serverLocationOnly}"]`
    );
  }

  let filteredProviders = Array.from(allProviders)

  if (freeOfChargeOnly) {
    filteredProviders = intersection(filteredProviders, Array.from(freeOfChargeProviders))
  }
  if (professionalHostingOnly) {
    filteredProviders = intersection(filteredProviders, Array.from(professionalHostingProviders))
  }
  if (ratingGreenWebCheckOnly) {
    filteredProviders = intersection(filteredProviders, Array.from(ratingGreenWebCheckProviders))
  }
  if (inBandRegistrationOnly) {
    filteredProviders = intersection(filteredProviders, Array.from(inBandRegistrationProviders))
  }
  if (passwordResetOnly) {
    filteredProviders = intersection(filteredProviders, Array.from(passwordResetProviders))
  }
  if (serverLocationOnly) {
    filteredProviders = intersection(filteredProviders, Array.from(serverLocationProviders))
  }

  for (const provider of allProviders) {
    if (filteredProviders.includes(provider)) {
      provider.hidden = false
    } else {
      provider.hidden = true
    }
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
