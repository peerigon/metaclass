"use strict"; // run code in ES5 strict mode

var is = require("./helpers/is");

/**
 * Represents a package that contains classes and declares dependencies
 *
 * @constructor
 */
function Package(Class) {
    var Properties = {},
        Public = this;

    Class = Class || require("./Class.class");

    /**
     * @private
     * @type {String}
     */
    Properties.__name = null;

    /**
     * @private
     * @type {!Object}
     */
    Properties.__dependencies = {};

    /**
     * @private
     * @type {!Object}
     */
    Properties.__classes = {};

    /**
     * @private
     * @type {String}
     */
    Properties.__path = null;

    /**
     * Path in the file system, where the source file is stored
     *
     * @public
     * @param {String} path
     * @return {Package}
     */
    Public.setPath = Properties.setPath = function (path) {
        if (path !== null && is(path).notInstanceOf(String)) {
            throw new TypeError("You have to pass null or a string");
        }
        this.__path = path;
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
     * @param {String} name
     * @throws {TypeError}
     * @return {Package}
     */
    Public.setName = Properties.setName = function (name) {
        if (name !== null && is(name).notInstanceOf(String)) {
            throw new TypeError("You have to pass null or a string for the name");
        }

        this.__name = name;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {String}
     */
    Public.getName = Properties.getName = function () {
        return this.__name;
    }.bind(Properties);

    /**
     * @public
     * @param {!Package} package the package on that this package depends, the package needs a name
     * @throws {TypeError}
     * @return {Package}
     */
    Public.addDependency = Properties.addDependency = function (pack) {
        if (is(pack).notInstanceOf(Package)) {
            throw new TypeError("You have to pass an instance of Package");
        }
        if (pack.getName() === null) {
            throw new Error("The package must have a unique name to identify it");
        }
        this.__dependencies[pack.getName()] = pack;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @return {Array} array with instances of Package
     */
    Public.getAllDependencies = Properties.getAllDependencies = function () {
        var name,
            result = [],
            dep,
            deps = this.__dependencies;

        for (name in deps) {
            if (deps.hasOwnProperty(name)) {
                dep = deps[name];
                result.push(dep);
            }
        }

        return result;
    }.bind(Properties);

    /**
     * @public
     * @param {!String} name name of the package
     * @throws {TypeError}
     * @return {Package}
     */
    Public.getDependency = Properties.getDependency = function (name) {
        if (is(name).notInstanceOf(String)) {
            throw new TypeError("You have to pass a string to identify the package");
        }
        return this.__dependencies[name] || null;
    }.bind(Properties);

    /**
     * @public
     * @param {!String} name name of the package to remove
     */
    Public.removeDependency = Properties.removeDependency = function (name) {
        if (is(name).notInstanceOf(String)) {
            throw new TypeError("You have to pass a name to identify the package");
        }
        delete this.__dependencies[name];
    }.bind(Properties);

    /**
     * @public
     * @param {Class} class a class instance with an id
     * @throws {TypeError}
     * @return {Package}
     */
    Public.addClass = Properties.addClass = function (cls) {
        if (is(cls).notInstanceOf(Class)) {
            throw new TypeError("You have to pass an instance of Class");
        }
        if (cls.getClassId() === null) {
            throw new Error("The class must have a unique class id to identify it");
        }
        this.__classes[cls.getClassId()] = cls;
        return Public;
    }.bind(Properties);

    /**
     * @public
     * @throws {TypeError}
     * @return {Array}
     */
    Public.getAllClasses = Properties.getAllClasses = function () {
        var name,
            result = [],
            cls,
            classes = this.__classes;

        for (name in classes) {
            if (classes.hasOwnProperty(name)) {
                cls = classes[name];
                result.push(cls);
            }
        }

        return result;
    }.bind(Properties);

    /**
     * @public
     * @param {!String} classId
     * @throws {TypeError}
     * @return {Package}
     */
    Public.getClass = Properties.getClass = function (classId) {
        if (is(classId).notInstanceOf(String)) {
            throw new TypeError("You have to pass a class id to identify the class");
        }
        return this.__classes[classId] || null;
    }.bind(Properties);

    /**
     * @public
     * @param {!String} classId
     */
    Public.removeClass = Properties.removeClass = function (classId) {
        if (is(classId).notInstanceOf(String)) {
            throw new TypeError("You have to pass a class id to identify the class");
        }
        delete this.__classes[classId];
    }.bind(Properties);
}

module.exports = Package;