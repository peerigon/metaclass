"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    AbstractMethod = require("../lib/AbstractMethod.class"),
    AbstractProperty = require("../lib/AbstractProperty.class");

describe("Method", function () {

    var instance;

    beforeEach(function () {
        instance = new AbstractMethod();
    });
    it("should return true", function () {
        expect(instance.instanceOf(AbstractMethod)).to.be(true);
        expect(instance.instanceOf(AbstractProperty)).to.be(true);
    });
    describe("#setRequiredParam", function () {
        it("should return the instance", function () {
            expect(instance.setRequiredParam(0, "js.String")).to.be(instance);
            expect(instance.setRequiredParam(0, undefined)).to.be(instance);
            expect(instance.setRequiredParam(0, null)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setRequiredParam(undefined, "js.String");
            }).to.throwException();
            expect(function () {
                instance.setRequiredParam(null, "js.String");
            }).to.throwException();
            expect(function () {
                instance.setRequiredParam(true, "js.String");
            }).to.throwException();
            expect(function () {
                instance.setRequiredParam(-1, "js.String");
            }).to.throwException();
            expect(function () {
                instance.setRequiredParam(1, "js.String");
            }).to.throwException();
            expect(function () {
                instance.setRequiredParam("string", "js.String");
            }).to.throwException();
            expect(function () {
                instance.setRequiredParam({}, "js.String");
            }).to.throwException();
            expect(function () {
                instance.setRequiredParam(0, true);
            }).to.throwException();
            expect(function () {
                instance.setRequiredParam(0, 0);
            }).to.throwException();
            expect(function () {
                instance.setRequiredParam(0, {});
            }).to.throwException();
        });
    });
    describe("#getRequiredParams", function () {
        it("should return ['js.String', 'lib.SomeClass', undefined]", function () {
            instance.setRequiredParam(0, "js.String");
            instance.setRequiredParam(1, "lib.SomeClass");
            instance.setRequiredParam(2, undefined);
            instance.setRequiredParam(3, "this will be deleted soon");
            instance.setRequiredParam(3, null);
            expect(instance.getRequiredParams()).to.eql(["js.String", "lib.SomeClass", undefined]);
        });
        it("should return []", function () {
            expect(instance.getRequiredParams()).to.eql([]);
            instance.setRequiredParam(0, null);
            expect(instance.getRequiredParams()).to.eql([]);
        });
        it("should return [undefined]", function () {
            instance.setRequiredParam(0, undefined);
            expect(instance.getRequiredParams()).to.eql([undefined]);
        });
    });
    describe("#setOptionalParam", function () {
        it("should return the instance", function () {
            expect(instance.setOptionalParam(0, "js.String")).to.be(instance);
            expect(instance.setOptionalParam(0, undefined)).to.be(instance);
            expect(instance.setOptionalParam(0, null)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setOptionalParam(undefined, "js.String");
            }).to.throwException();
            expect(function () {
                instance.setOptionalParam(null, "js.String");
            }).to.throwException();
            expect(function () {
                instance.setOptionalParam(-1, "js.String");
            }).to.throwException();
            expect(function () {
                instance.setOptionalParam(1, "js.String");
            }).to.throwException();
            expect(function () {
                instance.setOptionalParam(true, "js.String");
            }).to.throwException();
            expect(function () {
                instance.setOptionalParam("string", "js.String");
            }).to.throwException();
            expect(function () {
                instance.setOptionalParam({}, "js.String");
            }).to.throwException();
            expect(function () {
                instance.setOptionalParam(0, 0);
            }).to.throwException();
            expect(function () {
                instance.setOptionalParam(0, true);
            }).to.throwException();
            expect(function () {
                instance.setOptionalParam(0, {});
            }).to.throwException();
        });
    });
    describe("#getOptionalParams", function () {
        it("should return ['js.String', 'lib.SomeClass', undefined]", function () {
            instance.setOptionalParam(0, "js.String");
            instance.setOptionalParam(1, "lib.SomeClass");
            instance.setOptionalParam(2, undefined);
            instance.setOptionalParam(3, "this will be deleted soon");
            instance.setOptionalParam(3, null);
            expect(instance.getOptionalParams()).to.eql(["js.String", "lib.SomeClass", undefined]);
        });
        it("should return []", function () {
            expect(instance.getOptionalParams()).to.eql([]);
            instance.setOptionalParam(0, null);
            expect(instance.getOptionalParams()).to.eql([]);
        });
        it("should return [undefined]", function () {
            instance.setOptionalParam(0, undefined);
            expect(instance.getOptionalParams()).to.eql([undefined]);
        });
    });
    describe("#getNumOfRequiredParams", function () {
        it("should return 0", function () {
            expect(instance.getNumOfRequiredParams()).to.be(0);
        });
        it("should return 2", function () {
            instance.setOptionalParam(0, undefined);
            instance.setRequiredParam(0, "js.String");
            instance.setRequiredParam(1, "lib.SomeClass");
            instance.setRequiredParam(2, "this will be deleted soon");
            instance.setRequiredParam(2, null);
            expect(instance.getNumOfRequiredParams()).to.eql(2);
        });
    });
    describe("#getNumOfParams", function () {
        it("should return 0", function () {
            expect(instance.getNumOfParams()).to.be(0);
        });
        it("should return 2", function () {
            instance.setOptionalParam(0, undefined);
            instance.setRequiredParam(0, "js.String");
            instance.setOptionalParam(1, "this will be deleted soon");
            instance.setOptionalParam(1, null);
            expect(instance.getNumOfParams()).to.eql(2);
        });
    });
    describe("#isAbstract", function () {
        it("should return true", function () {
            expect(instance.isAbstract()).to.be(true);
        });
    });
});