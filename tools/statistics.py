# SPDX-FileCopyrightText: 2024 XMPP Providers Team
#
# SPDX-License-Identifier: AGPL-3.0-or-later

import json
import logging
from collections import defaultdict
from datetime import datetime
from datetime import UTC

from tools.common import DATA_PATH

log = logging.getLogger()


def prepare_statistics() -> None:  # noqa: C901, PLR0912, PLR0915
    """Create statistics dict which can be consumed by echarts."""
    try:
        with open(DATA_PATH / "providers.json") as file:
            providers_data = json.load(file)
    except json.decoder.JSONDecodeError:
        log.exception("Could not open providers.json")
        return

    try:
        with open(DATA_PATH / "filtered_providers.json") as file:
            filtered_providers_data = json.load(file)
    except json.decoder.JSONDecodeError:
        log.exception("Could not open filtered_providers.json")
        return

    statistics_data = {
        "total_provider_count": len(providers_data),
        "categories_pie_chart_data": [],
        "green_web_check_pie_chart_data": [],
        "provider_file_pie_chart_data": [],
        "server_testing_pie_chart_data": [],
        "bus_factor_pie_chart_data": [],
        "since_bar_chart_data": {},
        "file_size_bar_chart_data": {
            "unknown": {
                "value": 0,
                "providers": {},
                "itemStyle": {"color": "rgb(220, 220, 220)"},
            },
            "up to 10 MB": {"value": 0, "providers": {}},
            "up to 25 MB": {"value": 0, "providers": {}},
            "up to 50 MB": {"value": 0, "providers": {}},
            "up to 100 MB": {"value": 0, "providers": {}},
            "up to 500 MB": {"value": 0, "providers": {}},
            "up to 1000 MB": {"value": 0, "providers": {}},
            ">1000 MB": {"value": 0, "providers": {}},
        },
        "server_locations": defaultdict(lambda: defaultdict()),
    }

    # Category data
    provider_categories = {
        "A": {"count": 0, "providers": [], "color": "rgb(67, 150, 57)"},
        "B": {"count": 0, "providers": [], "color": "rgb(160, 206, 103)"},
        "C": {"count": 0, "providers": [], "color": "rgb(233, 109, 31)"},
        "D": {"count": 0, "providers": [], "color": "rgb(217, 16, 30)"},
    }
    for filtered_provider_data in filtered_providers_data:
        provider_categories[filtered_provider_data["category"]]["count"] += 1
        provider_categories[filtered_provider_data["category"]]["providers"].append(
            filtered_provider_data["jid"]
        )

    for category, data in provider_categories.items():
        statistics_data["categories_pie_chart_data"].append(
            {
                "value": data["count"],
                "name": category,
                "itemStyle": {"color": data["color"]},
                "providers": data["providers"],
            }
        )

    green_web_check = {
        "Hosted green": {"value": 0, "providers": [], "color": "rgb(120, 190, 70)"},
        "Not hosted green": {"value": 0, "providers": [], "color": "rgb(240, 220, 0)"},
    }

    provider_file = {
        "Provider File (v2)": {
            "value": 0,
            "providers": [],
            "color": "rgb(120, 190, 70)",
        },
        "No Provider File": {
            "value": 0,
            "providers": [],
            "color": "rgb(220, 220, 220)",
        },
    }

    server_testing = {
        "Providers allowing server testing": {
            "value": 0,
            "providers": [],
            "color": "rgb(120, 190, 70)",
        },
        "Providers not allowing server testing": {
            "value": 0,
            "providers": [],
            "color": "rgb(240, 220, 0)",
        },
        "No provider file": {
            "value": 0,
            "providers": [],
            "color": "rgb(220, 220, 220)",
        },
    }

    bus_factor = {
        "1 person": {
            "value": 0,
            "providers": [],
            "color": "rgb(160, 206, 103)",
        },
        "2 persons": {
            "value": 0,
            "providers": [],
            "color": "rgb(120, 190, 70)",
        },
        "3 persons": {
            "value": 0,
            "providers": [],
            "color": "rgb(90, 170, 60)",
        },
        ">3 persons": {
            "value": 0,
            "providers": [],
            "color": "rgb(60, 140, 70)",
        },
        "unknown": {
            "value": 0,
            "providers": [],
            "color": "rgb(220, 220, 220)",
        },
    }

    for provider_jid, provider_data in providers_data.items():
        if website_data := provider_data.get("website"):
            website_data_source = website_data.get("source")
            if website_data_source is not None and website_data_source.endswith(
                "v2.json"
            ):
                provider_file_key = "Provider File (v2)"
            else:
                provider_file_key = "No Provider File"

            provider_file[provider_file_key]["value"] += 1
            provider_file[provider_file_key]["providers"].append(provider_jid)

        if server_testing_data := provider_data.get("serverTesting"):
            server_testing_allowed = server_testing_data["content"]
            server_testing_source = server_testing_data.get("source")

            if server_testing_allowed:
                server_testing_key = "Providers allowing server testing"
            elif server_testing_source in ("", None):
                server_testing_key = "No provider file"
            else:
                server_testing_key = "Providers not allowing server testing"

            server_testing[server_testing_key]["value"] += 1
            server_testing[server_testing_key]["providers"].append(provider_jid)

        if bus_factor_data := provider_data.get("busFactor"):
            bus_factor_number = bus_factor_data["content"]
            if bus_factor_number == 1:
                bus_factor_key = "1 person"
            elif bus_factor_number == 2:  # noqa: PLR2004
                bus_factor_key = "2 persons"
            elif bus_factor_number == 3:  # noqa: PLR2004
                bus_factor_key = "3 persons"
            elif bus_factor_number > 3:  # noqa: PLR2004
                bus_factor_key = ">3 persons"
            else:
                bus_factor_key = "unknown"

            bus_factor[bus_factor_key]["value"] += 1
            bus_factor[bus_factor_key]["providers"].append(provider_jid)

        if green_web_check_data := provider_data.get("ratingGreenWebCheck"):
            green_web_check_key = (
                "Hosted green"
                if green_web_check_data["content"]
                else "Not hosted green"
            )
            green_web_check[green_web_check_key]["value"] += 1
            green_web_check[green_web_check_key]["providers"].append(provider_jid)

        if file_size_data := provider_data.get("maximumHttpFileUploadFileSize"):
            file_size = file_size_data["content"]
            # Add a placeholder number for sorting the data,
            # as Hugo does not preserve input order
            if file_size == -1:
                file_size_key = "unknown"
            elif file_size <= 10:  # noqa: PLR2004
                file_size_key = "up to 10 MB"
            elif file_size <= 25:  # noqa: PLR2004
                file_size_key = "up to 25 MB"
            elif file_size <= 52:  # noqa: PLR2004
                file_size_key = "up to 50 MB"
            elif file_size <= 104:  # noqa: PLR2004
                file_size_key = "up to 100 MB"
            elif file_size <= 512:  # noqa: PLR2004
                file_size_key = "up to 500 MB"
            elif file_size <= 1024:  # noqa: PLR2004
                file_size_key = "up to 1000 MB"
            else:
                file_size_key = ">1000 MB"

            statistics_data["file_size_bar_chart_data"][file_size_key]["value"] += 1
            statistics_data["file_size_bar_chart_data"][file_size_key]["providers"][
                provider_jid
            ] = file_size

        if since_data := provider_data.get("since"):
            since_date = datetime.strptime(since_data["content"], "%Y-%m-%d").replace(
                tzinfo=UTC
            )
            if not since_data["source"]:
                if statistics_data["since_bar_chart_data"].get("unknown") is None:
                    statistics_data["since_bar_chart_data"]["unknown"] = {}
                    statistics_data["since_bar_chart_data"]["unknown"]["itemStyle"] = {
                        "color": "rgb(220, 220, 220)"
                    }
                    statistics_data["since_bar_chart_data"]["unknown"]["value"] = 1
                    statistics_data["since_bar_chart_data"]["unknown"]["providers"] = [
                        provider_jid
                    ]
                else:
                    statistics_data["since_bar_chart_data"]["unknown"]["value"] += 1
                    statistics_data["since_bar_chart_data"]["unknown"][
                        "providers"
                    ].append(provider_jid)
            else:
                year = str(since_date.year)
                if statistics_data["since_bar_chart_data"].get(year) is None:
                    statistics_data["since_bar_chart_data"][year] = {}
                    statistics_data["since_bar_chart_data"][year]["value"] = 1
                    statistics_data["since_bar_chart_data"][year]["providers"] = [
                        provider_jid
                    ]
                else:
                    statistics_data["since_bar_chart_data"][year]["value"] += 1
                    statistics_data["since_bar_chart_data"][year]["providers"].append(
                        provider_jid
                    )

        if server_locations_data := provider_data.get("serverLocations"):
            for server_location in server_locations_data["content"]:
                if (
                    statistics_data["server_locations"][server_location].get("value")
                    is None
                ):
                    statistics_data["server_locations"][server_location]["value"] = 1
                    statistics_data["server_locations"][server_location][
                        "providers"
                    ] = [provider_jid]
                else:
                    statistics_data["server_locations"][server_location]["value"] += 1
                    statistics_data["server_locations"][server_location][
                        "providers"
                    ].append(provider_jid)

    for key, data in bus_factor.items():
        statistics_data["bus_factor_pie_chart_data"].append(
            {
                "value": data["value"],
                "name": key,
                "itemStyle": {"color": data["color"]},
                "providers": data["providers"],
            }
        )

    # Add missing dates to since date
    first_date = int(min(statistics_data["since_bar_chart_data"]))
    for year in range(first_date, datetime.now(tz=UTC).year):
        if statistics_data["since_bar_chart_data"].get(str(year), None) is None:
            statistics_data["since_bar_chart_data"][str(year)] = {}
            statistics_data["since_bar_chart_data"][str(year)]["value"] = 0
            statistics_data["since_bar_chart_data"][str(year)]["providers"] = []

    # Sort since data by date
    statistics_data["since_bar_chart_data"] = dict(
        sorted(statistics_data["since_bar_chart_data"].items())
    )

    # File size
    # Add dictionary key prefix to sort data, since Hugo does not preserve any order
    file_size_keys = []
    for index, key in enumerate(statistics_data["file_size_bar_chart_data"].keys()):
        file_size_keys.append(f"{index + 1}{key}")

    for key in file_size_keys:
        statistics_data["file_size_bar_chart_data"][key] = statistics_data[
            "file_size_bar_chart_data"
        ].pop(key[1:])

    # Green web check
    for key, data in green_web_check.items():
        statistics_data["green_web_check_pie_chart_data"].append(
            {
                "value": data["value"],
                "name": key,
                "itemStyle": {"color": data["color"]},
                "providers": data["providers"],
            },
        )

    # Provider file
    for key, data in provider_file.items():
        statistics_data["provider_file_pie_chart_data"].append(
            {
                "value": data["value"],
                "name": key,
                "itemStyle": {"color": data["color"]},
                "providers": data["providers"],
            },
        )

    # Server testing
    for key, data in server_testing.items():
        statistics_data["server_testing_pie_chart_data"].append(
            {
                "value": data["value"],
                "name": key,
                "itemStyle": {"color": data["color"]},
                "providers": data["providers"],
            },
        )

    with open(DATA_PATH / "statistics.json", "w", encoding="utf-8") as statistics_file:
        statistics_file.write(json.dumps(statistics_data, indent=4))
