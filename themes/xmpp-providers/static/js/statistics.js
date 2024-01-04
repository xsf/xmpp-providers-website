// SPDX-FileCopyrightText: 2024 XMPP Providers Team
//
// SPDX-License-Identifier: AGPL-3.0-or-later

document.addEventListener("DOMContentLoaded", () => {
  initialize_categories_pie_chart();
  initialize_provider_file_pie_chart();
  initialize_server_testing_pie_chart();
  initialize_map();
});

function initialize_categories_pie_chart() {
  const categories_pie_chart_container = document.getElementById(
    "categories_pie_chart_container"
  );
  const values = JSON.parse(categories_pie_chart_container.dataset.values);

  const categories_pie_chart = echarts.init(
    categories_pie_chart_container
  );
  const option = {
    tooltip: {
      trigger: "item",
    },
    label: {
      show: true,
      formatter(param) {
        return param.name + ' (' + param.percent + '%)';
      }
    },
    series: [
      {
        name: "Provider Category",
        type: "pie",
        radius: "70%",
        data: values,
      },
    ],
  };

  categories_pie_chart.setOption(option);
}

function initialize_provider_file_pie_chart() {
  const provider_file_pie_chart_container = document.getElementById(
    "provider_file_pie_chart_container"
  );
  const values = JSON.parse(provider_file_pie_chart_container.dataset.values);

  const provider_file_pie_chart = echarts.init(
    provider_file_pie_chart_container
  );
  const option = {
    tooltip: {
      trigger: "item",
    },
    label: {
      show: true,
      formatter(param) {
        return param.name + ' (' + param.percent + '%)';
      }
    },
    series: [
      {
        name: "Provider File",
        type: "pie",
        radius: "70%",
        data: values,
      },
    ],
  };

  provider_file_pie_chart.setOption(option);
}

function initialize_server_testing_pie_chart() {
  const server_testing_pie_chart_container = document.getElementById(
    "server_testing_pie_chart_container"
  );
  const values = JSON.parse(server_testing_pie_chart_container.dataset.values);

  const server_testing_pie_chart = echarts.init(
    server_testing_pie_chart_container
  );
  const option = {
    tooltip: {
      trigger: "item",
    },
    label: {
      show: true,
      formatter(param) {
        return param.name + ' (' + param.percent + '%)';
      }
    },
    series: [
      {
        name: "Server Testing",
        type: "pie",
        radius: "70%",
        data: values,
      },
    ],
  };

  server_testing_pie_chart.setOption(option);
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
      let providers_count = providers_data[props.ISO_A2.toLowerCase()];
      if (providers_count === undefined) {
        providers_count = 0;
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
    return {
      weight: 0.1,
      opacity: 1,
      color: "#CCC",
      dashArray: "3",
      fillOpacity: 0.6,
      fillColor: getColor(
        providers_data[feature.properties.ISO_A2.toLowerCase()]
      ),
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
