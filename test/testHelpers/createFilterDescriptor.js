"use strict"; // run code in ES5 strict mode

/**
 * Creates an filter descriptor object that can be passed to the
 * PropertyFilter. Just pass a string that contains all the property types you
 * don't want to filter. Possible words are:
 *
 * - static
 * - instance
 * - abstract
 * - implemented
 * - attribute
 * - method
 * - public
 * - protected
 * - private
 *
 * @param {!String} descriptorString
 * @return {Object}
 */
function createFilterDescriptor(descriptorString) {
    return {
        Static: !!descriptorString.match("static"),
        Instance: !!descriptorString.match("instance"),
        Abstract: !!descriptorString.match("abstract"),
        Implemented: !!descriptorString.match("implemented"),
        Attribute: !!descriptorString.match("attribute"),
        Method: !!descriptorString.match("method"),
        Private: !!descriptorString.match("private"),
        Protected: !!descriptorString.match("protected"),
        Public: !!descriptorString.match("public")
    };
}

module.exports = createFilterDescriptor;