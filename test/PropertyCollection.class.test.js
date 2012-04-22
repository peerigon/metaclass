"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    is = require("../lib/helpers/is"),
    PropertyCollection = require("../lib/PropertyCollection.class"),
    PropertyFilter = require("../lib/helpers/PropertyFilter.class"),
    AbstractProperty = require("../lib/AbstractProperty.class"),
    Property = require("../lib/Property.class"),
    Method = require("../lib/Method.class"),
    combineStrings = require("./testHelpers/combineStrings.js"),
    createProperties = require("./testHelpers/createProperties.js"),
    sortByPropertyName = require("./testHelpers/sortByPropertyName.js"),
    checkError = require("./testHelpers/checkError.js");

describe("PropertyCollection", function () {
    var instance,
        checkForTypeError = checkError(TypeError),
        checkForError = checkError(Error),
        possibleModes = [
            ["static", "instance"],
            ["abstract", "implemented"],
            ["attribute", "method"],
            ["public", "protected", "private"]
        ],
        propertyDescriptions = combineStrings(possibleModes),
        allPossibleProperties = createProperties(propertyDescriptions);

    allPossibleProperties.sort(sortByPropertyName);
    beforeEach(function () {
        instance = new PropertyCollection();
    });
    it("should return true", function () {
        expect(is(instance).instanceOf(PropertyCollection)).to.be(true);
    });
    it("should accept a property filter", function () {
        expect(function () {
            instance = new PropertyCollection(new PropertyFilter({}));
        }).to.not.throwException();
    });
    it("should throw an exception", function () {
        expect(function () {
            new PropertyCollection(true);
        }).to.throwException(checkForTypeError);
        expect(function () {
            new PropertyCollection(1);
        }).to.throwException(checkForTypeError);
        expect(function () {
            new PropertyCollection("some string");
        }).to.throwException(checkForTypeError);
        expect(function () {
            new PropertyCollection({});
        }).to.throwException(checkForTypeError);
        expect(function () {
            new PropertyCollection(function () {});
        }).to.throwException(checkForTypeError);
    });
    describe("#addProperty", function () {
        it("should return the instance", function () {
            var instanceProp = new Property(),
                staticProp = new Property();

            instanceProp
                .setName("someProperty")
                .setStatic(false);
            staticProp
                .setName("someProperty")     // property with the same name. Should throw no error,
                .setStatic(true);
            expect(instance.addProperty(instanceProp)).to.be(instance);
            expect(instance.addProperty(staticProp)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.addProperty(undefined);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.addProperty(null);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.addProperty(true);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.addProperty(1);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.addProperty("some string");
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.addProperty({});
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.addProperty(new AbstractProperty()); // property without name
            }).to.throwException(checkForError);
        });
        it("should silently not add the property when the property is filtered", function () {
            var filter = new PropertyFilter({Private: false}),
                staticProp = new Property();

            staticProp
                .setName("staticProperty")
                .setStatic(true);
            instance = new PropertyCollection(filter);
            instance.addProperty(staticProp);
            expect(instance.getProperty("staticProperty", true)).to.be(null);
        });
    });
    describe("#getProperty", function () {
        it("should return null", function () {
            expect(instance.getProperty("someMethod")).to.be(null);
            expect(instance.getProperty("someMethod", true)).to.be(null);
            expect(instance.getProperty("someMethod", false)).to.be(null);
        });
        it("should return the method", function () {
            var instanceMethod = new Method(),
                staticMethod = new Method();

            instanceMethod
                .setName("someMethod")
                .setStatic(false);
            staticMethod
                .setName("someMethod")
                .setStatic(true);
            instance.addProperty(instanceMethod);
            instance.addProperty(staticMethod);
            expect(instance.getProperty("someMethod")).to.be(instanceMethod);
            expect(instance.getProperty("someMethod", false)).to.be(instanceMethod);
            expect(instance.getProperty("someMethod", true)).to.be(staticMethod);
        });
    });
    describe("#removeProperty", function () {
        it("should return undefined", function () {
            var prop = new AbstractProperty();

            prop.setName("someProperty");
            expect(instance.removeProperty("someProperty")).to.be(undefined);
            instance.addProperty(prop);
            expect(instance.removeProperty("someProperty")).to.be(undefined);
        });
        it("should actually remove the method", function () {
            var instanceProp = new Property(),
                staticProp = new Property();

            instanceProp
                .setName("someProperty")
                .setStatic(false);
            staticProp
                .setName("someProperty")
                .setStatic(true);
            instance
                .addProperty(instanceProp)
                .addProperty(staticProp)
                .removeProperty(instanceProp);
            expect(instance.getProperty("someProperty", false)).to.be(null);
            expect(instance.getProperty("someProperty", true)).to.be(staticProp);
            instance.removeProperty(staticProp);
            expect(instance.getProperty("someProperty", true)).to.be(null);
            expect(instance.getProperty("someProperty", false)).to.be(null);
            instance
                .addProperty(instanceProp)
                .addProperty(staticProp)
                .removeProperty("someProperty");
            expect(instance.getProperty("someProperty", true)).to.be(null);
            expect(instance.getProperty("someProperty", false)).to.be(null);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.removeProperty(undefined);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.removeProperty(null);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.removeProperty(true);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.removeProperty(2);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.removeProperty({});
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#getProperties", function () {
        it("should return an empty array on a new property collection", function () {
            expect(instance.getProperties()).to.eql([]);
        });
        it("should return all previously added properties", function () {
            var i,
                result,
                currentProperty;

            for (i = 0; i < allPossibleProperties.length; i++) {
                currentProperty = allPossibleProperties[i];
                instance.addProperty(currentProperty);
            }

            result = instance.getProperties();
            result.sort(sortByPropertyName);
            expect(result).to.eql(allPossibleProperties);
        });
    });
});
