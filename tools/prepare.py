# SPDX-FileCopyrightText: 2022 XMPP Providers Team
#
# SPDX-License-Identifier: AGPL-3.0-or-later

"""
Download / prepare / process XMPP Providers data
"""
import json
import logging
import os
import shutil
import sys
import zipfile
from argparse import ArgumentParser
from collections import defaultdict
from datetime import datetime
from datetime import UTC
from http import HTTPStatus
from pathlib import Path

import requests
from defusedxml.ElementTree import parse
from defusedxml.ElementTree import ParseError
from requests.exceptions import ConnectTimeout
from requests.exceptions import ReadTimeout

DOWNLOAD_PATH = Path("downloads")
DOCKER_DOWNLOAD_PATH = Path("downloads-docker")
DATA_PATH = Path("data")
STATIC_PATH = Path("static")
BADGES_PATH = STATIC_PATH / "badge"
PROVIDERS_JSON_PATH = DATA_PATH / "results"
PROVIDERS_PAGES_PATH = Path("content/provider")

with open(DATA_PATH / "api_version.json", "rb") as api_version_file:
    api_version_info = json.load(api_version_file)

API_VERSION = api_version_info["api_version"]

FILTERED_PROVIDERS_DATA_URL = (
    f"https://invent.kde.org/melvo/xmpp-providers/"
    f"-/jobs/artifacts/stable/{API_VERSION}/download/?job=filtered-provider-lists"
)
BADGES_DATA_URL = (
    f"https://invent.kde.org/melvo/xmpp-providers/"
    f"-/jobs/artifacts/stable/{API_VERSION}/download/?job=badges"
)
CLIENTS_DATA_URL = (
    f"https://invent.kde.org/melvo/xmpp-providers/-/raw/stable/"
    f"{API_VERSION}/clients.json"
)
PROVIDERS_FILE_URL = f"https://data.xmpp.net/providers/{API_VERSION}/providers.json"
XSF_SOFTWARE_LIST_URL = (
    "https://raw.githubusercontent.com/xsf/xmpp.org/master/data/software.json"
)

DOAP_NS = "http://usefulinc.com/ns/doap#"
DOAP_NAME = f".//{{{DOAP_NS}}}name"
DOAP_OS = f".//{{{DOAP_NS}}}os"

MD_FRONTMATTER = """---\ntitle: %s\ndate: %s\n---\n
{{< provider-details provider="%s">}}
"""


class ToolsArgumentParser(ArgumentParser):
    """Parses arguments for XMPP Providers Website processor."""

    def __init__(self) -> None:
        super().__init__()

        self.description = """
        Provides tools for data processing.
        """
        debug_group = self.add_mutually_exclusive_group()
        debug_group.add_argument(
            "-q",
            "--quiet",
            help="log only errors",
            action="store_const",
            dest="log_level",
            const=logging.ERROR,
            default=logging.INFO,
        )
        debug_group.add_argument(
            "-d",
            "--debug",
            help="log debug output",
            action="store_const",
            dest="log_level",
            const=logging.DEBUG,
            default=logging.INFO,
        )


def initialize_directory(path: Path) -> None:
    """
    Remove path (if it exists) and containing files, then recreate path
    """
    if path.exists() and path.is_dir():
        shutil.rmtree(path)

    os.mkdir(path)


def prepare_provider_data_files() -> None:
    """
    Download and prepare provider data files
    """
    initialize_directory(DOWNLOAD_PATH)

    # Temporarily move 'logo' folder and 'recommended_clients.json'
    # in order to clean up directories
    shutil.copytree(STATIC_PATH / "logo", DOWNLOAD_PATH / "logo")
    shutil.copytree(STATIC_PATH / "images", DOWNLOAD_PATH / "images")
    shutil.copyfile(
        DATA_PATH / "recommended_clients.json",
        DOWNLOAD_PATH / "recommended_clients.json",
    )
    shutil.copyfile(
        DATA_PATH / "api_version.json",
        DOWNLOAD_PATH / "api_version.json",
    )

    initialize_directory(STATIC_PATH)
    initialize_directory(DATA_PATH)

    get_filtered_providers_data()
    get_badges()
    get_providers_file()

    shutil.copytree(DOWNLOAD_PATH / "logo", STATIC_PATH / "logo")
    shutil.copytree(DOWNLOAD_PATH / "images", STATIC_PATH / "images")
    shutil.copyfile(
        DOWNLOAD_PATH / "recommended_clients.json",
        DATA_PATH / "recommended_clients.json",
    )
    shutil.copyfile(
        DOWNLOAD_PATH / "api_version.json",
        DATA_PATH / "api_version.json",
    )


