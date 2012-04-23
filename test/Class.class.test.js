"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    is = require("../lib/helpers/is"),
    Class = require("../lib/Class.class"),
    AbstractProperty = require("../lib/AbstractProperty.class"),
    PropertyFilter = require("../lib/helpers/PropertyFilter.class"),
    Method = require("../lib/Method.class"),
    Property = require("../lib/Property.class"),
    Visibility = require("../lib/Visibility.class"),
    combineStrings = require("./testHelpers/combineStrings.js"),
    createProperties = require("./testHelpers/createProperties.js"),
    sortByPropertyName = require("./testHelpers/sortByPropertyName.js"),
    checkError = require("./testHelpers/checkError.js");

describe("Class", function () {
    var instance,
        checkForTypeError = checkError(TypeError),
        checkForError = checkError(Error),
        possibleModes = [
            ["static", "instance"],
            ["implemented", "abstract"],
            ["attribute", "method"],
            ["public", "protected", "private"]
        ],
        allPossibleProperties = combineStrings(possibleModes);

    allPossibleProperties = createProperties(allPossibleProperties);
    allPossibleProperties.sort(sortByPropertyName);

    beforeEach(function () {
        instance = new Class();
    });
    it("should return true", function () {
        expect(is(instance).instanceOf(Class)).to.be(true);
    });
    describe("#setPath", function () {
        it("should return the instance", function () {
            expect(instance.setPath(null)).to.be(instance);
            expect(instance.setPath(__filename)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setPath(undefined);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setPath(true);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setPath(2);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setPath([]);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setPath({});
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#getPath", function () {
        it("should return null", function () {
            expect(instance.getPath()).to.be(null);
            instance.setPath(__dirname);
            instance.setPath(null);
            expect(instance.getPath()).to.be(null);
        });
        it("should return __dirname", function () {
            instance.setPath(__dirname);
            expect(instance.getPath()).to.be(__dirname);
        });
    });
    describe("#setClassId", function () {
        it("should return the instance", function () {
            expect(instance.setClassId("lib.testClass")).to.be(instance);
            expect(instance.setClassId("lib.somePackage.otherPackage.TestClass")).to.be(instance);
            expect(instance.setClassId(null)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setClassId(undefined);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setClassId(true);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setClassId(2);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setClassId({});
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#getClassId", function () {
        it("should return null", function () {
            expect(instance.getClassId()).to.be(null);
            instance
                .setClassId("lib.TestClass")
                .setClassId(null);
            expect(instance.getClassId()).to.be(null);
        });
        it("should return lib.TestClass", function () {
            instance.setClassId("lib.TestClass");
            expect(instance.getClassId()).to.be("lib.TestClass");
        });
        it("should return TestClass", function () {
            instance.setClassId("TestClass");
            expect(instance.getClassId()).to.be("TestClass");
        });
    });
    describe("#getClassName", function () {
        it("should return null", function () {
            expect(instance.getClassName()).to.be(null);
            instance
                .setClassId("TestClass")
                .setClassId(null);
            expect(instance.getClassName()).to.be(null);
        });
        it("should return TestClass", function () {
            instance.setClassId("TestClass");
            expect(instance.getClassName()).to.be("TestClass");
            instance.setClassId("lib.TestClass");
            expect(instance.getClassName()).to.be("TestClass");
            instance.setClassId("lib.somePackage.TestClass");
            expect(instance.getClassName()).to.be("TestClass");
            instance.setClassId("lib.somePackage.otherPackage.TestClass");
            expect(instance.getClassName()).to.be("TestClass");
        });
    });
    describe("#setSuperClass", function () {
        it("should return the instance", function () {
            var superClass = new Class();

            expect(instance.setSuperClass(superClass)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setSuperClass(undefined);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setSuperClass(true);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setSuperClass(2);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setSuperClass("someString");
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setSuperClass({});
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#getSuperClass", function () {
        it("should return null", function () {
            var superClass = new Class();

            expect(instance.getSuperClass()).to.be(null);
            instance.setSuperClass(superClass);
            instance.setSuperClass(null);
            expect(instance.getSuperClass()).to.be(null);
        });
        it("should return the superClass", function () {
            var superClass = new Class();

            instance.setSuperClass(superClass);
            expect(instance.getSuperClass()).to.be(superClass);
        });
    });
    describe("#setConstructor", function () {
        var constructor = new Method();

        it("should return the instance", function () {
            expect(instance.setConstructor(constructor)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setConstructor(undefined);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setConstructor(true);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setConstructor(2);
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setConstructor("someString");
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setConstructor({});
            }).to.throwException(checkForTypeError);
            expect(function () {
                instance.setConstructor(function () {});
            }).to.throwException(checkForTypeError);
        });
    });
    describe("#getConstructor", function () {
        var constructor = new Method();

        it("should return null", function () {
            expect(instance.getConstructor()).to.be(null);
            instance.setConstructor(constructor);
            instance.setConstructor(null);
            expect(instance.getConstructor()).to.be(null);
        });
        it("should return the constructor", function () {
            instance.setConstructor(constructor);
            expect(instance.getConstructor()).to.be(constructor);
        });
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
        it("should actually remove the property", function () {
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
        it("should return an empty array on a new class", function () {
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
        it("should exclude inherited properties", function () {
            var superClass = new Class(),
                someProperty = new Property();

            someProperty.setName("someProperty");
            superClass.addProperty(someProperty);
            instance.setSuperClass(superClass);
            expect(instance.getProperties()).to.have.length(0);
        });
    });
    describe("#getInheritedProperties", function () {
        it("should return an empty array on a class with no super class", function () {
            var someProperty = new Property();

            someProperty.setName("someProperty");
            instance.addProperty(someProperty);
            expect(instance.getInheritedProperties()).to.have.length(0);
        });
        it("should return all non-private properties from the super class", function () {
            var superClass = new Class(),
                i,
                result,
                currentProperty,
                allPossiblePropertiesWithoutPrivate;

            allPossiblePropertiesWithoutPrivate = allPossibleProperties.filter(function (property) {
                return property.getVisibility() !== Visibility.PRIVATE;
            });

            for (i = 0; i < allPossibleProperties.length; i++) {
                currentProperty = allPossibleProperties[i];
                superClass.addProperty(currentProperty);
            }

            instance.setSuperClass(superClass);
            result = instance.getInheritedProperties();
            result.sort(sortByPropertyName);
            expect(result).to.eql(allPossiblePropertiesWithoutPrivate);
        });
        it("should work with super super classes as well", function () {
            var superClass = new Class(),
                superSuperClass = new Class(),
                i,
                result,
                currentProperty,
                allPossiblePropertiesWithoutPrivate;

            allPossiblePropertiesWithoutPrivate = allPossibleProperties.filter(function (property) {
                return property.getVisibility() !== Visibility.PRIVATE;
            });

            for (i = 0; i < allPossibleProperties.length; i++) {
                currentProperty = allPossibleProperties[i];
                superSuperClass.addProperty(currentProperty);
            }

            superClass.setSuperClass(superSuperClass);
            instance.setSuperClass(superClass);
            result = instance.getInheritedProperties();
            result.sort(sortByPropertyName);
            expect(result).to.eql(allPossiblePropertiesWithoutPrivate);
        });
        it("should return only non-overridden properties", function () {
            var originalProperty = new Property(),
                overridingProperty = new Property(),
                originalMethod = new Method(),
                overridingMethod = new Method(),
                superClass = new Class(),
                superSuperClass = new Class(),
                result;

            originalProperty
                .setName("property")
                .setVisibility(Visibility.PUBLIC);
            overridingProperty
                .setName("property")
                .setVisibility(Visibility.PUBLIC);

            originalMethod
                .setName("method")
                .setVisibility(Visibility.PUBLIC);
            overridingMethod
                .setName("method")
                .setVisibility(Visibility.PUBLIC);

            superSuperClass
                .addProperty(originalProperty)
                .addProperty(originalMethod);
            superClass
                .addProperty(overridingProperty)
                .addProperty(overridingMethod);

            superClass.setSuperClass(superSuperClass);
            instance.setSuperClass(superClass);
            result = instance.getInheritedProperties();
            result.sort(sortByPropertyName);
            expect(result).to.eql([overridingMethod, overridingProperty]);
        });
    });
});