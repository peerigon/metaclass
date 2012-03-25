"use strict"; // run code in ES5 strict mode

var inherit = require("./helpers/inherit"),
    is = require("./helpers/is");

/**
 * Represents a class with different properties and a possible super class
 *
 * @constructor
 * @param {PropertyCollection} propCollection
 */
function Class(propCollection, PropertyCollection, PropertyFilter) {
    var Properties = {},
        Public = this;

    PropertyCollection = PropertyCollection || require("./PropertyCollection.class.js");
    PropertyFilter = PropertyFilter || require("./helpers/PropertyFilter.class.js");

    /**
     * @private
     * @type {String}
     */
    Properties.__classId = null;

    /**
     * @private
     * @type {String}
     */
    Properties.__path = null;

    /**
     * @private
     * @type {String}
     */
    Properties.__className = null;

    /**
     * @private
     * @type {Class}
     */
    Properties.__superClass = null;

    /**
     * @private
     * @type {!PropertyCollection}
     */
    Properties.__properties = undefined;

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
        Properties.__properties = propCollection;
    }

    /**
     * Returns true if the given property is overridden by a property from the array
     *
     * @private
     * @param {Array} props an array of AbstractProperties
     * @param {AbstractProperty} prop the property to test
     * @return {Boolean}
     */
    Properties.__isOverridden = function (props, prop) {
        function isProperty(currentProp) {
            return prop.getName() === currentProp.getName() &&
                prop.getStatic() === currentProp.getStatic() &&
                prop.isAbstract() === currentProp.isAbstract();     // if this is false, the property is not overridden, it's implemented
        }

        return props.some(isProperty);
    }.bind(Properties);

    /**
     * Path in the file system, where the source file is stored
     *
     * @public
     * @param {String} fsPath
     * @throws {TypeError}
     * @return {Class}
     */
    Public.setPath = Properties.setPath = function (fsPath) {
        if (fsPath !== null && is(fsPath).instanceOf(String)) {
            throw new TypeError("You have to pass null or a string");
        }
        this.__path = fsPath;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getPath = Properties.getPath = function () {
        return this.__path;
    }.bind(Properties);

    /**
     * @public
     * @param {String} classId
     * @throws {TypeError}
     * @return {Class}
     */
    Public.setClassId = Properties.setClassId = function (classId) {
        var classIdSplitted,
            className = null;

        if (classId !== null && is(classId).notInstanceOf(String)) {
            throw new TypeError("The class id must be null or a string");
        }
        if (classId !== null) {
            classIdSplitted = classId.split(".");
            if (classIdSplitted.length === 0) {
                className = classId;
            } else {
                className = classIdSplitted[classIdSplitted.length - 1];
            }
        }
        this.__className = className;
        this.__classId = classId;

        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getClassId = Properties.getClassId = function () {
        return this.__classId;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getClassName = Properties.getClassName = function () {
        return this.__className;
    }.bind(Properties);

    /**
     * @public
     * @param {AbstractProperty} property
     * @throws {TypeError}
     * @return {Class}
     */
    Public.setProperty = Properties.setProperty = function (property) {
        this.__properties.setProperty(property);
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @param {String} propName
     * @param {Boolean=false} isStatic
     * @throws {TypeError}
     * @return {Class}
     */
    Public.getProperty = Properties.getProperty = function (propName, isStatic) {
        return this.__properties.getProperty(propName, isStatic);
    }.bind(Properties);

    /**
     * @public
     * @param {Class} superClass
     * @throws {TypeError}
     * @return {Class}
     */
    Public.setSuperClass = Properties.setSuperClass = function (superClass) {
        if (superClass !== null && is(superClass).notInstanceOf(Class)) {
            throw new TypeError("The superClass must be null or an instance of Class");
        }
        this.__superClass = superClass;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {Class}
     */
    Public.getSuperClass = Properties.getSuperClass = function () {
        return this.__superClass;
    }.bind(Properties);

    /**
     * Removes a property from the class. You may pass the name of the property or the property
     * itself to identify it.
     *
     * Please note: If you just pass the name, every static and non-static method
     * matching that name will be removed.
     *
     * @public
     * @param {String|AbstractMethod} property the property or the property's name
     * @throws {TypeError}
     */
    Public.removeProperty = Properties.removeProperty = function (property) {
        this.__properties.removeProperty(property);
    }.bind(Properties);

    /**
     * Returns all properties of this class and all super classes
     *
     * @public
     * @return {Array}
     */
    Public.getProperties = Properties.getProperties = function () {
        var result;

        if (this.__superClass) {
            result = this.__superClass.getProperties();
        } else {
            result = [];
        }
        result = result.concat(this.__properties.getProperties());

        return result;
    }.bind(Properties);

    /**
     * @public
     * @return {Array} a PropertyCollection with all inherited properties, that are overridden by this class
     */
    Public.getOverriddenProperties = Properties.getOverriddenProperties = function () {
        var self = this,
            result,
            superProps,
            propertyFilter = new PropertyFilter({
                "Private": false    // private properties cannot be overridden
            });

        function collectSuperProperties(currentClass) {
            var i,
                superClass = currentClass.getSuperClass(),
                props = currentClass.getProperties(),
                currentProp,
                result;

            // First we do the recursive call for the super class.
            // After that we add the property to superProps.
            // This way, superProps contains only properties, that are NOT overridden.
            if (superClass === null) {
                result = [];
            } else {
                result = collectSuperProperties(superClass); // recursive call
            }
            props = propertyFilter.applyOn(props);
            for (i = 0; i < props.length; i++) {
                currentProp = props[i];
                if (propertyFilter.test(currentProp)) {
                    result.push(currentProp);
                }
            }

            return result;
        }

        function filterOverriddenProperties(superProps, thisProps) {
            var i,
                superProp;

            for (i = 0; i < superProps.length; i++) {
                superProp = superProps[i];
                if (self.__isOverridden(thisProps, superProp)) {    // IF TRUE: The superProp is overridden
                    result[i] = superProp;
                }
            }
        }

        if (this.__superClass === null) {
            result = [];
        } else {
            superProps = collectSuperProperties(this.__superClass);
            result = filterOverriddenProperties(superProps, this.getProperties());
        }

        return result;
    }.bind(Properties);

    /**
     * @public
     * @return {Boolean}
     */
    Public.isAbstract = Properties.isAbstract = function () {
        var properties = this.getProperties({
            Inherited: false,
            Implemented: false
        });

        return properties.length > 0;
    }.bind(Properties);

    inherit(Properties.Super, Public);
    construct();
}

module.exports = Class;