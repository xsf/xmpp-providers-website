// SPDX-FileCopyrightText: 2024 XMPP Providers Team
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const themeObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'data-bs-theme') {
      update_chart_background_color()
    }
  });
});
themeObserver.observe(document.querySelector('html'), {
  attributes: true, childList: false, characterData: false
});

let pie_chart_radius

const charts = []

document.addEventListener("DOMContentLoaded", () => {
  set_pie_chart_radius();
  initialize_categories_pie_chart();
  initialize_since_bar_chart();
  initialize_bus_factor_pie_chart();
  initialize_green_web_check_pie_chart();
  initialize_file_size_bar_chart();
  initialize_provider_file_pie_chart();
  initialize_server_testing_pie_chart();
  initialize_map();
});

window.onresize = function () {
  // Resize charts when resizing window
  set_pie_chart_radius()
}

function get_chart_background_color() {
  return getPreferredTheme() === "dark" ? "rgb(43, 48, 53)" : "rgb(248, 249, 250)";
}

function update_chart_background_color() {
  for (const chart of charts) {
    let option = chart.getOption()
    option["backgroundColor"] = get_chart_background_color()
    chart.setOption(option)
  }
}

function set_pie_chart_radius() {
  // Adapt pie chart radius to available screen width (mainly for mobile devices)
  if (window.innerWidth < 576) {
    pie_chart_radius = "40%"
  } else {
    pie_chart_radius = "75%"
  }

  for (const chart of charts) {
    let option = chart.getOption()
    option["series"][0]["radius"] = pie_chart_radius
    chart.setOption(option)
    chart.resize()
  }
}

function show_chart_details(chart, params) {
  chart.dispatchAction({
    type: "hideTip"
  })

  let modal_title = ""
  if (params.componentSubType === "pie") {
    modal_title = `${params.seriesName}: ${params.name}`
  } else {
    modal_title = `${params.dimensionNames[1]}: ${params.name}`
  }

  let providers = []
  if (Array.isArray(params.data.providers)) {
    for (const provider_jid of params.data.providers) {
      providers.push(`<a href="/provider/${provider_jid}/">${provider_jid}</a>`)
    }
  } else {
    for (const provider_jid in params.data.providers) {
      const file_size = params.data.providers[provider_jid]
      let file_size_span = ""
      if (file_size != -1 && file_size != 0) {
        file_size_span = `<span class="text-muted">&nbsp;-&nbsp;${file_size} MB</span>`
      }
      providers.push(`<a href="/provider/${provider_jid}/">${provider_jid}</a>${file_size_span}`)
    }
  }

  show_statistics_modal(modal_title, providers)
}

function show_statistics_modal(title, providers) {
  document.getElementById("statistics_details_modal_title").innerHTML = title
  document.getElementById("statistics_details_modal_body").innerHTML = providers.join("<br>")
  new bootstrap.Modal(document.getElementById("statistics_details_modal")).show()
}

function initialize_categories_pie_chart() {
  const container = document.getElementById(
    "categories_pie_chart_container"
  );
  const values = JSON.parse(container.dataset.values);

  const chart = echarts.init(container);
  const option = {
    backgroundColor: get_chart_background_color(),
    tooltip: {
      trigger: "item",
    },
    label: {
      show: true,
      formatter(param) {
        return `${param.name}: ${param.value} (${param.percent} %)`;
      },
    },
    series: [
      {
        name: "Provider Category",
        type: "pie",
        radius: pie_chart_radius,
        percentPrecision: 1,
        data: values,
      },
    ],
  };

  chart.setOption(option);
  charts.push(chart)
  chart.on("click", function(params) {
    show_chart_details(chart, params)
  });
}

