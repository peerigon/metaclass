"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    is = require("../lib/helpers/is"),
    Method = require("../lib/Method.class"),
    AbstractMethod = require("../lib/AbstractMethod.class"),
    AbstractProperty = require("../lib/AbstractProperty.class");

describe("Method", function () {

    var instance;

    beforeEach(function () {
        instance = new Method();
    });
    it("should return true", function () {
        expect(is(instance).instanceOf(Method)).to.be(true);
        expect(is(instance).instanceOf(AbstractMethod)).to.be(true);
        expect(is(instance).instanceOf(AbstractProperty)).to.be(true);
    });
    describe("#setFunction", function () {
        it("should return the instance", function () {
            expect(instance.setFunction(function () {})).to.be(instance);
            expect(instance.setFunction(null)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setFunction(undefined);
            }).to.throwException();
            expect(function () {
                instance.setFunction(true);
            }).to.throwException();
            expect(function () {
                instance.setFunction(1);
            }).to.throwException();
            expect(function () {
                instance.setFunction({});
            }).to.throwException();
        });
    });
    describe("#getFunction", function () {
        it("should return myFunc", function () {
            function myFunc() {}

            instance.setFunction(myFunc);
            expect(instance.getFunction()).to.be(myFunc);
        });
        it("should return null", function () {
            expect(instance.getFunction()).to.be(null);
            instance.setFunction(function () {});
            instance.setFunction(null);
            expect(instance.getFunction()).to.be(null);
        });
    });
    describe("#isAbstract", function () {
        it("should return true", function () {
            expect(instance.isAbstract()).to.be(false);
        });
    });
});