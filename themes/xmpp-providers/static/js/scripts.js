// SPDX-FileCopyrightText: 2022 XMPP Providers Team
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const urlParams = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname == "/") {
    initProviderFilters();
  }
  initCopyBadgeButton();
  initContactPageClients();
  initBootstrapTooltips();
});

function initProviderFilters() {
  // Provider filtering in overview
  const checkboxes = document.querySelectorAll("#status-selector input");
  for (const checkbox of checkboxes) {
    const filterId = checkbox.id.split("filter_")[1];
    const filterValue = urlParams.get(filterId);
    checkbox.checked = filterValue === "true" ? true : false;
    checkbox.addEventListener("click", () => {
      urlParams.set(filterId, checkbox.checked);
      history.pushState(
        null,
        "",
        `${window.location.pathname}?${urlParams.toString()}`
      );
      filterProviders();
    });
  }
  const filterServerLocations = document.getElementById(
    "filter_server_locations"
  );
  filterServerLocations.value = urlParams.get("server_location") ?? "all";
  filterServerLocations.addEventListener("change", () => {
    urlParams.set("server_location", filterServerLocations.value);
    history.pushState(
      null,
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
    filterProviders();
  });
  const filterBusFactor = document.getElementById("filter_bus_factor");
  filterBusFactor.value = urlParams.get("bus_factor") ?? "all";
  filterBusFactor.addEventListener("change", () => {
    urlParams.set("bus_factor", filterBusFactor.value);
    history.pushState(
      null,
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
    filterProviders();
  });

  if (urlParams.size > 0) {
    // Show filter box if there are filter query parameters
    document.getElementById("filter-button").click();
  }

  filterProviders();
}

function filterProviders() {
  function intersection(a, b) {
    const setA = new Set(a);
    return b.filter((value) => setA.has(value));
  }

  const freeOfChargeOnly = document.getElementById(
    "filter_free_of_charge"
  ).checked;
  const professionalHostingOnly = document.getElementById(
    "filter_professional_hosting"
  ).checked;
  const ratingGreenWebCheckOnly = document.getElementById(
    "filter_rating_green_web_check"
  ).checked;
  const inBandRegistrationOnly = document.getElementById(
    "filter_in_band_registration"
  ).checked;
  const passwordResetOnly = document.getElementById(
    "filter_password_reset"
  ).checked;
  const serverLocationOnly = document.getElementById(
    "filter_server_locations"
  ).value;
  const busFactorOnly = document.getElementById("filter_bus_factor").value;

  const allProviders = document.querySelectorAll("[data-provider]");

  let freeOfChargeProviders = [];
  if (freeOfChargeOnly) {
    freeOfChargeProviders = document.querySelectorAll(
      "[data-property-free=true]"
    );
  }

  let professionalHostingProviders = [];
  if (professionalHostingOnly) {
    professionalHostingProviders = document.querySelectorAll(
      "[data-property-professional-hosting=true]"
    );
  }

  let ratingGreenWebCheckProviders = [];
  if (ratingGreenWebCheckOnly) {
    ratingGreenWebCheckProviders = document.querySelectorAll(
      "[data-property-rating-green-web-check=true]"
    );
  }

  let inBandRegistrationProviders = [];
  if (inBandRegistrationOnly) {
    inBandRegistrationProviders = document.querySelectorAll(
      "[data-property-ibr=true]"
    );
  }

  let passwordResetProviders = [];
  if (passwordResetOnly) {
    passwordResetProviders = document.querySelectorAll(
      "[data-property-password-reset=true]"
    );
  }

  let serverLocationProviders = document.querySelectorAll(
    "[data-property-server-locations]"
  );
  if (serverLocationOnly !== "all") {
    serverLocationProviders = document.querySelectorAll(
      `[data-property-server-locations*="${serverLocationOnly}"]`
    );
  }

  let busFactorProviders = document.querySelectorAll(
    "[data-property-bus-factor]"
  );
  if (busFactorOnly !== "all") {
    if (busFactorOnly === "ge_1") {
      busFactorProviders = document.querySelectorAll(
        `:not([data-property-bus-factor="-1"])`
      );
    }
    if (busFactorOnly === "ge_2") {
      busFactorProviders = document.querySelectorAll(
        `:not([data-property-bus-factor="-1"], [data-property-bus-factor="1"])`
      );
    }
  }

  let filteredProviders = Array.from(allProviders);

  if (freeOfChargeOnly) {
    filteredProviders = intersection(
      filteredProviders,
      Array.from(freeOfChargeProviders)
    );
  }
  if (professionalHostingOnly) {
    filteredProviders = intersection(
      filteredProviders,
      Array.from(professionalHostingProviders)
    );
  }
  if (ratingGreenWebCheckOnly) {
    filteredProviders = intersection(
      filteredProviders,
      Array.from(ratingGreenWebCheckProviders)
    );
  }
  if (inBandRegistrationOnly) {
    filteredProviders = intersection(
      filteredProviders,
      Array.from(inBandRegistrationProviders)
    );
  }
  if (passwordResetOnly) {
    filteredProviders = intersection(
      filteredProviders,
      Array.from(passwordResetProviders)
    );
  }
  if (serverLocationOnly) {
    filteredProviders = intersection(
      filteredProviders,
      Array.from(serverLocationProviders)
    );
  }
  if (busFactorOnly) {
    filteredProviders = intersection(
      filteredProviders,
      Array.from(busFactorProviders)
    );
  }

  for (const provider of allProviders) {
    if (filteredProviders.includes(provider)) {
      provider.hidden = false;
    } else {
      provider.hidden = true;
    }
  }
}

function initCopyBadgeButton() {
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

function initContactPageClients() {
  // Recommended clients list filtering on /contact page
  const recommended_clients_list = document.getElementById(
    "recommended_clients_list"
  );
  if (recommended_clients_list) {
    const filterClients = function (os_name) {
      for (const client of recommended_clients_list.children) {
        client.hidden = os_name != client.getAttribute("data-os");
      }
    };
    if (navigator.userAgent.indexOf("Android") >= 0) {
      filterClients("Android");
    } else if (navigator.userAgent.indexOf("Linux") >= 0) {
      filterClients("Linux");
    } else if (navigator.userAgent.indexOf("iPhone") >= 0) {
      filterClients("iPhone");
    } else {
      filterClients("Windows");
    }
  }
}

function initBootstrapTooltips() {
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
