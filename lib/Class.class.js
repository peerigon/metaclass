"use strict"; // run code in ES5 strict mode

var Property = require("./Property.class");

/**
 * Represents a class
 *
 * @class Class
 */
function Class() {
    var self = this;

    /**
     * @private
     * @type {js.String}
     */
    this.__classId = null;

    /**
     * @private
     * @type {js.Obect}
     */
    this.__instanceProperties = {};

    /**
     * @private
     * @type {js.Obect}
     */
    this.__staticProperties = {};

    /**
     * @private
     * @type {lib.Class}
     */
    this.__parentClass = null;

    /**
     * @public
     * @param {js.String} classId
     * @return {lib.Class}
     */
    this.setClassId = this.Public.setClassId = function (classId) {

        this.__classId = classId;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    this.getClassId = this.Public.getClassId = function () {

        return this.__classId;

    }.bind(this);

    /**
     * @public
     * @param {lib.Class} parentClass
     * @return {lib.Class}
     */
    this.setParentClass = this.Public.setParentClass = function (parentClass) {

        this.__parentClass = parentClass;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {lib.Class}
     */
    this.getParentClass = this.Public.getParentClass = function () {

        return this.__parentClass;

    }.bind(this);

    /**
     * If you don't pass a visibility, all instance properties are returned
     *
     * @public
     * @param {js.String=undefined} visibility a visibility type from lib.Visibility
     * @param {js.Boolean=true} includeAbstracts
     * @return {js.Array}
     */
    this.getInstanceProperties = this.Public.getInstanceProperties = function (visibility, includeAbstracts) {

        var result = [],
            properties = this.__instanceProperties,
            key,
            prop;

        function checkVisibility(prop) {
            return visibility === undefined || prop.getVisibility() === visibility;
        }

        function checkAbstract(prop) {
            return includeAbstracts === true || prop instanceof Property === true;
        }

        if (includeAbstracts === undefined) {
            includeAbstracts = true;
        }
        for (key in properties) {
            if (properties.hasOwnProperty(key)) {
                prop = properties[key];
                if (checkVisibility(prop) && checkAbstract(prop)) {
                    result.push(prop);
                }
            }
        }

        return result;

    }.bind(this);

    /**
     * @public
     * @param {lib.AbstractProperty} property
     * @return {lib.Class}
     */
    this.setProperty = this.Public.setProperty = function (property) {

        this.__properties[property.getName()] = property;
        return this.Public;

    }.bind(this);

    /**
     * @public
     * @return {lib.AbstractProperty}
     */
    this.getProperty = this.Public.getProperty = function () {

        return this.__properties;

    }.bind(this);

    return this.Public;
}

module.exports = Class;