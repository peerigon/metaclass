"use strict"; // run code in ES5 strict mode

var construct = require("./helpers/construct"),
    Class = require("./Class.class");

/**
 * Represents a package that contains classes and declares dependencies
 *
 * @class Package
 */
module.exports = function Package() {
    var Public = {constructor: this.constructor},
        self = this;

    this.Public = Public;

    /**
     * @private
     * @type {js.String}
     */
    this.__name = null;

    /**
     * @private
     * @type {js.Object}
     */
    this.__dependencies = {};

    /**
     * @private
     * @type {js.Object}
     */
    this.__classes = {};

    /**
     * @private
     * @type {js.String}
     */
    this.__fsPath = null;

    /**
     * Path in the file system, where the source file is stored
     *
     * @public
     * @param {js.String} fsPath
     * @return {lib.Package}
     */
    Public.setFsPath = this.setFsPath = function (fsPath) {
        if (fsPath !== null && typeof fsPath !== "string") {
            throw new TypeError("You have to pass null or a string");
        }
        this.__fsPath = fsPath;
        return Public;
    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    Public.getFsPath = this.getFsPath = function () {
        return this.__fsPath;
    }.bind(this);

    /**
     * @public
     * @param {js.String} name
     * @throws {js.TypeError}
     * @return {lib.Package}
     */
    Public.setName = this.setName = function (name) {
        if (name !== null && typeof name !== "string") {
            throw new TypeError("You have to pass null or a string for the name");
        }

        this.__name = name;
        return Public;
    }.bind(this);

    /**
     * @public
     * @return {js.String}
     */
    Public.getName = this.getName = function () {
        return this.__name;
    }.bind(this);

    /**
     * @public
     * @param {lib.Package} package the package on that this package depends
     * @throws {js.TypeError}
     * @return {lib.Package}
     */
    Public.addDependency = this.addDependency = function (pack) {
        if (pack === null || pack.instanceOf === undefined || pack.instanceOf(Package) === false) {
            throw new TypeError("You have to pass an instance of Package");
        }
        if (pack.getName() === null) {
            throw new Error("The package must have a unique name to identify it");
        }
        this.__dependencies[pack.getName()] = pack;
        return Public;
    }.bind(this);

    /**
     * @public
     * @throws {js.TypeError}
     * @return {js.Array}
     */
    Public.getAllDependencies = this.getAllDependencies = function () {
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
    }.bind(this);

    /**
     * @public
     * @param {js.String} name name of the package
     * @throws {js.TypeError}
     * @return {lib.Package}
     */
    Public.getDependency = this.getDependency = function (name) {
        if (typeof name !== "string") {
            throw new TypeError("You have to pass a string to identify the package");
        }
        return this.__dependencies[name] || null;
    }.bind(this);

    /**
     * @public
     * @param {js.String} name name of the package to remove
     */
    Public.removeDependency = this.removeDependency = function (name) {
        if (typeof name !== "string") {
            throw new TypeError("You have to pass a name to identify the package");
        }
        delete this.__dependencies[name];
    }.bind(this);

    /**
     * @public
     * @param {lib.Class} class
     * @throws {js.TypeError}
     * @return {lib.Package}
     */
    Public.addClass = this.addClass = function (cls) {
        if (cls === null || cls.instanceOf === undefined || cls.instanceOf(Class) === false) {
            throw new TypeError("You have to pass an instance of Class");
        }
        if (cls.getClassId() === null) {
            throw new Error("The class must have a unique class id to identify it");
        }
        this.__classes[cls.getClassId()] = cls;
        return Public;
    }.bind(this);

    /**
     * @public
     * @throws {js.TypeError}
     * @return {js.Array}
     */
    Public.getAllClasses = this.getAllClasses = function () {
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
    }.bind(this);

    /**
     * @public
     * @param {js.String} classId
     * @throws {js.TypeError}
     * @return {lib.Package}
     */
    Public.getClass = this.getClass = function (classId) {
        if (typeof classId !== "string") {
            throw new TypeError("You have to pass a class id to identify the class");
        }
        return this.__classes[classId] || null;
    }.bind(this);

    /**
     * @public
     * @param {js.String} classId
     */
    Public.removeClass = this.removeClass = function (classId) {
        if (typeof classId !== "string") {
            throw new TypeError("You have to pass a class id to identify the class");
        }
        delete this.__classes[classId];
    }.bind(this);

    return construct.call(this);
};