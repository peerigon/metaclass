"use strict"; // run code in ES5 strict mode

var expect = require('expect.js');
var AbstractProperty = require('../lib/AbstractProperty.class');
var Visibility = require('../lib/Visibility.class');

describe('AbstractProperty', function () {

    var instance;

    beforeEach(function () {
        instance = new AbstractProperty();
    });

    describe('#setName', function () {
        it('should return the instance', function () {
            expect(instance.setName('Batti')).to.be(instance);
        });
    });

    describe('#getName', function () {
        it('should return Batti', function () {
            instance.setName('Batti');
            expect(instance.getName()).to.be('Batti');
        });
    });

    describe('#setType', function () {
        it('should return the instance', function () {
            expect(instance.setType(Object)).to.be(instance);
        });
        it('should throw an exception', function() {
            expect(function() {
                instance.setType(null);
            }).to.throwException();

            expect(function() {
                instance.setType({});
            }).to.throwException();

            expect(function() {
                instance.setType(function () {});
            }).to.throwException();
        });
    });
/*
    describe('#getType', function () {
        instance.setType(Object);
        it('should return the Object-constructor', function () {
            expect(instance.getType()).to.be.an(Object);
        });
    });

    describe('#setVisibility', function () {
        it('should return the instance', function () {
            expect(instance.setVisibility(Visibility.PUBLIC)).to.be(instance);
        });
    });

    describe('#getVisibility', function () {
        it('should return Visibility.PUBLIC', function () {
            expect(instance.getVisibility()).to.be(Visibility.PUBLIC);
        });
    });*/
});