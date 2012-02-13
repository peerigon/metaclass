"use strict"; // run code in ES5 strict mode

var construct = require("./helpers/construct"),
    AbstractMethod = require("./AbstractMethod.class"),
    PropertyCollection = require("./PropertyCollection.class");

/**
 * Represents an interface
 *
 * @class lib.Interface
 */
module.exports = function Interface() {

    var Public = {constructor: this.constructor},
        self = this;

    this.Public = Public;

    /**
     * @private
     * @type {lib.PropertyCollection}
     */
    this.__methods = new PropertyCollection();

    /**
     * @public
     * @param {lib.AbstractMethod} method
     * @throws {js.TypeError}
     */
    Public.setMethod = this.setMethod = function (method) {

        if (method.instanceOf === undefined || method.instanceOf(AbstractMethod) === false) {
            throw new TypeError("The method must be an instance of abstract method");
        }
        this.__methods.setProperty(method);

        return this.Public;
    }.bind(this);

    /**
     * @public
     * @param {js.String} name
     * @param {js.Boolean=false} isStatic
     * @throws {js.TypeError}
     * @return {js.AbstractMethod}
     */
    Public.getMethod = this.getMethod = function (name, isStatic) {
        return this.__methods.getProperty(name, isStatic);
    }.bind(this);

    /**
     * @public
     * @param {js.String} methodName
     * @throws {js.TypeError}
     * @return {js.AbstractMethod}
     */
    Public.removeMethod = this.removeMethod = function (methodName) {
        return this.__methods.removeProperty(methodName);
    }.bind(this);

    /**
     * The filter object is structured by default like this:
     *
     * {
     *      Private: true,
     *      Protected: true,
     *      Public: true,
     *      Static: true,
     *      Instance: true, // equals all properties that are not static
     * }
     *
     * True means, that the method will pass the filter. If a key is missing,
     * the default value true is applied
     *
     * @public
     * @param {js.Object={}} filter
     * @return {js.Array} array with all queried properties
     */
    Public.getMethods = this.getMethods = function (filter) {
        return this.__methods.getProperties(filter);
    }.bind(this);

    return construct.call(this);
};