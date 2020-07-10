"use strict";
// enTT RxJS lib base class tests
// ----------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const rxjs_1 = require("rxjs");
const tests_init_1 = require("../../tests.init");
const __1 = require("../../");
// Test ...
describe('class EnTT', () => {
    class Test extends __1.EnTT {
        constructor() {
            super();
            super.entt();
        }
    }
    it('Can initialize extended EnTT class', () => {
        expect(() => {
            new Test();
        }).not.toThrow();
    });
    it('Inherits all EnTT methods and properties', () => {
        const instance = new Test();
        tests_init_1.assert(instance.serialize);
        tests_init_1.assert(instance.deserialize);
        tests_init_1.assert(instance.valid);
        tests_init_1.assert(instance.errors);
        tests_init_1.assert(instance.revert);
    });
    describe('Casts Observable', () => {
        it('Casts single Observable', () => {
            const instance = new Test(), observable = new rxjs_1.Subject(), value = instance.serialize();
            Test.cast(observable, { into: Test }).subscribe(value => {
                tests_init_1.assert(value instanceof Test);
            });
            observable.next(value);
            observable.complete();
        });
        it('Casts Observable array', () => {
            const instance = new Test(), observable = new rxjs_1.Subject(), value = instance.serialize();
            Test.cast(observable, { into: [Test] }).subscribe(value => {
                tests_init_1.assert(value instanceof Array);
                tests_init_1.assert(value.length === 3);
                tests_init_1.assert(value[0] instanceof Test);
            });
            observable.next([value, value, value]);
            observable.complete();
        });
        it('Casts Observable hashmap', () => {
            const instance = new Test(), observable = new rxjs_1.Subject(), value = instance.serialize();
            Test.cast(observable, { into: { Test } }).subscribe(value => {
                tests_init_1.assert(value instanceof Object);
                tests_init_1.assert(Object.values(value).length === 3);
                tests_init_1.assert(value.a instanceof Test);
            });
            observable.next({ a: value, b: value, c: value });
            observable.complete();
        });
    });
    describe('Cast can be used in Observable.pipe', () => {
        it('Casts single Observable', () => {
            const instance = new Test(), observable = new rxjs_1.Subject(), value = instance.serialize();
            observable.pipe(__1.cast(Test)).subscribe(value => {
                tests_init_1.assert(value instanceof Test);
            });
            observable.next(value);
            observable.complete();
        });
        it('Casts Observable array', () => {
            const instance = new Test(), observable = new rxjs_1.Subject(), value = instance.serialize();
            observable.pipe(__1.cast([Test])).subscribe((value) => {
                tests_init_1.assert(value instanceof Array);
                tests_init_1.assert(value.length === 3);
                tests_init_1.assert(value[0] instanceof Test);
            });
            observable.next([value, value, value]);
            observable.complete();
        });
        it('Casts Observable hashmap', () => {
            const instance = new Test(), observable = new rxjs_1.Subject(), value = instance.serialize();
            observable.pipe(__1.cast({ Test })).subscribe((value) => {
                tests_init_1.assert(value instanceof Object);
                tests_init_1.assert(Object.values(value).length === 3);
                tests_init_1.assert(value.a instanceof Test);
            });
            observable.next({ a: value, b: value, c: value });
            observable.complete();
        });
    });
    describe('Casts Observables converted using .toPromise()', () => {
        it('Casts single Observable', () => {
            const instance = new Test(), observable = new rxjs_1.Subject(), value = instance.serialize();
            Test.cast(observable.toPromise(), { into: Test }).then(value => {
                tests_init_1.assert(value instanceof Test);
            });
            observable.next(value);
            observable.complete();
        });
        it('Casts Observable array', () => {
            const instance = new Test(), observable = new rxjs_1.Subject(), value = instance.serialize();
            Test.cast(observable.toPromise(), { into: [Test] }).then(value => {
                tests_init_1.assert(value instanceof Array);
                tests_init_1.assert(value.length === 3);
                tests_init_1.assert(value[0] instanceof Test);
            });
            observable.next([value, value, value]);
            observable.complete();
        });
        it('Casts Observable hashmap', () => {
            const instance = new Test(), observable = new rxjs_1.Subject(), value = instance.serialize();
            Test.cast(observable.toPromise(), { into: { Test } }).then(value => {
                tests_init_1.assert(value instanceof Object);
                tests_init_1.assert(Object.values(value).length === 3);
                tests_init_1.assert(value.a instanceof Test);
            });
            observable.next({ a: value, b: value, c: value });
            observable.complete();
        });
    });
});
//# sourceMappingURL=index.spec.js.map