# SPDX-FileCopyrightText: 2022 XMPP Providers Team
#
# SPDX-License-Identifier: AGPL-3.0-or-later

'''
Download / prepare / process XMPP Providers data
'''
from typing import Optional
from typing import Union

from datetime import date
from pathlib import Path
import json
import os
import shutil
import sys
import zipfile

from defusedxml.ElementTree import parse
from defusedxml.ElementTree import ParseError
import requests

DOWNLOAD_PATH = Path('downloads')
DATA_PATH = Path('data')
STATIC_PATH = Path('static')
BADGES_PATH = STATIC_PATH / 'badge'
PROVIDERS_JSON_PATH = DATA_PATH / 'results'
PROVIDERS_PAGES_PATH = Path('content/provider')

PROVIDERS_DATA_URL = 'https://invent.kde.org/melvo/xmpp-providers/' \
    '-/jobs/artifacts/master/download/?job=filtered-provider-lists'
BADGES_DATA_URL = 'https://invent.kde.org/melvo/xmpp-providers/' \
    '-/jobs/artifacts/master/download/?job=badges'
CLIENTS_DATA_URL = 'https://invent.kde.org/melvo/xmpp-providers/' \
    '-/raw/master/clients.json'
XSF_CLIENTS_LIST_URL = 'https://raw.githubusercontent.com/xsf/xmpp.org/master/' \
    'data/clients.json'

DOAP_NS = 'http://usefulinc.com/ns/doap#'
DOAP_NAME = f'.//{{{DOAP_NS}}}name'
DOAP_OS = f'.//{{{DOAP_NS}}}os'

MD_FRONTMATTER = '''---\ntitle: %s\ndate: %s\n---\n
{{< provider-details provider="%s">}}
'''


def initialize_directory(path: Path) -> None:
    '''
    Remove path (if it exists) and containing files, then recreate path
    '''
    if path.exists() and path.is_dir():
        shutil.rmtree(path)
        os.mkdir(path)
    else:
        os.mkdir(path)


def prepare_provider_data_files() -> None:
    '''
    Download and prepare provider data files
    '''
    initialize_directory(DOWNLOAD_PATH)

    # Temporarily move 'logo' folder and 'recommended_clients.json'
    # in order to clean up directories
    shutil.copytree(STATIC_PATH / 'logo', DOWNLOAD_PATH  / 'logo')
    shutil.copyfile(DATA_PATH / 'recommended_clients.json',
                    DOWNLOAD_PATH / 'recommended_clients.json')

    initialize_directory(STATIC_PATH)
    initialize_directory(DATA_PATH)

    get_providers_data()
    get_badges()

    shutil.copytree(DOWNLOAD_PATH / 'logo', STATIC_PATH  / 'logo')
    shutil.copyfile(DOWNLOAD_PATH / 'recommended_clients.json',
                    DATA_PATH / 'recommended_clients.json')


def download_file(url: str, path: Path) -> bool:
    '''
    Downloads file from url and stores it in /downloads/path
    returns success
    '''
    file_request = requests.get(url)
    if not 200 >= file_request.status_code < 400:
        print('Error while trying to download from ',
              url,
              file_request.status_code)
        return False

    with open(DOWNLOAD_PATH / path, 'wb') as data_file:
        max_size = 1024 * 1024 * 10  # 10 MiB
        size = 0
        for chunk in file_request.iter_content(chunk_size=8192):
            data_file.write(chunk)
            size += len(chunk)
            if size > max_size:
                file_request.close()
                print('File size exceeds 10 MiB:', path)
                return False
    return True


def get_providers_data() -> None:
    '''
    Download, extract, and move providers data
    '''
    success = download_file(PROVIDERS_DATA_URL, Path('providers_data.zip'))
    if not success:
        sys.exit(f'Error while trying to download from {PROVIDERS_DATA_URL}')

    with zipfile.ZipFile(DOWNLOAD_PATH / 'providers_data.zip',
                        'r') as zip_file:
        zip_file.extractall(DOWNLOAD_PATH / 'providers_data')

    shutil.copyfile(DOWNLOAD_PATH / 'providers_data' / 'providers-D.json',
                    DATA_PATH / 'providers.json')
    shutil.copytree(DOWNLOAD_PATH / 'providers_data' / 'results',
                    DATA_PATH / 'results')


