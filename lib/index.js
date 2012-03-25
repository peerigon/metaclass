"use strict";

var modules,
    exportedModules,
    Comment = require("./Comment.class.js");

modules = {
    helpers: {
         inherit: require("./helpers/inherit.js"),
         is: require("./helpers/is.js")
    },
    AbstractMethod: require("./AbstractMethod.class.js"),
    AbstractProperty: require("./AbstractProperty.class.js"),
    Visibility: require("./Visibility.class.js")
};

exportedModules = {
    helpers: {
         inherit: require("./helpers/inherit.js"),
         is: require("./helpers/is.js")
    },
    /**
     * Represents a class method
     *
     * @constructor
     * @extends AbstractProperty
     */
    AbstractMethod: function () {
        var AbstractMethod = require("./AbstractMethod.class.js");

        AbstractMethod.call(this, Comment);
    },
    /**
     * Represents an abstract class property.
     *
     * @constructor
     */
    AbstractProperty: function () {
        var AbstractProperty = require("./AbstractProperty.class.js");

        AbstractProperty.call(this, Comment);
    },
    /**
     * Represents a class with methods and properties
     *
     * @constructor
     */
    Class: function () {
        var Class = require("./Class.class.js");

        Class.call(this);
    },
    /**
     * Represents a comment in the source code
     *
     * @constructor
     * @extends String
     */
    Comment: function () {
        var Comment = require("./Comment.class");

        Comment.call(this);
    },
    Interface: null,
    Method: function () {
        module.exports.Method.StaticMethod = require("./Method.class").StaticMethod;
    },
    Package: null,
    Property: null,
    PropertyCollection: function () {
        var PropertyCollection = modules.PropertyCollection,
            AbstractProperty = modules.AbstractProperty,
            AbstractMethod = modules.AbstractMethod;

        PropertyCollection.call(this, AbstractMethod, AbstractProperty);
    },
    Visibility: null
};

module.exports = exportedModules;



//TODO Rewrite following modules

/**
 * - Param
 * - Class
 * - this module
 */