def download_file(url: str, path: Path) -> bool:
    """
    Downloads file from url and stores it in /downloads/path
    returns success
    """
    try:
        file_response = requests.get(url, timeout=5)
    except (ConnectTimeout, ReadTimeout) as err:
        log.error("Error while trying to download from %s, %s", url, err)
        return False

    if not HTTPStatus.OK >= file_response.status_code < HTTPStatus.BAD_REQUEST:
        log.error(
            "Error while trying to download from %s, %s", url, file_response.status_code
        )
        return False

    with open(DOWNLOAD_PATH / path, "wb") as data_file:
        max_size = 1024 * 1024 * 10  # 10 MiB
        size = 0
        for chunk in file_response.iter_content(chunk_size=8192):
            data_file.write(chunk)
            size += len(chunk)
            if size > max_size:
                file_response.close()
                log.warning("File size exceeds 10 MiB: %s", path)
                return False
    return True


def get_filtered_providers_data() -> None:
    """
    Download, extract, and move providers data.
    Use downloaded file from docker build, if it exists.
    Docker builds need to download providers_data.zip directly in order to
    correctly apply caching.
    """
    providers_docker_path = Path(DOCKER_DOWNLOAD_PATH / "providers_data.zip")
    if providers_docker_path.exists():
        shutil.copyfile(providers_docker_path, DOWNLOAD_PATH / "providers_data.zip")
    else:
        success = download_file(FILTERED_PROVIDERS_DATA_URL, Path("providers_data.zip"))
        if not success:
            sys.exit(
                f"Error while trying to download from {FILTERED_PROVIDERS_DATA_URL}"
            )

    with zipfile.ZipFile(DOWNLOAD_PATH / "providers_data.zip", "r") as zip_file:
        zip_file.extractall(DOWNLOAD_PATH / "providers_data")

    shutil.copyfile(
        DOWNLOAD_PATH / "providers_data" / "providers-D.json",
        DATA_PATH / "filtered_providers.json",
    )
    shutil.copytree(DOWNLOAD_PATH / "providers_data" / "results", DATA_PATH / "results")


def get_badges() -> None:
    """
    Download, extract, and move badges
    Use downloaded file from docker build, if it exists.
    Docker builds need to download badges_data.zip directly in order to
    correctly apply caching.
    """
    badges_docker_path = Path(DOCKER_DOWNLOAD_PATH / "badges_data.zip")
    if badges_docker_path.exists():
        shutil.copyfile(badges_docker_path, DOWNLOAD_PATH / "badges_data.zip")
    else:
        success = download_file(BADGES_DATA_URL, Path("badges_data.zip"))
        if not success:
            sys.exit(f"Error while trying to download from {BADGES_DATA_URL}")

    with zipfile.ZipFile(DOWNLOAD_PATH / "badges_data.zip", "r") as zip_file:
        zip_file.extractall(DOWNLOAD_PATH / "badges_data")

    shutil.copytree(
        DOWNLOAD_PATH / "badges_data" / "badges", BADGES_PATH, dirs_exist_ok=True
    )


