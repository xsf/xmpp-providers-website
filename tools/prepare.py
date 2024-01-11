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
from datetime import datetime
from datetime import UTC
from pathlib import Path

from defusedxml.ElementTree import parse
from defusedxml.ElementTree import ParseError

from tools.common import API_VERSION
from tools.common import BADGES_PATH
from tools.common import DATA_PATH
from tools.common import DOCKER_DOWNLOAD_PATH
from tools.common import download_file
from tools.common import DOWNLOAD_PATH
from tools.common import initialize_directory
from tools.common import PROVIDERS_JSON_PATH
from tools.common import PROVIDERS_PAGES_PATH
from tools.common import STATIC_PATH

FILTERED_PROVIDERS_LIST_URL = (
    f"https://data.xmpp.net/providers/{API_VERSION}/providers-D.json"
)
FILTERED_PROVIDERS_RESULTS_URL = (
    f"https://data.xmpp.net/providers/{API_VERSION}/results.zip"
)
BADGES_DATA_URL = f"https://data.xmpp.net/providers/{API_VERSION}/provider-badges.zip"
CLIENTS_DATA_URL = f"https://data.xmpp.net/providers/{API_VERSION}/clients.json"
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

log = logging.getLogger()


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

    _get_filtered_providers_data()
    _get_badges()
    _get_providers_file()

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


def _get_filtered_providers_data() -> None:
    """
    Download, extract, and move providers data.
    Use downloaded file from docker build, if it exists.
    Docker builds need to download providers_results.zip directly in order to
    correctly apply caching.
    """
    log.info("Downloading filtered providers list")
    providers_list_docker_path = Path(DOCKER_DOWNLOAD_PATH / "providers-D.json")
    if providers_list_docker_path.exists():
        shutil.copyfile(providers_list_docker_path, DOWNLOAD_PATH / "providers-D.json")
    else:
        success = download_file(FILTERED_PROVIDERS_LIST_URL, Path("providers-D.json"))
        if not success:
            sys.exit(
                f"Error while trying to download from {FILTERED_PROVIDERS_LIST_URL}"
            )
    shutil.copyfile(
        DOWNLOAD_PATH / "providers-D.json",
        DATA_PATH / "filtered_providers.json",
    )

    log.info("Downloading filtered providers results")
    providers_results_docker_path = Path(DOCKER_DOWNLOAD_PATH / "providers_results.zip")
    if providers_results_docker_path.exists():
        shutil.copyfile(
            providers_results_docker_path, DOWNLOAD_PATH / "providers_results.zip"
        )
    else:
        success = download_file(
            FILTERED_PROVIDERS_RESULTS_URL, Path("providers_results.zip")
        )
        if not success:
            sys.exit(
                f"Error while trying to download from {FILTERED_PROVIDERS_RESULTS_URL}"
            )

    with zipfile.ZipFile(DOWNLOAD_PATH / "providers_results.zip", "r") as zip_file:
        zip_file.extractall(DOWNLOAD_PATH / "providers_results")

    shutil.copytree(DOWNLOAD_PATH / "providers_results", DATA_PATH / "results")


def _get_badges() -> None:
    """
    Download, extract, and move badges
    Use downloaded file from docker build, if it exists.
    Docker builds need to download badges_data.zip directly in order to
    correctly apply caching.
    """
    log.info("Downloading badges")
    badges_docker_path = Path(DOCKER_DOWNLOAD_PATH / "badges_data.zip")
    if badges_docker_path.exists():
        shutil.copyfile(badges_docker_path, DOWNLOAD_PATH / "badges_data.zip")
    else:
        success = download_file(BADGES_DATA_URL, Path("badges_data.zip"))
        if not success:
            sys.exit(f"Error while trying to download from {BADGES_DATA_URL}")

    with zipfile.ZipFile(DOWNLOAD_PATH / "badges_data.zip", "r") as zip_file:
        zip_file.extractall(DOWNLOAD_PATH / "badges_data")

    shutil.copytree(DOWNLOAD_PATH / "badges_data", BADGES_PATH, dirs_exist_ok=True)


def _get_providers_file() -> None:
    """
    Download providers.json from https://data.xmpp.net/ API endpoint.
    Use downloaded file from docker build, if it exists.
    Docker builds need to download providers.json directly in order to
    correctly apply caching.
    """
    log.info("Downloading providers file")
    providers_file_docker_path = Path(DOCKER_DOWNLOAD_PATH / "providers.json")
    if providers_file_docker_path.exists():
        shutil.copyfile(providers_file_docker_path, DOWNLOAD_PATH / "providers.json")
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
    log.info("Creating provider pages")
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


def _parse_doap_infos(doap_file: str) -> dict[str, list[str]] | None:
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
    log.info("Downloading clients list file")
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

    log.info("Parsing clients list infos")
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
                log.info("Downloading DOAP file for: %s", package["name"])
                download_file(
                    package["doap"],
                    Path(f'clients_data/doap_files/{package["name"]}.doap'),
                )
            parsed_infos = _parse_doap_infos(package["name"])

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
