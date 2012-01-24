"use strict"; // run code in ES5 strict mode

var AbstractProperty = require("./AbstractProperty.class");

/**
 * Represents an implemented property
 *
 * @class Property
 * @extends lib.AbstractProperty
 */
function Property() {
    var This = this;
    this.Public = {};

    /**
     * @private
     * @type {Mixed}
     */
    this.initialValue = null;

    /**
     * @public
     * @param {Mixed} newInitialValue
     * @return {lib.Property}
     */
    this.setInitialValue = this.Public.setInitialValue = function setInitialValue(newInitialValue) {

        this.initialValue = newInitialValue;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {Mixed}
     */
    this.getInitialValue = this.Public.setInitialValue = function getInitialValue() {

        return this.initialValue;

    }.bind(this);

    return This.Public;
}

module.exports = function Constructor() {
    Property.prototype = new AbstractProperty();
    return new Property();
};