def get_providers_file() -> None:
    """
    Download providers.json from https://data.xmpp.net/ API endpoint.
    Use downloaded file from docker build, if it exists.
    Docker builds need to download providers.json directly in order to
    correctly apply caching.
    """
    providers_docker_path = Path(DOCKER_DOWNLOAD_PATH / "providers.json")
    if providers_docker_path.exists():
        shutil.copyfile(providers_docker_path, DOWNLOAD_PATH / "providers.json")
    else:
        success = download_file(PROVIDERS_FILE_URL, Path("providers.json"))
        if not success:
            sys.exit(f"Error while trying to download from {PROVIDERS_FILE_URL}")

    shutil.copyfile(
        DOWNLOAD_PATH / "providers.json",
        DATA_PATH / "providers.json",
    )


def create_provider_pages() -> None:
    """
    Create a .md page per provider
    """
    initialize_directory(PROVIDERS_PAGES_PATH)

    today = datetime.now(UTC).date()
    date_formatted = today.strftime("%Y-%m-%d")

    (_, _, filenames) = next(os.walk(PROVIDERS_JSON_PATH))
    for filename in filenames:
        provider_name = filename[:-5]
        with open(
            PROVIDERS_PAGES_PATH / f"{provider_name}.md", "w", encoding="utf8"
        ) as md_file:
            md_file.write(
                MD_FRONTMATTER % (provider_name, date_formatted, provider_name)
            )


def parse_doap_infos(doap_file: str) -> dict[str, list[str]] | None:
    """Parse DOAP file and return infos"""
    try:
        doap = parse(DOWNLOAD_PATH / f"clients_data/doap_files/{doap_file}.doap")
    except (FileNotFoundError, ParseError):
        return None

    info = {}
    doap_name = doap.find(DOAP_NAME)
    if doap_name is not None:
        info["name"] = doap_name.text
    info["os"] = []
    for entry in doap.findall(DOAP_OS):
        info["os"].append(entry.text)
    return info


def prepare_client_data_file() -> None:
    """
    Download and prepare clients data
    """
    Path(DOWNLOAD_PATH / "clients_data/doap_files").mkdir(parents=True)

    success = download_file(
        CLIENTS_DATA_URL, Path("clients_data/providers_clients_list.json")
    )
    if not success:
        sys.exit(f"Error while trying to download from {CLIENTS_DATA_URL}")

    success = download_file(
        XSF_SOFTWARE_LIST_URL, Path("clients_data/xsf_software_list.json")
    )
    if not success:
        sys.exit(f"Error while trying to download from {XSF_SOFTWARE_LIST_URL}")

    # Use xsf_software_list.json and providers_clients_list.json
    # to generate clients.json, which features infos from both files
    with open(
        DOWNLOAD_PATH / "clients_data" / "providers_clients_list.json", "rb"
    ) as json_file:
        providers_clients_list = json.load(json_file)
    with open(
        DOWNLOAD_PATH / "clients_data" / "xsf_software_list.json", "rb"
    ) as json_file:
        xsf_software_list = json.load(json_file)

    client_names: list[str] = []
    for client in providers_clients_list:
        client_names.append(client)

    client_infos: list[dict[str, str | bool | list[str] | None]] = []
    for package in xsf_software_list:
        if "client" not in package["categories"]:
            continue

        if package["name"] in client_names:
            provider_infos = providers_clients_list[package["name"]]
            if package["doap"] is not None:
                download_file(
                    package["doap"],
                    Path(f'clients_data/doap_files/{package["name"]}.doap'),
                )
            parsed_infos = parse_doap_infos(package["name"])

            supported_os = None
            if parsed_infos is not None:
                supported_os = parsed_infos["os"]
            client_infos.append(
                {
                    "name": package["name"],
                    "os": supported_os,
                    "since": provider_infos["since"]["content"],
                    "website": provider_infos["website"]["content"],
                    "maintained": provider_infos["maintained"]["content"],
                }
            )

    with open(
        DATA_PATH / "implementing_clients.json", "w", encoding="utf-8"
    ) as client_data_file:
        json.dump(client_infos, client_data_file, indent=4)


