"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    instanceOf = require("../lib/helpers/instanceOf");

describe("instanceOf", function () {

    var testClass,
        superTestClass,
        otherClass,
        nativeExtender;

    function SuperTestClass() {
        this.instanceOf = instanceOf;
    }

    function TestClass() {
        this.Super = new SuperTestClass();
        this.instanceOf = instanceOf;
    }

    function NoStandardClass() {}

    function OtherClass() {
        this.Super = new NoStandardClass();
        this.instanceOf = instanceOf;
    }

    function NativeExtender() {
        this.Super = new String(); // ignore JSLint warning here, it's the right way to do
        this.instanceOf = instanceOf;
    }

    testClass = new TestClass();
    superTestClass = new SuperTestClass();
    otherClass = new OtherClass();
    nativeExtender = new NativeExtender();

    it("should return true", function () {
        expect(testClass.instanceOf(TestClass)).to.be(true);
        expect(testClass.instanceOf(SuperTestClass)).to.be(true);
        expect(nativeExtender.instanceOf(String)).to.be(true);
    });
    it("should return false", function () {
        expect(otherClass.instanceOf(TestClass)).to.be(false);
        expect(superTestClass.instanceOf(TestClass)).to.be(false);
    });
});