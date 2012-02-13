"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    Method = require("../lib/Method.class"),
    AbstractMethod = require("../lib/AbstractMethod.class"),
    AbstractProperty = require("../lib/AbstractProperty.class");

describe("Method", function () {

    var instance;

    beforeEach(function () {
        instance = new Method();
    });
    it("should return true", function () {
        expect(instance.instanceOf(Method)).to.be(true);
        expect(instance.instanceOf(AbstractMethod)).to.be(true);
        expect(instance.instanceOf(AbstractProperty)).to.be(true);
    });
    describe("#setCode", function () {
        it("should return the instance", function () {
            expect(instance.setCode("var a = 1;")).to.be(instance);
            expect(instance.setCode("")).to.be(instance);
            expect(instance.setCode(null)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setCode(undefined);
            }).to.throwException();
            expect(function () {
                instance.setCode(true);
            }).to.throwException();
            expect(function () {
                instance.setCode(1);
            }).to.throwException();
            expect(function () {
                instance.setCode({});
            }).to.throwException();
        });
    });
    describe("#getCode", function () {
        it("should return 'var a = 1;'", function () {
            instance.setCode("var a = 1;");
            expect(instance.getCode()).to.be("var a = 1;");
        });
        it("should return null", function () {
            expect(instance.getCode()).to.be(null);
            instance.setCode("var a = 1;");
            instance.setCode(null);
            expect(instance.getCode()).to.be(null);
        });
    });
    describe("#isAbstract", function () {
        it("should return true", function () {
            expect(instance.isAbstract()).to.be(false);
        });
    });
});