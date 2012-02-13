"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    PropertyCollection = require("../lib/PropertyCollection.class"),
    AbstractProperty = require("../lib/AbstractProperty.class"),
    AbstractMethod = require("../lib/AbstractMethod.class"),
    Property = require("../lib/Property.class"),
    Method = require("../lib/Method.class"),
    Visibility = require("../lib/Visibility.class");

describe("PropertyCollection", function () {

    var instance;

    beforeEach(function () {
        instance = new PropertyCollection();
    });
    it("should return true", function () {
        expect(instance.instanceOf(PropertyCollection)).to.be(true);
    });
    describe("#setProperty", function () {
        it("should return the instance", function () {
            var instanceProp = new Property(),
                staticProp = new Property();

            instanceProp
                .setName("someProperty")
                .setStatic(false);
            staticProp
                .setName("someProperty")     // property with the same name. Should throw no error,
                .setStatic(true);
            expect(instance.setProperty(instanceProp)).to.be(instance);
            expect(instance.setProperty(staticProp)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setProperty(undefined);
            }).to.throwException();
            expect(function () {
                instance.setProperty(null);
            }).to.throwException();
            expect(function () {
                instance.setProperty(true);
            }).to.throwException();
            expect(function () {
                instance.setProperty(1);
            }).to.throwException();
            expect(function () {
                instance.setProperty("some string");
            }).to.throwException();
            expect(function () {
                instance.setProperty({});
            }).to.throwException();
            expect(function () {
                instance.setProperty(new AbstractProperty()); // property without name
            }).to.throwException();
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
            instance.setProperty(instanceMethod);
            instance.setProperty(staticMethod);
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
            instance.setProperty(prop);
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
                .setProperty(instanceProp)
                .setProperty(staticProp)
                .removeProperty(instanceProp);
            expect(instance.getProperty("someProperty", false)).to.be(null);
            expect(instance.getProperty("someProperty", true)).to.be(staticProp);
            instance.removeProperty(staticProp);
            expect(instance.getProperty("someProperty", true)).to.be(null);
            expect(instance.getProperty("someProperty", false)).to.be(null);
            instance
                .setProperty(instanceProp)
                .setProperty(staticProp)
                .removeProperty("someProperty");
            expect(instance.getProperty("someProperty", true)).to.be(null);
            expect(instance.getProperty("someProperty", false)).to.be(null);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.removeProperty(undefined);
            }).to.throwException();
            expect(function () {
                instance.removeProperty(null);
            }).to.throwException();
            expect(function () {
                instance.removeProperty(true);
            }).to.throwException();
            expect(function () {
                instance.removeProperty(2);
            }).to.throwException();
            expect(function () {
                instance.removeProperty({});
            }).to.throwException();
        });
    });
    describe("#getProperties", function () {
        var possibleModes = [
                ["static", "instance"],
                ["abstract", "implemented"],
                ["attribute", "method"],
                ["public", "protected", "private"]
            ],
            prop,
            i,
            combinations = [],
            properties = [];

        // creates every possible combination of static/instance, abstract/implemented, attribute/method, public/protected/private
        function combine(currentModeCategory, result) {
            var i,
                tempResult,
                modes = possibleModes[currentModeCategory];

            for (i = 0; i < modes.length; i++) {
                result = result || "";
                tempResult = result + modes[i];
                if (currentModeCategory === possibleModes.length - 1) {
                    combinations.push(tempResult);
                } else {
                    combine(currentModeCategory + 1, tempResult + " ");
                }
            }
        }

        function createProperty(propName) {
            var prop;

            if (propName.match("abstract")) {   // IF TRUE: It's abstract
                if (propName.match("attribute")) {  // IF TRUE: It's an abstract attribuite
                    prop = new AbstractProperty();
                } else { // IF TRUE: It's an abstract method
                    prop = new AbstractMethod();
                }
            } else { // IF TRUE: It's implemented
                if (propName.match("attribute")) { // IF TRUE: It's an implemented attribute
                    prop = new Property();
                } else { // IF TRUE: It's an implemented method
                    prop = new Method();
                }
            }

            prop.setName(propName);

            if (propName.match("static")) { // IF TRUE: It's static
                prop.setStatic(true);
            } else { // IF TRUE: It's an instance property
                prop.setStatic(false);
            }

            if (propName.match("public")) { // IF TRUE: It's public
                prop.setVisibility(Visibility.PUBLIC);
            } else if (propName.match("protected")) { // IF TRUE: It's protected
                prop.setVisibility(Visibility.PROTECTED);
            } else { // IF TRUE: It's private
                prop.setVisibility(Visibility.PRIVATE);
            }

            return prop;
        }

        function setUp() {
            var i,
                prop,
                propName;

            for (i = 0; i < combinations.length; i++) {
                propName = combinations[i];
                prop = createProperty(propName);
                properties[i] = prop;
                instance.setProperty(prop);
            }
        }

        combine(0);

        it("should return all properties", function () {
            var selection,
                propertyTypes = [],
                i;

            setUp();
            selection = instance.getProperties();
            for (i = 0; i < selection.length; i++) {
                propertyTypes.push(selection[i].getName());
            }
            for (i = 0; i < properties.length; i++) {
                expect(propertyTypes).to.contain(properties[i].getName());
            }
        });
        it("should return the desired selection of properties", function () {
            var i,
                selection,
                currentCombination;

            setUp();
            for (i = 0; i < combinations.length; i++) {
                currentCombination = combinations[i];
                selection = instance.getProperties({
                    Static: !!currentCombination.match("static"),
                    Instance: !!currentCombination.match("instance"),
                    Abstract: !!currentCombination.match("abstract"),
                    Implemented: !!currentCombination.match("implemented"),
                    Attribute: !!currentCombination.match("attribute"),
                    Method: !!currentCombination.match("method"),
                    Private: !!currentCombination.match("private"),
                    Protected: !!currentCombination.match("protected"),
                    Public: !!currentCombination.match("public")
                });
                expect(selection).to.eql(
                    [properties[i]]
                );
            }
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.getProperties(null);
            }).to.throwException();
            expect(function () {
                instance.getProperties(2);
            }).to.throwException();
            expect(function () {
                instance.getProperties("someString");
            }).to.throwException();
            expect(function () {
                instance.getProperties([]);
            }).to.throwException();
        });
    });
});
