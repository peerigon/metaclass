"use strict"; // run code in ES5 strict mode

/**
 * Creates every possible combination of the given strings. It expects an array
 * of different arrays, each containing different strings. Strings that are
 * in the same array will not be combined, strings in different arrays will.
 *
 * For instance:
 * If you pass: [["static", "instance"], ["abstract", "implemented"]]
 * It will create: ["static abstract", "static implemented", "instance abstract", "instance implemented"]
 *
 * @param {Array.<Array.<String>>}
 * @return {Array.<String>}
 */
function combineStrings(possibleCombinations) {
    var combinations = [];

    function combine(currentRowIndex, result) {
        var currentColumn,
            tempResult,
            currentRow = possibleCombinations[currentRowIndex];

        result = result || "";
        for (currentColumn = 0; currentColumn < currentRow.length; currentColumn++) {
            tempResult = result + currentRow[currentColumn];
            if (currentRowIndex === possibleCombinations.length - 1) {
                combinations.push(tempResult);
            } else {
                combine(currentRowIndex + 1, tempResult + " ");
            }
        }
    }

    combine(0);

    return combinations;
}

module.exports = combineStrings;