function initialize_since_bar_chart() {
  const container = document.getElementById(
    "since_bar_chart_container"
  );
  const values = JSON.parse(container.dataset.values);
  let years = [];
  let counts = [];
  for (const [key, value] of Object.entries(values)) {
    years.push(key);
    counts.push(value);
  }

  const chart = echarts.init(container);
  const option = {
    backgroundColor: get_chart_background_color(),
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    label: {
      show: true,
      formatter(param) {
        return param.value ? param.value : ""
      },
    },
    xAxis: {
      type: "category",
      data: years,
      axisLabel: {
        interval: 0,
        rotate: 45
      }
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: counts,
        type: "bar",
        dimensions: ["Year", "Provider History"],
      },
    ],
  };

  chart.setOption(option);
  charts.push(chart)
  chart.on("click", function(params) {
    show_chart_details(chart, params)
  });
}

function initialize_bus_factor_pie_chart() {
  const container = document.getElementById(
    "bus_factor_pie_chart_container"
  );
  const values = JSON.parse(container.dataset.values);

  const chart = echarts.init(container);
  const option = {
    backgroundColor: get_chart_background_color(),
    tooltip: {
      trigger: "item",
    },
    label: {
      show: true,
      formatter(param) {
        return `${param.name}: ${param.value} (${param.percent} %)`;
      },
    },
    series: [
      {
        name: "Bus Factor",
        type: "pie",
        radius: pie_chart_radius,
        percentPrecision: 1,
        data: values,
      },
    ],
  };

  chart.setOption(option);
  charts.push(chart)
  chart.on("click", function(params) {
    show_chart_details(chart, params)
  });
}

function initialize_green_web_check_pie_chart() {
  const container = document.getElementById(
    "green_web_check_pie_chart_container"
  );
  const values = JSON.parse(container.dataset.values);

  const chart = echarts.init(container);
  const option = {
    backgroundColor: get_chart_background_color(),
    tooltip: {
      trigger: "item",
    },
    label: {
      show: true,
      formatter(param) {
        return `${param.name}: ${param.value} (${param.percent} %)`;
      },
    },
    series: [
      {
        name: "Green Hosting",
        type: "pie",
        radius: pie_chart_radius,
        percentPrecision: 1,
        data: values,
      },
    ],
  };

  chart.setOption(option);
  charts.push(chart)
  chart.on("click", function(params) {
    show_chart_details(chart, params)
  });
}

function initialize_file_size_bar_chart() {
  const container = document.getElementById(
    "file_size_bar_chart_container"
  );
  const values = JSON.parse(container.dataset.values);
  let file_sizes = [];
  let counts = [];
  for (const [key, value] of Object.entries(values)) {
    // Remove leading number, which was used for sorting,
    // as Hugo does not preserve input order
    file_sizes.push(key.slice(1));
    counts.push(value);
  }

  const chart = echarts.init(container);
  const option = {
    backgroundColor: get_chart_background_color(),
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    label: {
      show: true,
      formatter(param) {
        return param.value ? param.value : ""
      },
    },
    xAxis: {
      type: "category",
      data: file_sizes,
      axisLabel: {
        interval: 0,
        rotate: 45
      }
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: counts,
        type: "bar",
        dimensions: ["File Size", "File Sharing"],
      },
    ],
  };

  chart.setOption(option);
  charts.push(chart)
  chart.on("click", function(params) {
    show_chart_details(chart, params)
  });
}

function initialize_provider_file_pie_chart() {
  const container = document.getElementById(
    "provider_file_pie_chart_container"
  );
  const values = JSON.parse(container.dataset.values);

  const chart = echarts.init(container);
  const option = {
    backgroundColor: get_chart_background_color(),
    tooltip: {
      trigger: "item",
    },
    label: {
      show: true,
      formatter(param) {
        return `${param.name}: ${param.value} (${param.percent} %)`;
      },
    },
    series: [
      {
        name: "Provider File",
        type: "pie",
        radius: pie_chart_radius,
        percentPrecision: 1,
        data: values,
      },
    ],
  };

  chart.setOption(option);
  charts.push(chart)
  chart.on("click", function(params) {
    show_chart_details(chart, params)
  });
}

