"use strict"; // run code in ES5 strict mode

var Method = require("./Method.class"),
    Interface = require("./Interface.class"),
    inherit = require("./helpers/inherit"),
    is = require("./helpers/is"),
    isEach = require("./helpers/isEach");

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
     * @type {Function}
     */
    Properties.__constructorFunc = null;

    /**
     * @private
     * @type {Array<Interface>}
     */
    Properties.__interfaces = [];

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
     * Returns true if the property is abstract
     *
     * @private
     * @param {AbstractProperty} property
     * @return {Boolean}
     */
    Properties.__isAbstract = function (property) {
        return property.isAbstract() === true;
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
        if (fsPath !== null && is(fsPath).notInstanceOf(String)) {
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
     * @public
     * @param {Method} constructorFunc
     * @throw {TypeError}
     * @return {Class}
     */
    Public.setConstructor = Properties.setConstructor = function (constructorFunc) {
        if (constructorFunc !== null && is(constructorFunc).notInstanceOf(Method)) {
            throw new TypeError("The constructor must be an instance of Method");
        }
        this.__constructorFunc = constructorFunc;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {Method}
     */
    Public.getConstructor = Properties.getConstructor = function () {
        return this.__constructorFunc;
    }.bind(Properties);

    /**
     * @public
     * @param {!Array<Interface>} interfaces
     * @throws {TypeError}
     * @return {Class}
     */
    Public.setInterfaces = Properties.setInterfaces = function (interfaces) {
        if (is(interfaces).notInstanceOf(Array)) {
            throw new TypeError("interfaces must be an array");
        }
        if (isEach(interfaces).instanceOf(Interface) === false) {
            throw new TypeError("interfaces must only contain instances of Interface");
        }
        Properties.__interfaces = interfaces;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {Array<Interface>}
     */
    Public.getInterfaces = Properties.getInterfaces = function () {
        return this.__interfaces;
    }.bind(Properties);

    /**
     * Returns all interfaces inherited from super classes in one single array
     *
     * @public
     * @return {Array<Interface>}
     */
    Public.getInheritedInterfaces = Properties.getInheritedInterfaces = function () {
        var superClass = this.__superClass,
            self = this,
            collectionResult,
            result = [];

        function collectInterfaces(currentClass) {
            var superClass = currentClass.getSuperClass(),
                interfaces = currentClass.getInterfaces();

            if (superClass) {
                collectInterfaces(superClass);
            }

            collectionResult = collectionResult.concat(interfaces);
        }

        function isNew(singleInterface) {
            return self.__interfaces.indexOf(singleInterface) === -1 &&
                result.indexOf(singleInterface) === -1;
        }

        // excludes all interfaces that are already added
        function addToReducedInterfaces(singleInterface) {
            if (isNew(singleInterface)) {
                // this is faster than Array.push
                result[result.length] = singleInterface;
            }
        }

        if (superClass) {
            collectionResult = [];
            collectInterfaces(superClass);
            collectionResult.forEach(addToReducedInterfaces);
        }

        return result;
    }.bind(Properties);

    /**
     * Adds a property to the class. The property needs a name to be added to the class.
     * If there is already a property with the same name, that property gets replaced by the new property.
     *
     * @public
     * @param {AbstractProperty} property
     * @throws {TypeError}
     * @throws {Error} when the property has no name
     * @return {Class}
     */
    Public.addProperty = Properties.addProperty = function (property) {
        this.__properties.addProperty(property);
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
     * Returns all properties of this class, excluding all inherited properties.
     *
     * @public
     * @return {Array}
     */
    Public.getProperties = Properties.getProperties = function () {
        return this.__properties.getProperties();
    }.bind(Properties);

    /**
     * Returns all inherited properties from the super classes in a single array
     *
     * @public
     * @return {Array}
     */
    Public.getInheritedProperties = Properties.getInheritedProperties = function () {
        var superClass = this.__superClass,
            propertyFilter = new PropertyFilter({
                "Private": false    // private properties cannot be inherited
            }),
            collection = new PropertyCollection(propertyFilter);

        function collectProperties(currentClass) {
            var superClass = currentClass.getSuperClass(),
                props = currentClass.getProperties(),
                currentProp,
                i;

            if (superClass) {
                // First we do the recursive call for the super class.
                // After that we add the property to superProps.
                // This way, result contains only non-overridden properties.
                collectProperties(superClass);
            }

            for (i = 0; i < props.length; i++) {
                currentProp = props[i];
                collection.addProperty(currentProp);
            }
        }

        if (superClass) {
            collectProperties(superClass);
        }

        return collection.getProperties();
    }.bind(Properties);

    /**
     * Returns true if at least one property is abstract
     *
     * @public
     * @return {Boolean}
     */
    Public.isAbstract = Properties.isAbstract = function () {
        var properties = this.__properties.getProperties();

        return properties.some(this.__isAbstract);
    }.bind(Properties);

    inherit(Properties.Super, Public);
    construct();
}

module.exports = Class;