"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    passThrough = require("../lib/helpers/passThrough");

describe("passThrough", function () {

    var testClass;

    function SuperTestClass() {

        var Public = {constructor: this.constructor},
            self = this;

        this.Public = Public;

        Public.a = this.a = function () {
            return "a";
        }.bind(this);

        Public.b = this.b = function () {
            return "b";
        }.bind(this);

        return Public;

    }

    function TestClass() {

        var Public = {constructor: this.constructor},
            self = this;

        this.Public = Public;
        this.Super = new SuperTestClass();

        Public.a = this.a = function () {
            return "A";
        }.bind(this);

        passThrough.apply(this);

        return Public;

    }

    testClass = new TestClass();

    it("should contain all inherited functions", function () {
        expect(testClass.a).to.be.a("function");
        expect(testClass.b).to.be.a("function");
        expect(testClass.a()).to.be("A");
        expect(testClass.b()).to.be("b");
    });
});