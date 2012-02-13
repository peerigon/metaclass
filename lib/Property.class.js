"use strict"; // run code in ES5 strict mode

var construct = require("./helpers/construct"),
    AbstractProperty = require("./AbstractProperty.class");

/**
 * Represents an implemented property
 *
 * @class lib.Property
 * @extends lib.AbstractProperty
 */
module.exports = function Property() {
    var Public = {constructor: this.constructor},
        self = this;

    this.Public = Public;
    this.Super = new AbstractProperty();

    /**
     * @private
     * @type {js.String}
     */
    this.__initialValue = null;

    /**
     * @public
     * @param {js.String} initialValue as eval-ready JavaScript-Code, e.g. "[1, 2, 3]"
     * @throws {js.TypeError}
     * @return {lib.Property}
     */
    this.setInitialValue = Public.setInitialValue = function (initialValue) {
        if (typeof initialValue !== "string" && initialValue !== null) {
            throw new TypeError("The initial value must be a string or null");
        }
        this.__initialValue = initialValue;
        return Public;
    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    this.getInitialValue = Public.getInitialValue = function () {
        return this.__initialValue;
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