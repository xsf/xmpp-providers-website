// SPDX-FileCopyrightText: 2025 XMPP Providers Team
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const unknownString = '<a href="/faq/#unknown" class="abbr">unknown</a>';
const separatorString = '<span class="text-body-secondary"> | </span>';
const truncateString = (str, max) => {
  if (str.length > max) {
    return str.slice(0, max) + "…";
  }
  return str;
};

const columnControlDefault = [
  "order",
  [
    "searchList",
    "orderAsc",
    "orderDesc",
    "orderRemove",
    "orderClear",
    "orderAddAsc",
    "orderAddDesc",
  ],
]
const columnControlNoSearchList = [
  "order",
  [
    "orderAsc",
    "orderDesc",
    "orderRemove",
    "orderClear",
    "orderAddAsc",
    "orderAddDesc",
  ],
]

document.addEventListener("DOMContentLoaded", () => {
  const table = new DataTable(
    document.getElementById("provider-overview-table"),
    {
      columns: [
        {
          data: "jid",
          title: "<b>Provider</b>",
          columnControl: columnControlNoSearchList,
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }
            return `<a href="/provider/${data}">${data}</a>`;
          },
        },
        {
          data: "latestChange",
          title: "<b>Last Update</b>",
          columnControl: columnControlNoSearchList,
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            return `<span class="font-monospace">${data}</span>`;
          },
        },
        {
          data: "category",
          title: "<b>Category</b>",
          className: "text-end",
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }
            return `<span class="badge category-${data.toLowerCase()}">${data}</span>`;
          },
        },
        {
          data: "since",
          title: "<b>Established</b>",
          columnControl: columnControlNoSearchList,
          render: (data, type, row) => {
            if (type !== "display") {
              return data;
            }

            if (!data) {
              return unknownString;
            }

            const providerData = providersData[row.jid];
            if (providerData.since.source) {
              return `<span class="font-monospace" title="Available since this date" data-bs-toggle="tooltip">${data}</span>`;
            }
            return `<span class="font-monospace" title="Listed since this date" data-bs-toggle="tooltip">${data}</span>`;
          },
        },
        {
          data: "website",
          title: "<b>Website</b>",
          columnControl: columnControlNoSearchList,
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            if (Object.keys(data).length === 0) {
              return unknownString;
            }

            const websites = [];
            for (const [lang, address] of Object.entries(data)) {
              websites.push(
                `<a href="${address}" target="_blank">${lang.toUpperCase()}</a>`
              );
            }
            return websites.join(separatorString);
          },
        },
        {
          data: "freeOfCharge",
          title: "<b>Free of Charge</b>",
          render: (data, type, row) => {
            const providerData = providersData[row.jid];
            if (providerData.freeOfCharge.source === "") {
              return unknownString;
            }

            if (data) {
              return "Yes";
            }
            return "Paid";
          },
        },
        {
          data: "serverLocations",
          title: "<b>Server/Data<br>Location(s)</b>",
          columnControl: columnControlNoSearchList,
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            if (data.length === 0) {
              return unknownString;
            }

            const locations = [];
            for (const location of data) {
              const flag = location
                .toUpperCase()
                .replace(/./g, (char) =>
                  String.fromCodePoint(char.charCodeAt(0) + 127397)
                );
              locations.push(
                `<span title="${location.toUpperCase()}" data-bs-toggle="tooltip">${flag}</span>`
              );
            }
            return locations.join(separatorString);
          },
        },
        {
          data: "legalNotice",
          title: "<b>Legal Notice</b>",
          columnControl: columnControlNoSearchList,
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            if (Object.keys(data).length === 0) {
              return '<span class="text-danger text-opacity-75">No</span>';
            }

            const addresses = [];
            for (const [lang, address] of Object.entries(data)) {
              addresses.push(
                `<a href="${address}" target="_blank">${lang.toUpperCase()}</a>`
              );
            }
            return addresses.join(separatorString);
          },
        },
        {
          data: "busFactor",
          title: "<b>Bus Factor</b>",
          className: "text-end",
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            if (Number(data) === -1) {
              return unknownString;
            }

            if (Number(data) === 1) {
              return "1 person";
            }
            return `${data} persons`;
          },
        },
        {
          data: "professionalHosting",
          title: "<b>Professional<br>Hosting</b>",
          render: (data, type, row) => {
            if (data) {
              return '<a href="/faq/#professional-hosting" class="abbr">Yes</a>';
            }

            const providerData = providersData[row.jid];
            if (providerData.professionalHosting.source === "") {
              return unknownString;
            }

            return "No";
          },
        },
        {
          data: "ratingGreenWebCheck",
          title: "<b>Green<br>Hosting</b>",
          render: (data, type, row) => {
            if (type !== "display") {
              return data;
            }

            if (data) {
              const providerData = providersData[row.jid];
              const url = providerData.ratingGreenWebCheck.source
                .split("/")
                .at(-1);
              return `<a href="https://www.thegreenwebfoundation.org/green-web-check/?url=${url}" target="_blank">Yes</a>`;
            }

            return '<a href="/faq/#green-hosting" class="abbr">No</a>';
          },
        },
        {
          data: "organization",
          title: "<b>Organization</b>",
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            if (data) {
              return `${data.charAt(0).toUpperCase()}${data.slice(1)}`;
            }
            return unknownString;
          },
        },
        {
          data: "serverSoftwareName",
          title: "<b>Server<br>Software</b>",
          render: (data, type, row) => {
            if (type !== "display") {
              return data;
            }

            if (data) {
              return `<span data-bs-toggle="tooltip" title="${data} ${
                row.serverSoftwareVersion
              }">${truncateString(data, 15)} ${truncateString(
                row.serverSoftwareVersion,
                15
              )}</span>`;
            }
            return unknownString;
          },
        },
        {
          data: "serverSoftwareVersion",
          visible: false,
        },
        {
          data: "inBandRegistration",
          title: "<b>Registration</b>",
          render: (data, type, row) => {
            if (!data && Object.keys(row.registrationWebPage).length === 0) {
              return '<span class="badge rounded-pill text-bg-secondary">Registration closed</span>';
            }

            let content = "";
            if (data) {
              content += `<a href="xmpp:${row.jid}?register">App</a>`;
            }

            if (Object.keys(row.registrationWebPage).length > 0) {
              if (data) {
                content += separatorString;
              }

              const addresses = [];
              for (const [lang, address] of Object.entries(
                row.registrationWebPage
              )) {
                addresses.push(
                  `<a href="${address}" target="_blank">${lang.toUpperCase()}</a>`
                );
              }
              content += addresses.join(separatorString);
            }

            return content;
          },
        },
        {
          data: "registrationWebPage",
          visible: false,
        },
        {
          data: "inBandRegistrationEmailAddressRequired",
          title:
            '<b><span data-bs-toggle="tooltip" title="Requires an email address for registration">Email<br>Required</span></b>',
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            if (data) {
              return "Yes";
            }
            return "No";
          },
        },
        {
          data: "inBandRegistrationCaptchaRequired",
          title:
            '<b><span data-bs-toggle="tooltip" title="Requires solving a CAPTCHA during registration">CAPTCHA<br>Required</span></b>',
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            if (data) {
              return "Yes";
            }
            return "No";
          },
        },
        {
          data: "passwordReset",
          title: "<b>Password<br>Reset</b>",
          columnControl: columnControlNoSearchList,
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            if (Object.keys(data).length === 0) {
              return "No";
            }

            const addresses = [];
            for (const [lang, address] of Object.entries(data)) {
              addresses.push(
                `<a href="${address}" target="_blank">${lang.toUpperCase()}</a>`
              );
            }
            return addresses.join(separatorString);
          },
        },
        {
          data: "maximumMessageArchiveManagementStorageTime",
          title:
            '<b>Message <a href="/faq/#storage" class="abbr">Storage</a><br>Duration</b>',
          className: "text-end",
          type: "num",
          render: (data, type) => {
            if (type === "sort") {
              if (data === -1) {
                return 0;
              }
              if (data === 0) {
                return 999999;
              }
              return data;
            }

            if (type !== "display") {
              return data;
            }

            if (Number(data) === -1) {
              return unknownString;
            }

            if (Number(data) === 0) {
              return "unlimited";
            }

            return `${data} days`;
          },
        },
        {
          data: "maximumHttpFileUploadFileSize",
          title: "<b>Maximum<br>File Size</b>",
          className: "text-end",
          type: "num",
          render: (data, type) => {
            if (type === "sort") {
              if (data === -1) {
                return 0;
              }
              if (data === 0) {
                return 999999999999;
              }
              return data;
            }

            if (type !== "display") {
              return data;
            }

            if (Number(data) === -1) {
              return unknownString;
            }

            if (Number(data) === 0) {
              return "unlimited";
            }

            return `${data} MB`;
          },
        },
        {
          data: "maximumHttpFileUploadTotalSize",
          title: "<b>Maximum Total<br>File Size</b>",
          className: "text-end",
          type: "num",
          render: (data, type) => {
            if (type === "sort") {
              if (data === -1) {
                return 0;
              }
              if (data === 0) {
                return 999999999999;
              }
              return data;
            }

            if (type !== "display") {
              return data;
            }

            if (Number(data) === -1) {
              return unknownString;
            }

            if (Number(data) === 0) {
              return "unlimited";
            }

            return `${data} MB`;
          },
        },
        {
          data: "maximumHttpFileUploadStorageTime",
          title:
            '<b>File <a href="/faq/#storage" class="abbr">Storage</a><br>Duration</b>',
          className: "text-end",
          type: "num",
          render: (data, type) => {
            if (type === "sort") {
              if (data === -1) {
                return 0;
              }
              if (data === 0) {
                return 999999;
              }
              return data;
            }

            if (type !== "display") {
              return data;
            }

            if (Number(data) === -1) {
              return unknownString;
            }

            if (Number(data) === 0) {
              return "unlimited";
            }

            return `${data} days`;
          },
        },
        {
          data: "ratingXmppComplianceTester",
          title: "<b>Compatibility</b>",
          render: (data, type, row) => {
            if (type !== "display") {
              return data;
            }

            let category = "d";
            if (data > 89) {
              category = "c";
            }
            if (data > 99) {
              category = "a";
            }

            return `<a href="https://compliance.conversations.im/server/${row.jid}/" class="badge badge-rating text-light text-decoration-none category-${category}" target="_blank">${data}</a>`;
          },
        },
        {
          data: null,
          title: "<b>Security (C2S)</b>",
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            return '<a href="/faq/#unknown" class="abbr badge text-light bg-secondary">unknown</a>';
          },
        },
        {
          data: null,
          title: "<b>Security (S2S)</b>",
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            return '<a href="/faq/#unknown" class="abbr badge text-light bg-secondary">unknown</a>';
          },
        },
        {
          data: "emailSupport",
          title: "<b>Support (Email)</b>",
          columnControl: columnControlNoSearchList,
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            if (Object.keys(data).length === 0) {
              return "-";
            }

            const langAddressesList = [];
            for (const [lang, addresses] of Object.entries(data)) {
              const addressesList = [];
              for (const address of addresses) {
                addressesList.push(
                  `<a href="mailto:${address}">${lang.toUpperCase()}</a>`
                );
              }
              langAddressesList.push(
                addressesList.join(
                  '<span class="text-body-secondary"> / </span>'
                )
              );
            }

            return langAddressesList.join(separatorString);
          },
        },
        {
          data: "chatSupport",
          title: "<b>Support (Chat)</b>",
          columnControl: columnControlNoSearchList,
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            if (Object.keys(data).length === 0) {
              return "-";
            }

            const langAddressesList = [];
            for (const [lang, addresses] of Object.entries(data)) {
              const addressesList = [];
              for (const address of addresses) {
                addressesList.push(
                  `<a href="xmpp:${address}">${lang.toUpperCase()}</a>`
                );
              }
              langAddressesList.push(
                addressesList.join(
                  '<span class="text-body-secondary"> / </span>'
                )
              );
            }

            return langAddressesList.join(separatorString);
          },
        },
        {
          data: "groupChatSupport",
          title: "<b>Support (Group Chat)</b>",
          columnControl: columnControlNoSearchList,
          render: (data, type) => {
            if (type !== "display") {
              return data;
            }

            if (Object.keys(data).length === 0) {
              return "-";
            }

            const langAddressesList = [];
            for (const [lang, addresses] of Object.entries(data)) {
              const addressesList = [];
              for (const address of addresses) {
                addressesList.push(
                  `<a href="xmpp:${address}?join">${lang.toUpperCase()}</a>`
                );
              }
              langAddressesList.push(
                addressesList.join(
                  '<span class="text-body-secondary"> / </span>'
                )
              );
            }

            return langAddressesList.join(separatorString);
          },
        },
        {
          data: "alternativeJids",
          title: "<b>Alternative<br>Addresses</b>",
          columnControl: columnControlNoSearchList,
          render: (data, type, row) => {
            if (type !== "display") {
              return data;
            }

            if (data.length === 0) {
              return "-";
            }

            if (data.length === 1) {
              return `<span class="badge text-bg-secondary opacity-75">${data[0]}</span>`;
            }

            let badges = "";
            for (const address of data) {
              badges += `<span class="badge text-bg-secondary opacity-75 me-1">${address}</span>`;
            }

            return `
              <div class="d-flex align-items-center">
                <button class="btn btn-sm py-0 ps-0" type="button" data-bs-toggle="collapse" data-bs-target="#${row.jid}-alternative-addresses-collapse" aria-expanded="false" aria-controls="${row.jid}-alternative-addresses-collapse">
                  Show All (${data.length})
                </button>
                <div class="collapse collapse-horizontal" id="${row.jid}-alternative-addresses-collapse">
                  ${badges}
                </div>
              </div>
            `;
          },
        },
        {
          data: null,
          title:
            '<b><a href="/faq/#provider-file" class="abbr">Provider<br>File</a></b>',
          render: (data, type, row) => {
            const providerData = providersData[row.jid];
            if (providerData.website.source?.includes(".json")) {
              return "Yes";
            }
            return "No";
          },
        },
      ],
      data: filteredPoviders,
      layout: {
        topEnd: null,
      },
      order: [
        [2, "asc"],
        [0, "asc"],
      ],
      ordering: {
        indicators: false,
        // handler: false
      },
      paging: false,
      scrollX: true,
      // Extensions
      columnControl: columnControlDefault,
      fixedColumns: true,
      fixedHeader: {
        header: true,
        headerOffset: document.querySelector(".navbar").offsetHeight,
      },
    }
  );
});
