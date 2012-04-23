"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    is = require("../lib/helpers/is"),
    Property = require("../lib/Property.class"),
    AbstractProperty = require("../lib/AbstractProperty.class");

describe("Property", function () {

    var instance;

    beforeEach(function () {
        instance = new Property();
    });
    it("should return true", function () {
        expect(is(instance).instanceOf(Property)).to.be(true);
        expect(is(instance).instanceOf(AbstractProperty)).to.be(true);
    });
    describe("#setInitialValue", function () {
        it("should return the instance", function () {
            expect(instance.setInitialValue("Hello")).to.be(instance);
            expect(instance.setInitialValue(null)).to.be(instance);
        });
    });
    describe("#getInitialValue", function () {
        it("should return the '[1, 2, 3]'", function () {
            var arr = [1, 2, 3];

            instance.setInitialValue(arr);
            expect(instance.getInitialValue()).to.be(arr);
        });
        it("should return null", function () {
            expect(instance.getInitialValue()).to.be(null);
            instance.setInitialValue([1, 2, 3]);
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