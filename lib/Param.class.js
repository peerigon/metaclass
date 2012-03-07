"use strict"; // run code in ES5 strict mode

var construct = require("./helpers/construct.js");

/**
 * Represents a parameter for a function
 *
 * @constructor
 */
function Param() {
    var Public = {constructor: this.constructor},
        self = this;

    this.Public = Public;

    /**
     * @private
     * @type {string}
     */
    this.__name = null;

    /**
     * @public
     * @param {string} name
     * @return {Param}
     */
    Public.setName = this.setName = function (name) {
        if (typeof )
        this.__name = name;
        return Public;
    }.bind(this);

    /**
     * @public
     * @return {string}
     */
    Public.getName = this.getName = function () {
        return this.__name;
    }.bind(this);

    return construct.call(this);
}

module.exports = Param;