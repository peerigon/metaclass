"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    inherit = require("../lib/helpers/inherit");

describe("inherit", function () {

    function A() {
        var Properties = {
                a: "a"
            },
            Public = this;

        Public.getA = Properties.getA = function () {
            return this.a;
        }.bind(Properties);

        Public.setA = Properties.setA = function (a) {
            this.a = a;
        }.bind(Properties);
    }

    function B() {
        var Properties = {
                Super: new A(),
                b: "b"
            },
            Public = this;

        Public.getB = Properties.getB = function () {
            return this.b;
        }.bind(Properties);

        Public.setB = Properties.setB = function (b) {
            this.b = b;
        }.bind(Properties);

        Public.getA = Properties.getA = function () {
            return this.Super.getA() + this.Super.getA();
        }.bind(Properties);

        inherit(Properties.Super, Public);
    }

    it("should expose all expected methods", function () {
        var b,
            key,
            actual = [],
            expected = ["getA", "getB", "setA", "setB"];   // sorted

        b = new B();
        for (key in b) {
            if (b.hasOwnProperty(key)) {
                actual.push(key);
            }
        }
        actual.sort();
        expect(actual).to.eql(expected);
    });
    it("should tolerate overridden methods", function () {
        var b1 = new B();

        expect(b1.getA()).to.be("aa");
    });
    it("should create independent instances", function () {
        var b1 = new B(),
            b2 = new B(),
            a1 = new A();

        b1.setA("A");
        expect(b1.getA()).to.be("AA");
        expect(b2.getA()).to.be("aa");
        expect(a1.getA()).to.be("a");
    });
});