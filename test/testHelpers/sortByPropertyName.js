"use strict"; // run code in ES5 strict mode

/**
 * This function can be passed to Array#sort to sort an array that contains
 * instances of AbstractProperty. All instances are sorted by their name
 * calling #getName()
 *
 * @param {AbstractProperty} prop1
 * @param {AbstractProperty} prop2
 * @return {Integer} Can be 1, -1 or 0.
 */
function sortByPropertyName(prop1, prop2) {
    var prop1Name = prop1.getName(),
        prop2Name = prop2.getName();

    if (prop1Name > prop2Name) {
        return 1;
    } else if (prop1Name < prop2Name) {
        return -1;
    } else {
        return 0;
    }
}

module.exports = sortByPropertyName;