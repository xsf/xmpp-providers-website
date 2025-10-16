// SPDX-FileCopyrightText: 2025 XMPP Providers Team
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const table = new DataTable(
  document.getElementById("provider-overview-table"),
  {
    columnDefs: [
      {
        targets: [1, 3],
        type: "date"
      }
    ],
    layout: {
      topEnd: null,
    },
    ordering: {
      indicators: false,
    },
    order: [
      [2, "asc"],
      [0, "asc"],

    ],
    paging: false,
    scrollX: true,
    // Extensions
    columnControl: ["order", "searchDropdown"],
    fixedColumns: true,
    fixedHeader: {
      header: true,
      headerOffset: document.querySelector(".navbar").offsetHeight,
    },
  }
);
