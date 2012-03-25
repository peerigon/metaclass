"use strict"; // run code in ES5 strict mode

var AbstractProperty = require("../../lib/AbstractProperty.class"),
    AbstractMethod = require("../../lib/AbstractMethod.class"),
    Property = require("../../lib/Property.class"),
    Method = require("../../lib/Method.class"),
    Visibility = require("../../lib/Visibility.class");

/**
 * Returns the property specified by the description. The description should be
 * a string like "instance abstract method public", etc.
 *
 * @param {!String} propertyDescription
 * @return {AbstractProperty}
 */
function createProperty(propertyDescription) {
    var prop;

    if (propertyDescription.match("abstract")) {   // IF TRUE: It's abstract
        if (propertyDescription.match("attribute")) {  // IF TRUE: It's an abstract attribuite
            prop = new AbstractProperty();
        } else { // IF TRUE: It's an abstract method
            prop = new AbstractMethod();
        }
    } else { // IF TRUE: It's implemented
        if (propertyDescription.match("attribute")) { // IF TRUE: It's an implemented attribute
            prop = new Property();
        } else { // IF TRUE: It's an implemented method
            prop = new Method();
        }
    }

    prop.setName(propertyDescription);

    if (propertyDescription.match("static")) { // IF TRUE: It's static
        prop.setStatic(true);
    } else { // IF TRUE: It's an instance property
        prop.setStatic(false);
    }

    if (propertyDescription.match("public")) { // IF TRUE: It's public
        prop.setVisibility(Visibility.PUBLIC);
    } else if (propertyDescription.match("protected")) { // IF TRUE: It's protected
        prop.setVisibility(Visibility.PROTECTED);
    } else { // IF TRUE: It's private
        prop.setVisibility(Visibility.PRIVATE);
    }

    return prop;
}

module.exports = createProperty;