def get_badges() -> None:
    '''
    Download, extract, and move badges
    '''
    success = download_file(BADGES_DATA_URL, Path('badges_data.zip'))
    if not success:
        sys.exit(f'Error while trying to download from {BADGES_DATA_URL}')

    with zipfile.ZipFile(DOWNLOAD_PATH / 'badges_data.zip', 'r') as zip_file:
        zip_file.extractall(DOWNLOAD_PATH / 'badges_data')

    shutil.copytree(DOWNLOAD_PATH / 'badges_data' / 'badges',
                    BADGES_PATH,
                    dirs_exist_ok=True)


def create_provider_pages() -> None:
    '''
    Create a .md page per provider
    '''
    initialize_directory(PROVIDERS_PAGES_PATH)

    today = date.today()
    date_formatted = today.strftime('%Y-%m-%d')

    (_, _, filenames) = next(os.walk(PROVIDERS_JSON_PATH))
    for filename in filenames:
        filename = filename[:-5]
        with open(PROVIDERS_PAGES_PATH / f'{filename}.md',
                  'w',
                  encoding='utf8') as md_file:
            md_file.write(
                MD_FRONTMATTER % (filename, date_formatted, filename))


def parse_doap_infos(doap_file: str) -> Optional[dict[str, list[str]]]:
    '''Parse DOAP file and return infos'''
    try:
        doap = parse(
            DOWNLOAD_PATH / f'clients_data/doap_files/{doap_file}.doap')
    except (FileNotFoundError, ParseError):
        return None

    info: dict[str, Union[str, list[str]]] = {}
    doap_name = doap.find(DOAP_NAME)
    if doap_name is not None:
        info['name'] = doap_name.text
    info['os'] = []
    for entry in doap.findall(DOAP_OS):
        info['os'].append(entry.text)
    return info


def prepare_client_data_file() -> None:
    '''
    Download and prepare clients data
    '''
    Path(DOWNLOAD_PATH / 'clients_data/doap_files').mkdir(parents=True)

    success = download_file(
        CLIENTS_DATA_URL, Path('clients_data/providers_clients_list.json'))
    if not success:
        sys.exit(f'Error while trying to download from {CLIENTS_DATA_URL}')

    success = download_file(
        XSF_CLIENTS_LIST_URL, Path('clients_data/xsf_clients_list.json'))
    if not success:
        sys.exit(f'Error while trying to download from {XSF_CLIENTS_LIST_URL}')

    # Use xsf_clients_list.json and providers_clients_list.json
    # to generate clients.json, which features infos from both files
    with open(DOWNLOAD_PATH / 'clients_data' / 'providers_clients_list.json',
              'rb') as json_file:
        providers_clients_list = json.load(json_file)
    with open(DOWNLOAD_PATH / 'clients_data' / 'xsf_clients_list.json',
              'rb') as json_file:
        xsf_clients_list = json.load(json_file)

    client_names: list[str] = []
    for client in providers_clients_list:
        client_names.append(client)

    client_infos: list[dict[str, Optional[str]]] = []
    for client in xsf_clients_list:
        if client['name'] in client_names:
            provider_infos = providers_clients_list[client['name']]
            if client['doap'] is not None:
                download_file(
                    client['doap'],
                    Path(f'clients_data/doap_files/{client["name"]}.doap'))
            parsed_infos = parse_doap_infos(client['name'])

            supported_os = None
            if parsed_infos is not None:
                supported_os = parsed_infos['os']
            client_infos.append({
                'name': client['name'],
                'os': supported_os,
                'since': provider_infos['since']['content'],
                'website': provider_infos['website']['content']
            })

    with open(DATA_PATH / 'implementing_clients.json',
              'w',
              encoding='utf-8') as client_data_file:
        json.dump(client_infos, client_data_file, indent=4)


if __name__ == '__main__':
    prepare_provider_data_files()
    create_provider_pages()
    prepare_client_data_file()
