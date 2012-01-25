"use strict"; // run code in ES5 strict mode

var AbstractProperty = require("./AbstractProperty.class");

/**
 * Represents an implemented property
 *
 * @class Property
 * @extends lib.AbstractProperty
 */
function Property() {
    var self = this;

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    /**
     * @private
     * @type {js.String}
     */
    this.initialValue = null;

    /**
     * @private
     * @type {js.Boolean=true}
     */
    this.__static = false;

    /**
     * @public
     * @param {js.String} initialValue as eval-ready JavaScript-Code, e.g. "[1, 2, 3]"
     * @return {lib.Property}
     */
    this.setInitialValue = this.Public.setInitialValue = function (initialValue) {

        this.initialValue = initialValue;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    this.getInitialValue = this.Public.getInitialValue = function () {

        return this.initialValue;

    }.bind(this);

    /**
     * @public
     * @param {js.Boolean} value
     * @return {lib.Property}
     */
    this.setStatic = this.Public.setStatic = function (value) {

        this.__static = value;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {js.Boolean}
     */
    this.isStatic = this.Public.isStatic = function () {

        return this.__static;

    }.bind(this);

    return this.Public;
}

module.exports = function Constructor() {
    Property.prototype = new AbstractProperty();
    return new Property();
};