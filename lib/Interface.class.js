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
     * Adds a method to the interface. The method needs a name to be added to the interface.
     * If there is already a method with the same name, that method gets replaced by the new method.
     *
     * @public
     * @param {!AbstractMethod} method
     * @throws {TypeError}
     * @throws {Error} when the method has no name
     * @return {Interface}
     */
    Public.addMethod = Properties.addMethod = function (method) {
        if (method.constructor !== AbstractMethod) {
            throw new TypeError("The method must be an abstract method");
        }
        this.__methods.addProperty(method);

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