def prepare_statistics() -> None:  # noqa: C901, PLR0912, PLR0915
    try:
        with open(DATA_PATH / "providers.json") as file:
            providers_data = json.load(file)
    except json.decoder.JSONDecodeError as e:
        log.error("Could not open providers.json: %s", e)
        return

    try:
        with open(DATA_PATH / "filtered_providers.json") as file:
            filtered_providers_data = json.load(file)
    except json.decoder.JSONDecodeError as e:
        log.error("Could not open filtered_providers.json: %s", e)
        return

    total_provider_count = len(providers_data)

    statistics_data = {
        "total_provider_count": total_provider_count,
        "green_web_check_count": 0,
        "server_testing_count": 0,
        "v1_provider_file_count": 0,
        "v2_provider_file_count": 0,
        "bus_factor_data": defaultdict(int),
        "bus_factor_pie_chart_data": [],
        "since_bar_chart_data": defaultdict(int),
        "server_locations": defaultdict(int),
        "file_size_bar_chart_data": defaultdict(int),
    }

    # Category data
    categories_count = {"A": 0, "B": 0, "C": 0, "D": 0}
    for filtered_provider_data in filtered_providers_data:
        categories_count[filtered_provider_data["category"]] += 1

    statistics_data["categories_pie_chart_data"] = [
        {
            "value": categories_count["A"],
            "name": "A",
            "itemStyle": {"color": "rgb(67, 150, 57)"},
        },
        {
            "value": categories_count["B"],
            "name": "B",
            "itemStyle": {"color": "rgb(160, 206, 103)"},
        },
        {
            "value": categories_count["C"],
            "name": "C",
            "itemStyle": {"color": "rgb(233, 109, 31)"},
        },
        {
            "value": categories_count["D"],
            "name": "D",
            "itemStyle": {"color": "rgb(217, 16, 30)"},
        },
    ]

    # Other data
    for provider_data in providers_data.values():
        if website_data := provider_data.get("website"):
            website_data_source = website_data.get("source")
            if website_data_source is not None:
                if website_data_source.endswith("v1.json"):
                    statistics_data["v1_provider_file_count"] += 1
                if website_data_source.endswith("v2.json"):
                    statistics_data["v2_provider_file_count"] += 1

        if server_testing_data := provider_data.get("serverTesting"):
            server_testing_allowed = server_testing_data["content"]
            if server_testing_allowed:
                statistics_data["server_testing_count"] += 1

        if bus_factor_data := provider_data.get("busFactor"):
            bus_factor = bus_factor_data["content"]
            if bus_factor:
                if bus_factor == -1:
                    statistics_data["bus_factor_data"]["unknown"] += 1
                elif bus_factor == 1:
                    statistics_data["bus_factor_data"][f"{bus_factor} Person"] += 1
                else:
                    statistics_data["bus_factor_data"][f"{bus_factor} Persons"] += 1

        if green_web_check_data := provider_data.get("ratingGreenWebCheck"):
            green = green_web_check_data["content"]
            if green:
                statistics_data["green_web_check_count"] += 1

        if file_size_data := provider_data.get("maximumHttpFileUploadFileSize"):
            file_size = file_size_data["content"]
            # Add a placeholder number for sorting the data,
            # as Hugo does not preserve input order
            if file_size == -1:
                statistics_data["file_size_bar_chart_data"]["1unknown"] += 1
            elif file_size <= 10:  # noqa: PLR2004
                statistics_data["file_size_bar_chart_data"]["2up to 10 MB"] += 1
            elif file_size <= 25:  # noqa: PLR2004
                statistics_data["file_size_bar_chart_data"]["3up to 25 MB"] += 1
            elif file_size <= 50:  # noqa: PLR2004
                statistics_data["file_size_bar_chart_data"]["4up to 50 MB"] += 1
            elif file_size <= 100:  # noqa: PLR2004
                statistics_data["file_size_bar_chart_data"]["5up to 100 MB"] += 1
            elif file_size <= 500:  # noqa: PLR2004
                statistics_data["file_size_bar_chart_data"]["6up to 500 MB"] += 1
            elif file_size <= 1000:  # noqa: PLR2004
                statistics_data["file_size_bar_chart_data"]["7up to 1000 MB"] += 1
            else:
                statistics_data["file_size_bar_chart_data"]["8>1000 MB"] += 1

        if since_data := provider_data.get("since"):
            since_date = datetime.strptime(since_data["content"], "%Y-%m-%d").replace(
                tzinfo=UTC
            )
            if not since_data["source"]:
                statistics_data["since_bar_chart_data"]["unknown"] += 1
            else:
                statistics_data["since_bar_chart_data"][str(since_date.year)] += 1

        if server_locations_data := provider_data.get("serverLocations"):
            for server_location in server_locations_data["content"]:
                statistics_data["server_locations"][server_location] += 1

    # Sort bus factor data
    statistics_data["bus_factor_data"] = dict(
        sorted(statistics_data["bus_factor_data"].items())
    )
    bus_factor_colors = {
        "1 Person": "rgb(160, 206, 103)",
        "2 Persons": "rgb(120, 190, 70)",
        "3 Persons": "rgb(90, 170, 60)",
        "4 Persons": "rgb(67, 150, 57)",
        "5 Persons": "rgb(60, 140, 70)",
        "unknown": "rgb(240, 220, 0)",
    }
    for key, value in statistics_data["bus_factor_data"].items():
        statistics_data["bus_factor_pie_chart_data"].append(
            {
                "value": value,
                "name": key,
                "itemStyle": {
                    "color": bus_factor_colors.get(key, "rgb(220, 220, 220)")
                },
            }
        )

    # Add missing dates to since date
    first_date = int(min(statistics_data["since_bar_chart_data"]))
    for year in range(first_date, datetime.now(tz=UTC).year):
        if statistics_data["since_bar_chart_data"].get(str(year), None) is None:
            statistics_data["since_bar_chart_data"][str(year)] = 0

    # Sort since data by date
    statistics_data["since_bar_chart_data"] = dict(
        sorted(statistics_data["since_bar_chart_data"].items())
    )

    no_provider_file_count = (
        total_provider_count
        - statistics_data["v1_provider_file_count"]
        - statistics_data["v2_provider_file_count"]
    )
    statistics_data["provider_file_pie_chart_data"] = [
        {
            "value": statistics_data["v1_provider_file_count"],
            "name": "Provider File (v1)",
            "itemStyle": {"color": "rgb(240, 220, 0)"},
        },
        {
            "value": statistics_data["v2_provider_file_count"],
            "name": "Provider File (v2)",
            "itemStyle": {"color": "rgb(120, 190, 70)"},
        },
        {
            "value": no_provider_file_count,
            "name": "No Provider File",
            "itemStyle": {"color": "rgb(220, 220, 220)"},
        },
    ]

    statistics_data["green_web_check_pie_chart_data"] = [
        {
            "value": statistics_data["green_web_check_count"],
            "name": "Green hosting",
            "itemStyle": {"color": "rgb(120, 190, 70)"},
        },
        {
            "value": total_provider_count - statistics_data["green_web_check_count"],
            "name": "Not green hosted",
            "itemStyle": {"color": "rgb(240, 220, 0)"},
        },
    ]

    statistics_data["server_testing_pie_chart_data"] = [
        {
            "value": statistics_data["server_testing_count"],
            "name": "Providers allowing server testing",
            "itemStyle": {"color": "rgb(120, 190, 70)"},
        },
        {
            "value": statistics_data["v2_provider_file_count"]
            - statistics_data["server_testing_count"],
            "name": "Providers not allowing server testing",
            "itemStyle": {"color": "rgb(240, 220, 0)"},
        },
        {
            "value": total_provider_count - statistics_data["v2_provider_file_count"],
            "name": "No provider file",
            "itemStyle": {"color": "rgb(220, 220, 220)"},
        },
    ]

    with open(DATA_PATH / "statistics.json", "w", encoding="utf-8") as statistics_file:
        statistics_file.write(json.dumps(statistics_data, indent=4))


if __name__ == "__main__":
    arguments = ToolsArgumentParser().parse_args()

    logging.basicConfig(level=arguments.log_level)
    log = logging.getLogger(__name__)
    prepare_provider_data_files()
    create_provider_pages()
    prepare_client_data_file()
    prepare_statistics()
