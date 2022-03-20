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
PROVIDERS_JSON_PATH = DATA_PATH / 'results'
PROVIDERS_PAGES_PATH = Path('content/provider')
PROVIDERS_DATA_URL = 'https://invent.kde.org/melvo/xmpp-providers/' \
    '-/jobs/artifacts/master/download/?job=filtered-provider-lists'
MD_FRONTMATTER = '''---\ntitle: %s\ndate: %s\n---\n
{{< provider-details provider="%s">}}
'''

def status_ok(status_code: int) -> bool:
    '''Check if HTTP status code is in 200/300 region'''
    # Status codes ranging from 200 (OK) to 300 (redirects) are okay
    if 200 >= status_code < 400:
        return True
    return False


def download_data_files() -> None:
    '''Download and prepare provider data files'''
    if DOWNLOAD_PATH.exists() and DOWNLOAD_PATH.is_dir():
        shutil.rmtree(DOWNLOAD_PATH)
        os.mkdir(DOWNLOAD_PATH)
    else:
        os.mkdir(DOWNLOAD_PATH)

    if DATA_PATH.exists() and DATA_PATH.is_dir():
        shutil.rmtree(DATA_PATH)
        os.mkdir(DATA_PATH)
    else:
        os.mkdir(DATA_PATH)

    data_request = requests.get(PROVIDERS_DATA_URL)
    if not status_ok(data_request.status_code):
        sys.exit(f'Error while trying to download from {PROVIDERS_DATA_URL}')

    with open(f'{DOWNLOAD_PATH}/providers_data.zip', 'wb') as providers_data_zip:
        providers_data_zip.write(data_request.content)

    with zipfile.ZipFile(f'{DOWNLOAD_PATH}/providers_data.zip', 'r') as zip_file:
        zip_file.extractall(f'{DOWNLOAD_PATH}/extract')

    shutil.copyfile(f'{DOWNLOAD_PATH}/extract/providers-C.json', f'{DATA_PATH}/providersC.json')
    shutil.copytree(f'{DOWNLOAD_PATH}/extract/results', f'{DATA_PATH}/results')


def create_provider_pages() -> None:
    '''Creates a .md page per provider'''
    if PROVIDERS_PAGES_PATH.exists() and PROVIDERS_PAGES_PATH.is_dir():
        shutil.rmtree(PROVIDERS_PAGES_PATH)
        os.mkdir(PROVIDERS_PAGES_PATH)
    else:
        os.mkdir(PROVIDERS_PAGES_PATH)

    today = date.today()
    date_formatted = today.strftime('%Y-%m-%d')

    (_, _, filenames) = next(os.walk(PROVIDERS_JSON_PATH))
    for filename in filenames:
        filename = filename[:-5]
        with open(f'{PROVIDERS_PAGES_PATH}/{filename}.md',
                  'w',
                  encoding='utf8') as md_file:
            md_file.write(MD_FRONTMATTER % (filename, date_formatted, filename))


download_data_files()
create_provider_pages()