function initialize_server_testing_pie_chart() {
  const container = document.getElementById(
    "server_testing_pie_chart_container"
  );
  const values = JSON.parse(container.dataset.values);

  const chart = echarts.init(container);
  const option = {
    backgroundColor: get_chart_background_color(),
    tooltip: {
      trigger: "item",
    },
    label: {
      show: true,
      formatter(param) {
        return `${param.name}: ${param.value} (${param.percent} %)`;
      },
    },
    series: [
      {
        name: "Server Testing",
        type: "pie",
        radius: pie_chart_radius,
        percentPrecision: 1,
        data: values,
      },
    ],
  };

  chart.setOption(option);
  charts.push(chart)
  chart.on("click", function(params) {
    show_chart_details(chart, params)
  });
}

function initialize_map() {
  const providers_data = JSON.parse(
    document.getElementById("map_container").dataset.providers
  );

  const map = L.map("map_container").setView([40, 8], 1.6);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 5,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Control that shows state info on hover
  const info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create("div", "leaflet-info");
    this.update();
    return this._div;
  };

  info.update = function (props) {
    let contents = '<span class="text-secondary">Hover over a country</span>';
    if (props !== undefined) {
      const providers_count_data = providers_data[props.ISO_A2.toLowerCase()];
      let providers_count = 0
      if (providers_count_data !== undefined) {
        providers_count = providers_count_data.value
      }
      contents = `<span class="text-secondary"><b>${props.NAME}</b><br>${providers_count}`;
      if (providers_count == 1) {
        contents = `${contents} Provider`;
      } else {
        contents = `${contents} Providers`;
      }
      contents = `${contents}</span>`;
    }
    this._div.innerHTML = `<h5 class="mb-0 fw-bold text-secondary">Providers per Country</h5>${contents}`;
  };

  info.addTo(map);

  function getColor(d) {
    return d > 10
      ? "#800026"
      : d > 5
      ? "#BD0026"
      : d > 4
      ? "#E31A1C"
      : d > 3
      ? "#FC4E2A"
      : d > 2
      ? "#FD8D3C"
      : d > 1
      ? "#FEB24C"
      : d > 0
      ? "#FED976"
      : "#FFFFFF00";
  }

  function style(feature) {
    const providers_count_data = providers_data[feature.properties.ISO_A2.toLowerCase()];
    let providers_count = 0
    if (providers_count_data !== undefined) {
      providers_count = providers_count_data.value
    }

    return {
      weight: 0.1,
      opacity: 1,
      color: "#CCC",
      dashArray: "3",
      fillOpacity: 0.6,
      fillColor: getColor(providers_count),
    };
  }

  function highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 0.7,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.3,
    });

    layer.bringToFront();

    info.update(layer.feature.properties);
  }

  const geojson = L.geoJson(world_data, {
    style,
    onEachFeature,
  }).addTo(map);

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());

    const providers_count_data = providers_data[e.target.feature.properties.ISO_A2.toLowerCase()];
    if (providers_count_data === undefined) {
      return
    }

    let provider_links = []
    for (const provider_jid of providers_count_data.providers) {
      provider_links.push(`<a href="/provider/${provider_jid}/">${provider_jid}</a>`)
    }
    show_statistics_modal(
      `Providers in ${e.target.feature.properties.NAME}`,
      provider_links
    )
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
    });
  }

  const legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    const div = L.DomUtil.create("div", "leaflet-info leaflet-legend");
    const grades = [1, 2, 3, 4, 5, 10];
    const labels = [];
    let from, to;

    for (let i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(
        `<i style="background:${getColor(from)}"></i> ${from}${
          to ? `&ndash;${to}` : "+"
        }`
      );
    }

    div.innerHTML = labels.join("<br>");
    return div;
  };

  legend.addTo(map);
}
