"use strict"; // run code in ES5 strict mode

/**
 * Represents a comment in the source code
 *
 * @class Comment
 * @extends js.String
 */
module.exports = function Comment() {
    var Public = {constructor: this.constructor},
        self = this;

    Public.Super = this.Super = new String(); // ignore JSLint warning here, it's the right way to do

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
    * @return {lib.Comment}
    */
    this.setDescription = Public.setDescription = function (descr) {

        var lastChar;

        if (typeof descr !== "string" && descr !== null) {
            throw new TypeError("The description must be a string of course");
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
    * @return {lib.Comment}
    */
    this.setTag = Public.setTag = function (name, value) {

        if (typeof name !== "string") {
            throw new TypeError("The name must be a string and can't be null");
        }
        if (typeof value !== "string" && value !== null) {
            throw new TypeError("The value has to be a string");
        }
        this.__tags[name] = value;

        return Public;

    }.bind(this);

    /**
    * @public
    * @param {js.String} name everything after the @-sign
    * @return {js.String}
    */
    this.getTag = Public.getTag = function (name) {

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

    Public.instanceOf = function (Class) {return Public.constructor === Class || !self.Super || self.Super instanceof Class; }; return Public;
};



