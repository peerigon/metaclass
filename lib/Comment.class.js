"use strict"; // run code in ES5 strict mode

var inherit = require("./helpers/inherit"),
    is = require("./helpers/is");

/**
 * Represents a comment in the source code
 *
 * @constructor
 * @extends String
 */
module.exports = function Comment() {
    var Properties = {
            Super: ""   // inherits string
        },
        Public = this;

    /**
     * @private
     * @type {String}
     */
    Properties.__description = null;

    /**
     * @private
     * @type {Object}
     */
    Properties.__tags = {};

    /**
     * @public
     * @param {String} descr
     * @throws {TypeError}
     * @return {Comment}
     */
    Properties.setDescription = Public.setDescription = function (descr) {
        var lastChar;

        if (descr !== null && is(descr).instanceOf(String)) {
            throw new TypeError("The description must be null or a string of course");
        }
        if (descr !== null) {
            lastChar = descr.charAt(descr.length - 1);
            if (lastChar !== "\n") { // IF TRUE: Adding a line break at the end, if there is none
                descr += "\n";
            }
        }
        this.__description = descr;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Properties.getDescription = Public.getDescription = function () {
        return this.__description;
    }.bind(Properties);

    /**
     * @public
     * @param {String} name everything after the @-sign
     * @param {String} value everything after the first space
     * @throws {TypeError}
     * @return {Comment}
     */
    Properties.setTag = Public.setTag = function (name, value) {
        if (is(name).notInstanceOf(String)) {
            throw new TypeError("The name must be a string and can't be null");
        }
        if (is(name).notInstanceOf(String) && value !== null) {
            throw new TypeError("The value has to be a string or null");
        }
        this.__tags[name] = value;

        return Public;
    }.bind(Properties);

    /**
     * @public
     * @param {String} name everything after the @-sign
     * @throws {TypeError}
     * @return {String}
     */
    Properties.getTag = Public.getTag = function (name) {
        if (is(name).instanceOf(String)) {
            throw new TypeError("The name must be a string and can't be null");
        }
        return this.__tags[name];
    }.bind(Properties);

    /**
     * Returns the comment as a string
     *
     * @public
     * @return {String}
     */
    Properties.toString = Public.toString = function () {

        var result = this.__description || "",
            tags = this.__tags,
            key,
            value;

        if (result) {
            result += "\n";
        }
        for (key in tags) {
            if (tags.hasOwnProperty(key)) {
                value = tags[key];
                result += "@" + key;
                if (value) {
                    result += " " + value;
                }
                result += "\n";
            }
        }

        return result;

    }.bind(Properties);
    Properties.Super.toString = Properties.toString;

    // Passing through all inherited functions, so they are accessable
    Public.charAt = Properties.Super.charAt.bind(Properties.Super);
    Public.charCodeAt = Properties.Super.charCodeAt.bind(Properties.Super);
    Public.toUpperCase = Properties.Super.toUpperCase.bind(Properties.Super);
    Public.concat = Properties.Super.concat.bind(Properties.Super);
    Public.indexOf = Properties.Super.indexOf.bind(Properties.Super);
    Public.lastIndexOf = Properties.Super.lastIndexOf.bind(Properties.Super);
    Public.localeCompare = Properties.Super.localeCompare.bind(Properties.Super);
    Public.match = Properties.Super.match.bind(Properties.Super);
    Public.replace = Properties.Super.replace.bind(Properties.Super);
    Public.search = Properties.Super.search.bind(Properties.Super);
    Public.slice = Properties.Super.slice.bind(Properties.Super);
    Public.split = Properties.Super.split.bind(Properties.Super);
    Public.substr = Properties.Super.substr.bind(Properties.Super);
    Public.substring = Properties.Super.substring.bind(Properties.Super);
    Public.toLocaleLowerCase = Properties.Super.toLocaleLowerCase.bind(Properties.Super);
    Public.toLocaleUpperCase = Properties.Super.toLocaleUpperCase.bind(Properties.Super);
    Public.toLowerCase = Properties.Super.toLowerCase.bind(Properties.Super);
    Public.trim = Properties.Super.trim.bind(Properties.Super);
    Public.trimLeft = Properties.Super.trimLeft.bind(Properties.Super);
    Public.trimRight = Properties.Super.trimRight.bind(Properties.Super);
    Public.valueOf = Properties.Super.valueOf.bind(Properties.Super);

    inherit(Properties.Super, Public);
};



