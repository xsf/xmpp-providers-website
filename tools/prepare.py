'''Download / prepare / process xmpp providers data'''
from datetime import date
from pathlib import Path
import os
import shutil
import sys
import zipfile

import requests

DOWNLOAD_PATH = Path('downloads')
DATA_PATH = Path('data')
BADGES_PATH = Path('static/badges')
PROVIDERS_JSON_PATH = DATA_PATH / 'results'
PROVIDERS_PAGES_PATH = Path('content/provider')

PROVIDERS_DATA_URL = 'https://invent.kde.org/melvo/xmpp-providers/' \
    '-/jobs/artifacts/master/download/?job=filtered-provider-lists'
BADGES_DATA_URL = 'https://invent.kde.org/melvo/xmpp-providers/' \
    '-/jobs/artifacts/master/download/?job=badges'
CLIENTS_DATA_URL = 'https://invent.kde.org/melvo/xmpp-providers/' \
    '-/raw/master/clients.json'

MD_FRONTMATTER = '''---\ntitle: %s\ndate: %s\n---\n
{{< provider-details provider="%s">}}
'''

def status_ok(status_code: int) -> bool:
    '''
    Check if HTTP status code is ok (i.e. in 200/300 region)
    '''
    return 200 >= status_code < 400


def prepare_directory(path: Path) -> None:
    '''
    Remove path and containing files if it exists, then recreate path
    '''
    if path.exists() and path.is_dir():
        shutil.rmtree(path)
        os.mkdir(path)
    else:
        os.mkdir(path)


def download_data_files() -> None:
    '''
    Download and prepare provider data files
    '''
    prepare_directory(DOWNLOAD_PATH)
    prepare_directory(DATA_PATH)
    prepare_directory(BADGES_PATH)

    # Download, extract, and move providers data
    providers_request = requests.get(PROVIDERS_DATA_URL)
    if not status_ok(providers_request.status_code):
        sys.exit(f'Error while trying to download from {PROVIDERS_DATA_URL}')

    with open(f'{DOWNLOAD_PATH}/providers_data.zip',
              'wb') as providers_data_zip:
        providers_data_zip.write(providers_request.content)

    with zipfile.ZipFile(f'{DOWNLOAD_PATH}/providers_data.zip',
                        'r') as zip_file:
        zip_file.extractall(f'{DOWNLOAD_PATH}/providers_data')

    shutil.copyfile(f'{DOWNLOAD_PATH}/providers_data/providers-C.json',
                    f'{DATA_PATH}/providersC.json')
    shutil.copytree(f'{DOWNLOAD_PATH}/providers_data/results',
                    f'{DATA_PATH}/results')

    # Download, extract, and move badges
    badge_request = requests.get(BADGES_DATA_URL)
    if not status_ok(badge_request.status_code):
        sys.exit(f'Error while trying to download from {BADGES_DATA_URL}')

    with open(f'{DOWNLOAD_PATH}/badges_data.zip',
              'wb') as badge_data_zip:
        badge_data_zip.write(badge_request.content)

    with zipfile.ZipFile(f'{DOWNLOAD_PATH}/badges_data.zip', 'r') as zip_file:
        zip_file.extractall(f'{DOWNLOAD_PATH}/badges_data')

    shutil.copytree(f'{DOWNLOAD_PATH}/badges_data/badges', 
                    BADGES_PATH,
                    dirs_exist_ok=True)

    # Download, extract, and move clients data
    clients_request = requests.get(CLIENTS_DATA_URL)
    if not status_ok(clients_request.status_code):
        sys.exit(f'Error while trying to download from {CLIENTS_DATA_URL}')

    os.mkdir(f'{DOWNLOAD_PATH}/clients_data/')
    with open(f'{DOWNLOAD_PATH}/clients_data/clients.json',
              'wb') as clients_data_zip:
        clients_data_zip.write(clients_request.content)

    shutil.copyfile(f'{DOWNLOAD_PATH}/clients_data/clients.json',
                    f'{DATA_PATH}/clients.json')


def create_provider_pages() -> None:
    '''
    Create a .md page per provider
    '''
    prepare_directory(PROVIDERS_PAGES_PATH)

    today = date.today()
    date_formatted = today.strftime('%Y-%m-%d')

    (_, _, filenames) = next(os.walk(PROVIDERS_JSON_PATH))
    for filename in filenames:
        filename = filename[:-5]
        with open(f'{PROVIDERS_PAGES_PATH}/{filename}.md',
                  'w',
                  encoding='utf8') as md_file:
            md_file.write(
                MD_FRONTMATTER % (filename, date_formatted, filename))


if __name__ == '__main__':
    download_data_files()
    create_provider_pages()
