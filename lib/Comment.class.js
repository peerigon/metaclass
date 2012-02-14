"use strict"; // run code in ES5 strict mode

var construct = require("./helpers/construct");
/**
 * Represents a comment in the source code
 *
 * @class lib.Comment
 * @extends js.String
 */
module.exports = function Comment() {
    var Public = {constructor: this.constructor},
        self = this;

    this.Public = Public;
    this.Super = new String(); // ignore JSLint warning here, it's the right way to do

    /**
    * @private
    * @type {js.String}
    */
    this.__description = null;

    /**
    * @private
    * @type {js.Object}
    */
    this.__tags = {};

    /**
    * @public
    * @param {js.String} descr
    * @throws {js.TypeError}
    * @return {lib.Comment}
    */
    this.setDescription = Public.setDescription = function (descr) {
        var lastChar;

        if (typeof descr !== "string" && descr !== null) {
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
    }.bind(this);

    /**
    * @public
    * @return {js.String}
    */
    this.getDescription = Public.getDescription = function () {
        return this.__description;
    }.bind(this);

    /**
    * @public
    * @param {js.String} name everything after the @-sign
    * @param {js.String} value everything after the first space
    * @throws {js.TypeError}
    * @return {lib.Comment}
    */
    this.setTag = Public.setTag = function (name, value) {
        if (typeof name !== "string") {
            throw new TypeError("The name must be a string and can't be null");
        }
        if (typeof value !== "string" && value !== null) {
            throw new TypeError("The value has to be a string or null");
        }
        this.__tags[name] = value;

        return Public;
    }.bind(this);

    /**
    * @public
    * @param {js.String} name everything after the @-sign
    * @throws {js.TypeError}
    * @return {js.String}
    */
    this.getTag = Public.getTag = function (name) {
        if (typeof name !== "string") {
            throw new TypeError("The name must be a string and can't be null");
        }
        return this.__tags[name];
    }.bind(this);

    /**
    * Returns the comment as a string
    *
    * @public
    * @return {js.String}
    */
    this.toString = Public.toString = function () {

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

    }.bind(this);
    this.Super.toString = this.toString;

    // Passing through all inherited functions, so they are accessable
    Public.charAt = this.Super.charAt.bind(this.Super);
    Public.charCodeAt = this.Super.charCodeAt.bind(this.Super);
    Public.toUpperCase = this.Super.toUpperCase.bind(this.Super);
    Public.concat = this.Super.concat.bind(this.Super);
    Public.indexOf = this.Super.indexOf.bind(this.Super);
    Public.lastIndexOf = this.Super.lastIndexOf.bind(this.Super);
    Public.localeCompare = this.Super.localeCompare.bind(this.Super);
    Public.match = this.Super.match.bind(this.Super);
    Public.replace = this.Super.replace.bind(this.Super);
    Public.search = this.Super.search.bind(this.Super);
    Public.slice = this.Super.slice.bind(this.Super);
    Public.split = this.Super.split.bind(this.Super);
    Public.substr = this.Super.substr.bind(this.Super);
    Public.substring = this.Super.substring.bind(this.Super);
    Public.toLocaleLowerCase = this.Super.toLocaleLowerCase.bind(this.Super);
    Public.toLocaleUpperCase = this.Super.toLocaleUpperCase.bind(this.Super);
    Public.toLowerCase = this.Super.toLowerCase.bind(this.Super);
    Public.trim = this.Super.trim.bind(this.Super);
    Public.trimLeft = this.Super.trimLeft.bind(this.Super);
    Public.trimRight = this.Super.trimRight.bind(this.Super);
    Public.valueOf = this.Super.valueOf.bind(this.Super);

    return construct.call(this);
};



