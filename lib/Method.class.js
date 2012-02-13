"use strict"; // run code in ES5 strict mode

var construct = require("./helpers/construct"),
    AbstractMethod = require("./AbstractMethod.class");

/**
 * Represents a class method
 *
 * @class lib.Method
 * @extends lib.AbstractMethod
 */
module.exports = function Method() {
    var Public = {constructor: this.constructor},
        self = this;

    this.Public = Public;
    this.Super = new AbstractMethod();

    /**
     * @private
     * @type {js.String}
     */
    this.__code = null;

    /**
     * Sets an implementation code for this method
     *
     * @public
     * @param {js.String} code
     * @return {lib.Method}
     */
    this.setCode = Public.setCode = function (code) {
        if (typeof code !== "string" && code !== null) {
            throw new TypeError("The code must be a string");
        }

        this.__code = code;

        return Public;
    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    this.getCode = Public.getCode = function () {
        return this.__code;
    }.bind(this);

    /**
     * @public
     * @return {js.Boolean}
     */
    Public.isAbstract = this.isAbstract = function () {
        return false;
    }.bind(this);

    return construct.call(this);
};