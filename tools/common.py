# SPDX-FileCopyrightText: 2024 XMPP Providers Team
#
# SPDX-License-Identifier: AGPL-3.0-or-later

import json
import logging
import shutil
from http import HTTPStatus
from pathlib import Path

import requests
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
LOG_FORMAT = "%(levelname)-8s %(module)-16s %(message)s"

log = logging.getLogger()


def download_file(url: str, path: Path) -> bool:
    """
    Downloads file from url and stores it in /downloads/path
    returns success
    """
    try:
        file_response = requests.get(url, timeout=5)
    except (ConnectTimeout, ReadTimeout):
        log.exception("Error while trying to download from %s", url)
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


def initialize_directory(path: Path) -> None:
    """Remove path (if it exists) and containing files, then recreate path"""
    if path.exists() and path.is_dir():
        shutil.rmtree(path)

    path.mkdir()
