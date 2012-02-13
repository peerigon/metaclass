"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    Property = require("../lib/Property.class"),
    AbstractProperty = require("../lib/AbstractProperty.class");

describe("Property", function () {

    var instance;

    beforeEach(function () {
        instance = new Property();
    });
    it("should return true", function () {
        expect(instance.instanceOf(Property)).to.be(true);
        expect(instance.instanceOf(AbstractProperty)).to.be(true);
    });
    describe("#setInitialValue", function () {
        it("should return the instance", function () {
            expect(instance.setInitialValue("Hello")).to.be(instance);
            expect(instance.setInitialValue(null)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setInitialValue(undefined);
            }).to.throwException();
            expect(function () {
                instance.setInitialValue(true);
            }).to.throwException();
            expect(function () {
                instance.setInitialValue(1);
            }).to.throwException();
            expect(function () {
                instance.setInitialValue({});
            }).to.throwException();
        });
    });
    describe("#getInitialValue", function () {
        it("should return the '[1, 2, 3]'", function () {
            instance.setInitialValue("[1, 2, 3]");
            expect(instance.getInitialValue()).to.be("[1, 2, 3]");
        });
        it("should return null", function () {
            expect(instance.getInitialValue()).to.be(null);
            instance.setInitialValue("[1, 2, 3]");
            instance.setInitialValue(null);
            expect(instance.getInitialValue()).to.be(null);
        });
    });
    describe("#isAbstract", function () {
        it("should return true", function () {
            expect(instance.isAbstract()).to.be(false);
        });
    });
});