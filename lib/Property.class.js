"use strict"; // run code in ES5 strict mode

var AbstractProperty = require("./AbstractProperty.class");

/**
 * Represents an implemented property
 *
 * @class Property
 * @extends lib.AbstractProperty
 */
module.exports = function Property() {
    var Public = {constructor: this.constructor},
        self = this;

    Public.Super = this.Super = new AbstractProperty();

    /**
     * @private
     * @type {js.String}
     */
    this.__initialValue = null;

    /**
     * @private
     * @type {js.Boolean=false}
     */
    this.__static = false;

    /**
     * @public
     * @param {js.String} initialValue as eval-ready JavaScript-Code, e.g. "[1, 2, 3]"
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
     * @param {js.Boolean} value
     * @return {lib.Property}
     */
    this.setStatic = Public.setStatic = function (value) {

        if (typeof value !== "boolean") {
            throw new TypeError("The value must be boolean");
        }
        this.__static = value;
        return Public;

    }.bind(this);

    /**
     * @public
     * @return {js.Boolean}
     */
    this.isStatic = Public.isStatic = function () {

        return this.__static;

    }.bind(this);

    Public.instanceOf = function (Class) {return Public.constructor === Class || !self.Super || self.Super instanceof Class; }; return Public;
};