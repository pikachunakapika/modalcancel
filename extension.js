/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */
const Main = imports.ui.main;

var modalDialog = imports.ui.modalDialog;

let oldCalls = {};

function registerOverride(name, func) {
    oldCalls[name] = modalDialog.ModalDialog.prototype[name];
    modalDialog.ModalDialog.prototype[name] = func;
}

function removeOverride(name) {
    modalDialog.ModalDialog.prototype[name] = oldCalls[name];
}

function my_init(params) {
    
    oldCalls['_init'].call(this, params);

    if (this.buttonLayout.get_children().length == 0) {
        this.addButton({ label: "Close",
            action: () => {
                this.close();
            }});
    }
}


class Extension {
    constructor() {
    }

    enable() {
        registerOverride('_init', my_init);
    }

    disable() {
        removeOverride('_init');
    }
}

function init() {
    return new Extension();
}
