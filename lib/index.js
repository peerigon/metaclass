module.exports = {
    helpers: {
         inherit: require("./helpers/inherit"),
         is: require("./helpers/is")
    },
    AbstractMethod: require("./AbstractMethod.class"),
    AbstractProperty: require("./AbstractProperty.class"),
    Class: require("./Class.class"),
    Comment: require("./Comment.class"),
    Interface: require("./Interface.class"),
    Method: require("./Method.class"),
    Package: require("./Package.class"),
    Property: require("./Property.class"),
    PropertyCollection: require("./PropertyCollection.class"),
    Visibility: require("./Visibility.class")
};