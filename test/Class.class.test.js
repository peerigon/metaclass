"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    is = require("../lib/helpers/is"),
    Class = require("../lib/Class.class"),
    AbstractProperty = require("../lib/AbstractProperty.class"),
    AbstractMethod = require("../lib/AbstractMethod.class"),
    Visibility = require("../lib/Visibility.class"),
    Method = require("../lib/Method.class"),
    Property = require("../lib/Property.class");

describe("Class", function () {

    var instance;

    beforeEach(function () {
        instance = new Class();
    });
    it("should return true", function () {
        expect(is(instance).instanceOf(Class)).to.be(true);
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
            }).to.throwException();
            expect(function () {
                instance.setClassId(true);
            }).to.throwException();
            expect(function () {
                instance.setClassId(2);
            }).to.throwException();
            expect(function () {
                instance.setClassId({});
            }).to.throwException();
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
    describe("#setPath", function () {
        it("should return the instance", function () {
            expect(instance.setPath(null)).to.be(instance);
            expect(instance.setPath(__filename)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setPath(undefined);
            }).to.throwException();
            expect(function () {
                instance.setPath(true);
            }).to.throwException();
            expect(function () {
                instance.setPath(2);
            }).to.throwException();
            expect(function () {
                instance.setPath([]);
            }).to.throwException();
            expect(function () {
                instance.setPath({});
            }).to.throwException();
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
    describe("#setSuperClass", function () {
        it("should return the instance", function () {
            var superClass = new Class();

            expect(instance.setSuperClass(superClass)).to.be(instance);
        });
        it("should throw an exception", function () {
            var exampleClass = new Class();

            expect(function () {
                instance.setSuperClass(undefined);
            }).to.throwException();
            expect(function () {
                instance.setSuperClass(true);
            }).to.throwException();
            expect(function () {
                instance.setSuperClass(2);
            }).to.throwException();
            expect(function () {
                instance.setSuperClass("someString");
            }).to.throwException();
            expect(function () {
                instance.setSuperClass({});
            }).to.throwException();
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
        it("should return the exampleClass", function () {
            var exampleClass = new Class();

            instance.setSuperClass(exampleClass);
            expect(instance.getSuperClass()).to.be(exampleClass);
        });
    });
    describe("#getProperties", function () {
        var possibleModes = [
                ["static", "instance"],
                ["abstract", "implemented"],
                ["attribute", "method"],
                ["public", "protected", "private"]
            ],
            i,
            combinations = [],
            properties = [],
            superClass = new Class(),
            classInBetween = new Class();   // this class is meant to be between the instance and the superClass in the heritage order
                                            // the presumption is: if it works in this constellation, it works in every constellation

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

            instance.setSuperClass(classInBetween);
            classInBetween.setSuperClass(superClass);
            for (i = 0; i < combinations.length; i++) {
                propName = combinations[i];
                prop = createProperty(propName);
                properties[i] = prop;
                instance.setProperty(prop);
                classInBetween.setProperty(prop);
                superClass.setProperty(prop);
            }
        }

        combine(0);

        it("should return all properties", function () {
            var selection,
                propertyTypes = "",
                regExp,
                i;

            setUp();
            selection = instance.getProperties();
            for (i = 0; i < selection.length; i++) {
                propertyTypes += selection[i].getName() + " | ";
            }

            // tests if every propertyType occurs 3 times, since there are 3 classes in the heritage chain
            for (i = 0; i < properties.length; i++) {
                regExp = new RegExp(properties[i].getName(), "g");
                expect(propertyTypes.match(regExp)).to.have.length(3);
            }
        });
        it("should return the requested selection of properties", function () {
            var i,
                selection,
                propertyType,
                prop,
                filterObj;

            setUp();
            for (i = 0; i < combinations.length; i++) {
                propertyType = combinations[i];
                prop = properties[i];
                filterObj = {
                    Static: !!propertyType.match("static"),
                    Instance: !!propertyType.match("instance"),
                    Abstract: !!propertyType.match("abstract"),
                    Implemented: !!propertyType.match("implemented"),
                    Attribute: !!propertyType.match("attribute"),
                    Method: !!propertyType.match("method"),
                    Private: !!propertyType.match("private"),
                    Protected: !!propertyType.match("protected"),
                    Public: !!propertyType.match("public")
                };
                filterObj.Inherited = true;
                filterObj.This = true;
                selection = instance.getProperties(filterObj);
                expect(selection).to.eql(
                    [prop, prop, prop]  // one is from this instance, two are inherited
                );
                filterObj.Inherited = false;
                filterObj.This = true;
                selection = instance.getProperties(filterObj);
                expect(selection).to.eql(
                    [prop]  // one is from this instance
                );
                filterObj.Inherited = true;
                filterObj.This = false;
                selection = instance.getProperties(filterObj);
                expect(selection).to.eql(
                    [prop, prop]  // these two are inherited
                );
            }
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.getProperties(null);
            }).to.throwException();
            expect(function () {
                instance.getProperties(true);
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
    describe("#getOverriddenProperties", function () {
        var superClass = new Class(),
            classInBetween = new Class(),   // this class is meant to be between the instance and the superClass in the heritage order
                                            // the presumption is: if it works in this constellation, it works in every constellation
            prop1,
            prop2,
            prop3;

        // Adding some random properties, that should not be returned via getOverriddenProperties
        classInBetween.setProperty(
            new Method()
                .setName("classInBetween someRandomMethod")
                .setStatic(false)
                .setVisibility(Visibility.PROTECTED)
        );
        classInBetween.setProperty(
            new AbstractProperty()
                .setName("classInBetween someRandomAbstractMethod")
                .setStatic(false)
                .setVisibility(Visibility.PUBLIC)
        );
        superClass.setProperty(
            new Property()
                .setName("superClass someRandomStaticProperty")
                .setStatic(true)
                .setVisibility(Visibility.PRIVATE)
        );
        classInBetween.setSuperClass(superClass);
        it("should return an empty array", function () {
            var result;

            function check() {
                expect(result).to.be.an(Array);
                expect(result).to.have.length(0);
            }

            function setProps() {
                instance.setProperty(prop1);
                superClass.setProperty(prop2);
            }

            function removeProps() {
                instance.removeProperty(prop1);
                superClass.removeProperty(prop2);
            }

            // Case 1: instance has no super class, so it should return an empty array
            result = instance.getOverriddenProperties();
            check();
            result = instance.getOverriddenProperties({ // just checking some filter options
                Private: true
            });
            check();

            instance.setSuperClass(classInBetween); // from now on all test cases have a super class

            // Case 2: prop1 is static, prop2 is not static, so it should not be overridden
            prop1 = new AbstractMethod();
            prop2 = new AbstractMethod();
            prop1
                .setName("exampleProperty")
                .setStatic(true)
                .setVisibility(Visibility.PUBLIC);
            prop2
                .setName("exampleProperty")
                .setStatic(false)
                .setVisibility(Visibility.PUBLIC);
            setProps();
            result = instance.getOverriddenProperties();
            check();
            removeProps();

            // Case 3: prop1 has a different name than prop2
            prop1 = new Property();
            prop2 = new Property();
            prop1
                .setName("property1")
                .setStatic(true)
                .setVisibility(Visibility.PROTECTED);
            prop2
                .setName("property2")
                .setStatic(true)
                .setVisibility(Visibility.PROTECTED);
            setProps();
            result = instance.getOverriddenProperties();
            check();
            removeProps();

            // Case 4: prop2 is private and should therefore not be inherited
            prop1 = new Property();
            prop2 = new Property();
            prop1
                .setName("property1")
                .setStatic(false)
                .setVisibility(Visibility.PRIVATE);
            prop2
                .setName("property1")
                .setStatic(false)
                .setVisibility(Visibility.PRIVATE);
            setProps();
            result = instance.getOverriddenProperties();
            check();
            removeProps();

            // Case 5: prop2 is abstract. Thus prop1 is the implemented version of prop2, but it doesn't actually override it.
            prop1 = new Property();
            prop2 = new AbstractProperty();
            prop1
                .setName("property1")
                .setStatic(false)
                .setVisibility(Visibility.PUBLIC);
            prop2
                .setName("property1")
                .setStatic(false)
                .setVisibility(Visibility.PUBLIC);
            setProps();
            result = instance.getOverriddenProperties();
            check();
            removeProps();
        });
        it("should return the overridden property", function () {
            var result;

            function check() {
                expect(result).to.be.eql([prop2]);
            }

            function setProps() {
                instance.setProperty(prop1);
                superClass.setProperty(prop2);
            }

            function removeProps() {
                instance.removeProperty(prop1);
                superClass.removeProperty(prop2);
            }

            instance.setSuperClass(classInBetween);

            // Adding some random properties, that should not interfere with the result of getOverriddenProperties
            instance.setProperty(
                new Property()
                    .setName("someStaticProperty")
                    .setStatic(true)
                    .setVisibility(Visibility.PUBLIC)
            );

            // Case 1: prop1 is prop2
            prop1 = new AbstractProperty();
            prop2 = prop1;
            prop1
                .setName("exampleProperty")
                .setStatic(true)
                .setVisibility(Visibility.PUBLIC);
            setProps();
            result = instance.getOverriddenProperties();
            check();
            removeProps();

            // Case 2: prop1 is like prop2
            prop1 = new Method();
            prop2 = new Method();
            prop1
                .setName("exampleProperty")
                .setStatic(true)
                .setVisibility(Visibility.PUBLIC);
            prop2
                .setName("exampleProperty")
                .setStatic(true)
                .setVisibility(Visibility.PUBLIC);
            setProps();
            result = instance.getOverriddenProperties();
            check();
            removeProps();

            // Case 3: prop1 is public, prop2 is protected
            prop1 = new Property();
            prop2 = new Property();
            prop1
                .setName("exampleProperty")
                .setStatic(false)
                .setVisibility(Visibility.PUBLIC);
            prop2
                .setName("exampleProperty")
                .setStatic(false)
                .setVisibility(Visibility.PROTECTED);
            setProps();
            result = instance.getOverriddenProperties();
            check();
            removeProps();

            // Case 5: prop2 in classInBetween overrides prop3 in superClass
            prop1 = new Property();
            prop2 = new Property();
            prop3 = new Property();
            prop1
                .setName("exampleProperty")
                .setStatic(false)
                .setVisibility(Visibility.PUBLIC);
            prop2
                .setName("exampleProperty")
                .setStatic(false)
                .setVisibility(Visibility.PUBLIC);
            prop3
                .setName("exampleProperty")
                .setStatic(false)
                .setVisibility(Visibility.PUBLIC);
            instance.setProperty(prop1);
            classInBetween.setProperty(prop2);
            superClass.setProperty(prop3);
            result = instance.getOverriddenProperties();
            check();
            instance.removeProperty(prop1);
            instance.removeProperty(prop2);
            instance.removeProperty(prop3);
        });
    });
    describe("#isAbstract", function () {
        it("should return true", function () {
            var prop = new AbstractProperty()
                    .setName("someProperty")
                    .setStatic(false)
                    .setVisibility(Visibility.PUBLIC),
                method = new AbstractMethod()
                    .setName("someMethod")
                    .setStatic(true)
                    .setVisibility(Visibility.PROTECTED);

            instance.setProperty(prop);
            expect(instance.isAbstract()).to.be(true);
            instance.removeProperty(prop);
            instance.setProperty(method);
            expect(instance.isAbstract()).to.be(true);
        });
        it("should return false", function () {
            var prop = new Property(),
                method = new Method();

            prop
                .setName("someProperty")
                .setStatic(false)
                .setVisibility(Visibility.PUBLIC);
            method
                .setName("someMethod")
                .setStatic(true)
                .setVisibility(Visibility.PROTECTED);
            instance.setProperty(prop);
            expect(instance.isAbstract()).to.be(false);
            instance.removeProperty(prop);
            instance.setProperty(method);
            expect(instance.isAbstract()).to.be(false);
        });
    });
});