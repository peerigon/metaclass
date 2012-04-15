"use strict"; // run code in ES5 strict mode

var is = require("./helpers/is");

/**
 * Represents a parameter for a function
 *
 * @constructor
 */
function Param() {
    var Properties = {},
        Public = this;

    /**
     * @private
     * @type {String}
     */
    Properties.__name = null;

    /**
     * @private
     * @type {!String}
     */
    Properties.__type = "*";    // all possible types

    /**
     * @private
     * @type {!Boolean}
     */
    Properties.__optional = false;

    /**
     * @public
     * @param {String} name
     * @throws {TypeError}
     * @return {Param}
     */
    Public.setName = Properties.setName = function (name) {
        if (name !== null && is(name).notInstanceOf(String)) {
            throw new TypeError("The name must be null or a String");
        }
        this.__name = name;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getName = Properties.getName = function () {
        return this.__name;
    }.bind(Properties);

    /**
     * The type must be a string, that describes the param's type.
     * For more information check the type section of:
     * @see https://developers.google.com/closure/compiler/docs/js-for-compiler
     *
     * @public
     * @param {!String} type
     * @throws {TypeError}
     * @return {Param}
     */
    Public.setType = Properties.setType = function (type) {
        if (is(type).notInstanceOf(String)) {
            throw new TypeError("The type must be a string, that describes the param's type");
        }
        this.__type = type;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {!String}
     */
    Public.getType = Properties.getType = function () {
        return this.__type;
    }.bind(Properties);

    /**
     * @public
     * @param {!Boolean} optional
     * @return {Param}
     */
    Public.setOptional = Properties.setOptional = function (optional) {
        if (is(optional).notInstanceOf(Boolean)) {
            throw new TypeError("The optional value must be boolean");
        }
        this.__optional = optional;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {!Boolean}
     */
    Public.getOptional = Properties.getOptional = function () {
        return this.__optional;
    }.bind(Properties);
}

module.exports = Param;