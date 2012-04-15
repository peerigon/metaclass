"use strict"; // run code in ES5 strict mode

var inherit = require("./helpers/inherit"),
    is = require("./helpers/is"),
    AbstractProperty = require("./AbstractProperty.class.js");

/**
 * Stores a bunch of properties and provides some methods to select these
 *
 * @constructor
 */
function PropertyCollection() {
    var Properties = {},
        Public = this;

    /**
     * @private
     * @type {!Object}
     */
    Properties.__instanceProps = {};

    /**
     * @private
     * @type {!Object}
     */
    Properties.__staticProps = {};

    /**
     * @private
     * @param {Object} propertiesContainer
     * @param {Array=[]} result the array that will contain all properties
     * @return {Array}
     */
    Properties.__getPropertiesFrom = function (propertiesContainer, result) {
        var key,
            method;

        result = result || [];

        for (key in propertiesContainer) {
            if (propertiesContainer.hasOwnProperty(key)) {
                method = propertiesContainer[key];
                result.push(method);
            }
        }

        return result;
    }.bind(Properties);

    /**
     * Adds a property to the collection. The property needs a name to be added to the collection.
     * If there is already a property with the same name, that property gets replaced by the new property.
     *
     * @public
     * @param {!AbstractProperty} property
     * @throws {TypeError}
     * @throws {Error} when the property has no name
     * @return {PropertyCollection}
     */
    Public.addProperty = Properties.addProperty = function (property) {
        var propName;

        if (is(property).notExistent()) {
            throw new TypeError("You have to set an instance of AbstractProperty");
        }
        propName = property.getName();
        if (propName === null) {
            throw new Error("The property needs a name before you add it to the collection");
        }
        if (property.getStatic() === true) {
            this.__staticProps[propName] = property;
        } else {
            this.__instanceProps[propName] = property;
        }

        return Public;
    }.bind(Properties);

    /**
     * @public
     * @param {!String} propName
     * @param {Boolean=false} isStatic
     * @throws {TypeError}
     * @return {AbstractProperty}
     */
    Public.getProperty = Properties.getProperty = function (propName, isStatic) {
        if (is(propName).notInstanceOf(String)) {
            throw new TypeError("The propName must be a string");
        }
        isStatic = isStatic || false;
        if (is(isStatic).notInstanceOf(Boolean)) {
            throw new TypeError("The isStatic param must be boolean or undefined");
        }

        if (isStatic) {
            return this.__staticProps[propName] || null;
        } else {
            return this.__instanceProps[propName] || null;
        }
    }.bind(Properties);

    /**
     * Removes a property from the collection. You may pass the name of the property or the property
     * itself to identify it.
     *
     * Please note: If you just pass the name, every static and non-static property
     * matching that name will be removed.
     *
     * @public
     * @param {!String|!AbstractProperty} property the property or the property's name
     * @throws {TypeError}
     */
    Public.removeProperty = Properties.removeProperty = function (property) {
        var stringIs = is(property),
            propertyIsAString = stringIs.instanceOf(String);

        if ((propertyIsAString || stringIs.instanceOf(AbstractProperty)) === false) {
            throw new TypeError("The method must be a string or an instance of AbstractMethod");
        }

        if (propertyIsAString) {
            delete this.__instanceProps[property];
            delete this.__staticProps[property];
        } else {
            if (property.getStatic() === true) {
                delete this.__staticProps[property.getName()];
            } else {
                delete this.__instanceProps[property.getName()];
            }
        }
    }.bind(Properties);

    /**
     * Returns all properties added to the property collection
     *
     * @public
     * @return {Array} array with all properties
     */
    Public.getProperties = Properties.getProperties = function () {
        var result;

        result = this.__getPropertiesFrom(this.__instanceProps);
        result = this.__getPropertiesFrom(this.__staticProps, result);

        return result;
    }.bind(Properties);

    inherit(Properties.Super, Public);
}

module.exports = PropertyCollection;