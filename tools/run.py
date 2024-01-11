# SPDX-FileCopyrightText: 2024 XMPP Providers Team
#
# SPDX-License-Identifier: AGPL-3.0-or-later

import logging
import sys
from argparse import ArgumentParser

from tools.common import LOG_FORMAT
from tools.prepare import create_provider_pages
from tools.prepare import prepare_client_data_file
from tools.prepare import prepare_provider_data_files
from tools.statistics import prepare_statistics


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

        subparsers = self.add_subparsers(dest="command", parser_class=ArgumentParser)
        subparsers.add_parser(
            "prepare_website",
            help="Downloads providers data and prepages pages.",
        )


if __name__ == "__main__":
    arguments = ToolsArgumentParser().parse_args(
        args=None if sys.argv[1:] else ["--help"]
    )

    logging.basicConfig(level=arguments.log_level, format=LOG_FORMAT)
    log = logging.getLogger()

    if arguments.command == "prepare_website":
        prepare_provider_data_files()
        create_provider_pages()
        prepare_client_data_file()
        prepare_statistics()
        log.info("Website data prepared")
