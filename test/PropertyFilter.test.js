"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    is = require("../lib/helpers/is"),
    PropertyFilter = require("../lib/helpers/PropertyFilter.class"),
    checkError = require("./testHelpers/checkError.js"),
    combineStrings = require("./testHelpers/combineStrings.js"),
    createProperties = require("./testHelpers/createProperties.js"),
    createProperty = require("./testHelpers/createProperty.js"),
    createFilterDescriptor = require("./testHelpers/createFilterDescriptor.js");

describe("PropertyFilter", function () {
    var possibleModes = [
            ["static", "instance"],
            ["abstract", "implemented"],
            ["attribute", "method"],
            ["public", "protected", "private"]
        ],
        propertyDescriptions = combineStrings(possibleModes),
        allPossibleProperties = createProperties(propertyDescriptions);

    describe("#constructor", function () {
        it("should return an instance of PropertyFilter", function () {
            var instance = new PropertyFilter({});

            expect(is(instance).instanceOf(PropertyFilter)).to.be(true);
        });
        it("should throw an exception", function () {
            expect(function () {
                new PropertyFilter(undefined);
            }).to.throwException(checkError(TypeError));
            expect(function () {
                new PropertyFilter(null);
            }).to.throwException(checkError(TypeError));
            expect(function () {
                new PropertyFilter(true);
            }).to.throwException(checkError(TypeError));
            expect(function () {
                new PropertyFilter("some string");
            }).to.throwException(checkError(TypeError));
            expect(function () {
                new PropertyFilter([1, 2, 3]);
            }).to.throwException(checkError(TypeError));
            expect(function () {
                new PropertyFilter(function () {});
            }).to.throwException(checkError(TypeError));
        }); 
    });
    describe("#test", function () {
        it("should return true for the specified property and the corresponding filter", function () {
            var i,
                currentCombination,
                currentFilterDescriptor,
                currentInstance,
                currentProperty;

            for (i = 0; i < propertyDescriptions.length; i++) {
                currentCombination = propertyDescriptions[i];
                currentFilterDescriptor = createFilterDescriptor(currentCombination);
                currentInstance = new PropertyFilter(currentFilterDescriptor);
                currentProperty = createProperty(currentCombination);
                expect(currentInstance.test(currentProperty)).to.be(true);
            }
        });
        it("should return true for the specified property and the default filter", function () {
            var i,
                currentCombination,
                currentInstance,
                currentProperty;

            for (i = 0; i < propertyDescriptions.length; i++) {
                currentCombination = propertyDescriptions[i];
                currentInstance = new PropertyFilter({});   // empty object means, that every property will pass the filter
                currentProperty = createProperty(currentCombination);
                expect(currentInstance.test(currentProperty)).to.be(true);
            }
        });
        it("should throw an exception", function () {
            var instance = new PropertyFilter({});

            expect(function () {
                instance.test(undefined);
            }).to.throwException(checkError(TypeError));
            expect(function () {
                instance.test(null);
            }).to.throwException(checkError(TypeError));
            expect(function () {
                instance.test("some string");
            }).to.throwException(checkError(TypeError));
            expect(function () {
                instance.test(3);
            }).to.throwException(checkError(TypeError));
            expect(function () {
                instance.test({});
            }).to.throwException(checkError(TypeError));
            expect(function () {
                instance.test([1, 2, 3]);
            }).to.throwException(checkError(TypeError));
        });
    });
    describe("#applyOn", function () {
        it("should filter no properties when applying the default filter", function () {
            var instance = new PropertyFilter({});

            expect(instance.applyOn(allPossibleProperties)).not.to.be(allPossibleProperties); // should not be the same reference
            expect(instance.applyOn(allPossibleProperties)).to.eql(allPossibleProperties); // but it should contain the same properties
        });
        it("should filter all properties when applying a negative filter", function () {
            var negativeFilter = createFilterDescriptor(""),
                instance = new PropertyFilter(negativeFilter);

            expect(instance.applyOn(allPossibleProperties)).to.eql([]);
        });
        it("should return an array containing only one property that matched to the corresponding filter", function () {
            var i,
                currentCombination,
                currentFilterDescriptor,
                currentInstance,
                currentProperty,
                currentFilterResult;

            for (i = 0; i < propertyDescriptions.length; i++) {
                currentCombination = propertyDescriptions[i];
                currentFilterDescriptor = createFilterDescriptor(currentCombination);
                currentInstance = new PropertyFilter(currentFilterDescriptor);
                currentProperty = createProperty(currentCombination);
                currentFilterResult = currentInstance.applyOn(allPossibleProperties);

                expect(currentFilterResult).to.have.length(1);
                expect(currentFilterResult[0].getName()).to.be(currentCombination);
            }
        });
        it("should throw an exception", function () {
            var instance = new PropertyFilter({});

            expect(function () {
                instance.applyOn(undefined);
            }).to.throwException(checkError(TypeError));
            expect(function () {
                instance.applyOn(null);
            }).to.throwException(checkError(TypeError));
            expect(function () {
                instance.applyOn("some string");
            }).to.throwException(checkError(TypeError));
            expect(function () {
                instance.applyOn(3);
            }).to.throwException(checkError(TypeError));
            expect(function () {
                instance.applyOn({});
            }).to.throwException(checkError(TypeError));
            expect(function () {
                instance.applyOn([1, 2, 3]);   // the array must contain instances of AbstractProperty
            }).to.throwException(checkError(TypeError));
        });
    });
});