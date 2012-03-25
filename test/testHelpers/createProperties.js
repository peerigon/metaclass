"use strict"; // run code in ES5 strict mode

var createProperty = require("./createProperty.js");

/**
 * Creates a bunch of properties specified by the combinations-array
 *
 * @param {!Array} propertyDescriptions
 * @return {Array} an array with instances of AbstractProperty
 */
function createProperties(propertyDescriptions) {
    var properties = [],
        i,
        prop,
        propName;

    for (i = 0; i < propertyDescriptions.length; i++) {
        propName = propertyDescriptions[i];
        prop = createProperty(propName);
        properties[i] = prop;
    }

    return properties;
}

module.exports = createProperties;