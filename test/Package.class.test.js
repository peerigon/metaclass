"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    is = require("../lib/helpers/is"),
    Package= require("../lib/Package.class"),
    Class = require("../lib/Class.class");

describe("Package", function () {

    var instance,
        dep1 = new Package(),
        dep2 = new Package(),
        dep3 = new Package(),
        cls1 = new Class(),
        cls2 = new Class(),
        cls3 = new Class();

    dep1.setName("dep1");
    dep2.setName("dep2");
    dep3.setName("dep3");
    cls1.setClassId("cls1");
    cls2.setClassId("cls2");
    cls3.setClassId("cls3");

    beforeEach(function () {
        instance = new Package();
    });
    it("should return true", function () {
        expect(is(instance).instanceOf(Package)).to.be(true);
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
    describe("#setName", function () {
        it("should return the instance", function () {
            expect(instance.setName("hello")).to.be(instance);
            expect(instance.setName(null)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.setName(undefined);
            }).to.throwException();
            expect(function () {
                instance.setName(2);
            }).to.throwException();
            expect(function () {
                instance.setName([]);
            }).to.throwException();
            expect(function () {
                instance.setName({});
            }).to.throwException();
        });
    });
    describe("#getName", function () {
        it("should return null", function () {
            expect(instance.getName()).to.be(null);
            instance
                .setName("hello")
                .setName(null);
            expect(instance.getName()).to.be(null);
        });
        it("should return 'hello'", function () {
            instance.setName("hello");
            expect(instance.getName()).to.be("hello");
        });
    });
    describe("#addDependency", function () {
        it("should return the instance", function () {
            expect(instance.addDependency(dep1)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.addDependency(undefined);
            }).to.throwException();
            expect(function () {
                instance.addDependency(null);
            }).to.throwException();
            expect(function () {
                instance.addDependency(2);
            }).to.throwException();
            expect(function () {
                instance.addDependency([]);
            }).to.throwException();
            expect(function () {
                instance.addDependency({});
            }).to.throwException();
            expect(function () {
                instance.addDependency(new Package()); // no package name specified
            }).to.throwException();
        });
    });
    describe("#getAllDependencies", function () {
        it("should return an empty array", function () {
            expect(instance.getAllDependencies()).to.eql([]);
        });
        it("should return all dependencies", function () {
            instance
                .addDependency(dep1)
                .addDependency(dep2)
                .addDependency(dep3);
            expect(instance.getAllDependencies()).to.eql([
                dep1, dep2, dep3
            ]);
        });
    });
    describe("#getDependency", function () {
        it("should return null", function () {
            expect(instance.getDependency("bla")).to.be(null);
        });
        it("should return dep2", function () {
            instance
                .addDependency(dep1)
                .addDependency(dep2)
                .addDependency(dep3);
            expect(instance.getDependency("dep2")).to.be(dep2);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.getDependency(undefined);
            }).to.throwException();
            expect(function () {
                instance.getDependency(null);
            }).to.throwException();
            expect(function () {
                instance.getDependency(2);
            }).to.throwException();
            expect(function () {
                instance.getDependency([]);
            }).to.throwException();
            expect(function () {
                instance.getDependency({});
            }).to.throwException();
        });
    });
    describe("#removeDependency", function () {
        it("should return undefined", function () {
            expect(instance.removeDependency("bla")).to.be(undefined);
            instance.addDependency(dep1);
            expect(instance.removeDependency("dep1")).to.be(undefined);
        });
        it("should actually remove it", function () {
            instance
                .addDependency(dep1)
                .addDependency(dep2)
                .addDependency(dep3);
            instance.removeDependency("dep1");
            expect(instance.getAllDependencies()).to.eql([
                dep2, dep3
            ]);
            instance.removeDependency("dep2");
            instance.removeDependency("dep3");
            expect(instance.getAllDependencies()).to.eql([]);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.removeDependency(undefined);
            }).to.throwException();
            expect(function () {
                instance.removeDependency(null);
            }).to.throwException();
            expect(function () {
                instance.removeDependency(2);
            }).to.throwException();
            expect(function () {
                instance.removeDependency([]);
            }).to.throwException();
            expect(function () {
                instance.removeDependency({});
            }).to.throwException();
        });
    });
    describe("#addClass", function () {
        it("should return the instance", function () {
            expect(instance.addClass(cls1)).to.be(instance);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.addClass(undefined);
            }).to.throwException();
            expect(function () {
                instance.addClass(null);
            }).to.throwException();
            expect(function () {
                instance.addClass(2);
            }).to.throwException();
            expect(function () {
                instance.addClass([]);
            }).to.throwException();
            expect(function () {
                instance.addClass({});
            }).to.throwException();
            expect(function () {
                instance.addClass(new Class()); // no class id specified
            }).to.throwException();
        });
    });
    describe("#getAllClasses", function () {
        it("should return an empty array", function () {
            expect(instance.getAllClasses()).to.eql([]);
        });
        it("should return all class", function () {
            instance
                .addClass(cls1)
                .addClass(cls2)
                .addClass(cls3);
            expect(instance.getAllClasses()).to.eql([
                cls1, cls2, cls3
            ]);
        });
    });
    describe("#getClass", function () {
        it("should return null", function () {
            expect(instance.getClass("bla")).to.be(null);
        });
        it("should return cls2", function () {
            instance
                .addClass(cls1)
                .addClass(cls2)
                .addClass(cls3);
            expect(instance.getClass("cls2")).to.be(cls2);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.getClass(undefined);
            }).to.throwException();
            expect(function () {
                instance.getClass(null);
            }).to.throwException();
            expect(function () {
                instance.getClass(2);
            }).to.throwException();
            expect(function () {
                instance.getClass([]);
            }).to.throwException();
            expect(function () {
                instance.getClass({});
            }).to.throwException();
        });
    });
    describe("#removeClass", function () {
        it("should return undefined", function () {
            expect(instance.removeClass("bla")).to.be(undefined);
            instance.addClass(cls1);
            expect(instance.removeClass("cls1")).to.be(undefined);
        });
        it("should actually remove it", function () {
            instance
                .addClass(cls1)
                .addClass(cls2)
                .addClass(cls3);
            instance.removeClass("cls1");
            expect(instance.getAllClasses()).to.eql([
                cls2, cls3
            ]);
            instance.removeClass("cls2");
            instance.removeClass("cls3");
            expect(instance.getAllClasses()).to.eql([]);
        });
        it("should throw an exception", function () {
            expect(function () {
                instance.removeClass(undefined);
            }).to.throwException();
            expect(function () {
                instance.removeClass(null);
            }).to.throwException();
            expect(function () {
                instance.removeClass(2);
            }).to.throwException();
            expect(function () {
                instance.removeClass([]);
            }).to.throwException();
            expect(function () {
                instance.removeClass({});
            }).to.throwException();
        });
    });
});