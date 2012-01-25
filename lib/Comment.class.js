"use strict"; // run code in ES5 strict mode

/**
 * Represents a comment in the source code
 *
 * @class Comment
 * @extends js.String
 */
function Comment() {
    var self = this;

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    /**
     * @private
     * @type {js.String}
     */
    this.__description = "";

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
    this.setDescription = this.Public.setDescription = function (descr) {

        var lastChar = descr.charAt(descr.length - 1);

        if (lastChar !== "\n") { // IF TRUE: Adding a line break at the end, if there is none
            descr += "\n";
        }
        this.__description = descr;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    this.getDescription = this.Public.getDescription = function () {

        return this.__description;

    }.bind(this);

    /**
     * @public
     * @param {js.String} name everything after the @-sign
     * @param {js.String} value everything after the first space
     * @return {lib.Comment}
     */
    this.setTag = this.Public.setTag = function (name, value) {

        this.__tags[name] = value;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @param {js.String} name everything after the @-sign
     * @return {js.String}
     */
    this.getTag = this.Public.getTag = function (name) {

        return this.__tags[name];

    }.bind(this);

    /**
     * Returns the comment as a string
     *
     * @public
     * @return {js.String}
     */
    this.toString = this.Public.toString = function () {

        var result = this.__description + "\n",
            tags = this.__tags,
            key,
            value;

        for (key in tags) {
            if (tags.hasOwnProperty(key)) {
                value = tags[key];
                result += "@" + key + " " + value + "\n";
            }
        }

        return result;

    }.bind(this);

    return this.Public;
}

module.exports = function Constructor() {
    Comment.prototype = new String(); // ignore JSLint warning here, it's the right way to do
    return new Comment();
};