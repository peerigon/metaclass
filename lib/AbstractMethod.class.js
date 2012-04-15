"use strict"; // run code in ES5 strict mode

var inherit = require("./helpers/inherit"),
    is = require("./helpers/is"),
    AbstractProperty = require("./AbstractProperty.class"),
    Param = require("./Param.class");

/**
 * Represents a class method
 *
 * @constructor
 * @extends AbstractProperty
 */
function AbstractMethod() {
    var Properties = {
            Super: new AbstractProperty()
        },
        Public = this;

    /**
     * @private
     * @type {Array}
     */
    Properties.__requiredParams = [];

    /**
     * @private
     * @type {Array}
     */
    Properties.__optionalParams = [];

    /**
     * Sets a required parameter for a method.
     *
     * If you pass null as param, the param will be deleted from list.
     *
     * @public
     * @param {!Number} index whether it's the first, second, ... param. Starting with 0.
     * @param {Param} param
     * @throws {TypeError}
     * @throws {RangeError} when the index is out of range
     * @throws {Error} when the param is optional
     * @return {AbstractMethod}
     */
    Public.setRequiredParam = Properties.setRequiredParam = function (index, param) {
        if (is(index).notInstanceOf(Number)) {
            throw new TypeError("The index must be a number");
        }
        if (index < 0 || index > this.__requiredParams.length) {
            throw new RangeError("The index must be greater than 0 and not greater than the number of required params");
        }

        if (param === null) {
            this.__requiredParams.splice(index, 1);
        } else {
            if (is(param).notInstanceOf(Param)) {
                throw new TypeError("The param must be an instance of Param");
            }
            if (param.getOptional() !== false) {
                throw new Error("The param must not be optional");
            }

            this.__requiredParams[index] = param;
        }

        return Public;
    }.bind(Properties);

    /**
     * Returns an array with all required params
     *
     * @public
     * @return {Array}
     */
    Public.getRequiredParams = Properties.getRequiredParams = function () {
        return this.__requiredParams.concat();
    }.bind(Properties);

    /**
     * Sets an optional parameter for a method.
     *
     * If you pass null as param, the param will be deleted from list.
     *
     * @public
     * @param {!Number} index whether it's the first, second, ... optional param. Starting with 0.
     * @param {Param} param
     * @throws {TypeError}
     * @throws {RangeError} when the index is out of range
     * @throws {Error} when the param is optional
     * @return {AbstractMethod}
     */
    Public.setOptionalParam = Properties.setOptionalParam = function (index, param) {
        if (is(index).notInstanceOf(Number)) {
            throw new TypeError("The index must be a number");
        }
        if (index < 0 || index > this.__optionalParams.length) {
            throw new RangeError("The index must be greater than 0 and not greater than the number of optional params");
        }

        if (param === null) {
            this.__optionalParams.splice(index, 1);
        } else {
            if (is(param).notInstanceOf(Param)) {
                throw new TypeError("The param must be an instance of Param");
            }
            if (param.getOptional() !== true) {
                throw new Error("The param must be optional");
            }

            this.__optionalParams[index] = param;
        }

        return Public;
    }.bind(Properties);

    /**
     * Returns an array with all optional params
     *
     * @public
     * @return {Array}
     */
    Public.getOptionalParams = Properties.getOptionalParams = function () {
        return this.__optionalParams.concat();
    }.bind(Properties);

    /**
     * Returns the number of required params
     *
     * @public
     * @return {Number}
     */
    Public.getNumOfRequiredParams = Properties.getNumOfRequiredParams = function () {
        return this.__requiredParams.length;
    }.bind(Properties);

    /**
     * Returns the number of all params
     *
     * @public
     * @return {Number}
     */
    Public.getNumOfParams = Properties.getNumOfParams = function () {
        return this.__requiredParams.length + this.__optionalParams.length;
    }.bind(Properties);

    /**
     * @public
     * @return {Boolean}
     */
    Public.isAbstract = Properties.isAbstract = function () {
        return true;
    }.bind(Properties);

    inherit(Properties.Super, Public);
}

/**
 * @public
 * @const
 * @static
 * @type {Function}
 */
AbstractMethod.Extends = AbstractProperty;

module.exports = AbstractMethod;
