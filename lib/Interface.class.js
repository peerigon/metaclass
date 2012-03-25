"use strict"; // run code in ES5 strict mode

var is = require("./helpers/is");

/**
 * Represents an interface
 *
 * @constructor
 * @param {PropertyCollection} propCollection
 */
function Interface(propCollection, PropertyCollection, AbstractMethod) {
    var Properties = {},
        Public = this;

    AbstractMethod = AbstractMethod || require("./AbstractMethod.class.js");
    PropertyCollection = PropertyCollection || require("./PropertyCollection.class.js");

    /**
     * Constructor
     */
    function construct() {
        var propertyCollectionIs = is(propCollection);

        if (propertyCollectionIs.existent() && propertyCollectionIs.notInstanceOf(PropertyCollection)) {
            throw new TypeError("The class requires an instance of PropertyCollection");
        } else {
            propCollection = new PropertyCollection();
        }
        Properties.__methods = propCollection;
    }

    /**
     * @private
     * @type {!PropertyCollection}
     */
    Properties.__methods = undefined;

    /**
     * @public
     * @param {!AbstractMethod} method
     * @throws {TypeError}
     * @throws {Error}
     */
    Public.setMethod = Properties.setMethod = function (method) {
        if (method.constructor !== AbstractMethod) {
            throw new TypeError("The method must be an abstract method");
        }
        this.__methods.setProperty(method);

        return Public;
    }.bind(Properties);

    /**
     * @public
     * @param {!String} name
     * @param {Boolean=false} isStatic
     * @throws {TypeError}
     * @return {AbstractMethod}
     */
    Public.getMethod = Properties.getMethod = function (name, isStatic) {
        return this.__methods.getProperty(name, isStatic);
    }.bind(Properties);

    /**
     * @public
     * @param {!String} methodName
     * @throws {TypeError}
     * @return {AbstractMethod}
     */
    Public.removeMethod = Properties.removeMethod = function (methodName) {
        return this.__methods.removeProperty(methodName);
    }.bind(Properties);

    /**
     * Returns all methods
     *
     * @public
     * @return {Array} array with all queried properties
     */
    Public.getMethods = Properties.getMethods = function () {
        return this.__methods.getProperties();
    }.bind(Properties);

    construct();
}

module.exports = Interface;