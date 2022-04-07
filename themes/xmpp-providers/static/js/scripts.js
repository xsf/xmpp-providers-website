// SPDX-FileCopyrightText: 2022 XMPP Providers Team
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const badge_code_copy = document.getElementById('badge_code_copy');
badge_code_copy.addEventListener('click', function() {
    navigator.clipboard.writeText(document.getElementById('badge_code_input').value);
});
