// SPDX-FileCopyrightText: 2022 XMPP Providers Team
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const badge_link_copy = document.getElementById('badge_link_copy');
if (badge_link_copy) {
    badge_link_copy.addEventListener('click', function() {
        navigator.clipboard.writeText(document.getElementById('badge_link_input').value);
    });
}
