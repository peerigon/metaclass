"use strict"; // run code in ES5 strict mode

var Property = require("./Property.class");

/**
 * Represents a method
 *
 * @class Method
 * @extends lib.Property
 */
function Method() {

    function Public() {}
    Public.prototype = this.constructor.prototype;
    this.Public = new Public();
    this.Super = Public.prototype;

    /**
     * @private
     * @type {js.Array}
     */
    this.__requiredParams = [];

    /**
     * @private
     * @type {js.Array}
     */
    this.__optionalParams = [];

    /**
     * An array with classIds, that indicate which type the parameter should be.
     * Use undefined for mixed types.
     *
     * @public
     * @param {js.Array} requiredParams
     * @param {js.Array=[]} optionalParams
     * @return {lib.Method}
     */
    this.setParamList = this.Public.setParamList = function (requiredParams, optionalParams) {

        this.__requiredParams = requiredParams;
        if (Array.isArray(optionalParams)) {
            this.__optionalParams = optionalParams;
        }
        return this.Public;

    };

    /**
     * @public
     * @return {js.Array}
     */
    this.getRequiredParams = this.Public.getRequiredParams = function () {

        return this.__requiredParams;

    }.bind(this);

    /**
     * @public
     * @return {js.Array}
     */
    this.getOptionalParams = this.Public.getOptionalParams = function () {

        return this.__optionalParams;

    }.bind(this);

    return this.Public;
}

module.exports = function Constructor() {
    Method.prototype = new Property();
    return new Method();
};