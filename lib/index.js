"use strict";

module.exports = {
    AbstractMethod: require("./AbstractMethod.class"),
    AbstractProperty: require("./AbstractProperty.class"),
    Class: require("./Class.class"),
    Comment: require("./Comment.class"),
    Interface: require("./Interface.class"),
    Method: require("./Method.class"),
    Package: require("./Package.class"),
    Param: require("./Param.class"),
    Attribute: require("./Attribute.class"),
    PropertyCollection: require("./PropertyCollection.class"),
    Visibility: require("./Visibility.class"),
    helpers: {
        inherit: require("./helpers/inherit"),
        is: require("./helpers/is"),
        isEach: require("./helpers/isEach"),
        PropertyFilter: require("./helpers/PropertyFilter.class")
    }
};