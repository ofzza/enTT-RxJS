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
        constructor() { super(); super.entt(); }
    }
    it('Can initialize extended EnTT class', () => {
        expect(() => { new Test(); }).not.toThrow();
    });
    it('Inherits all EnTT methods and properties', () => {
        const instance = new Test();
        tests_init_1.assert(instance.serialize);
        tests_init_1.assert(instance.deserialize);
        tests_init_1.assert(instance.valid);
        tests_init_1.assert(instance.errors);
        tests_init_1.assert(instance.revert);
    });
    it('Casts Observables', () => {
        const instance = new Test(), observable = new rxjs_1.Subject();
        Test.cast(observable, 'object', { Class: Test })
            .subscribe((value) => {
            tests_init_1.assert(value instanceof Test);
        });
        observable.next(instance.serialize());
    });
    it('Casts Observables converted using .toPromise()', () => {
        const instance = new Test(), observable = new rxjs_1.Subject();
        Test.cast(observable.toPromise(), 'object', { Class: Test })
            .then((value) => {
            tests_init_1.assert(value instanceof Test);
        });
        observable.next(instance.serialize());
        observable.complete();
    });
});
//# sourceMappingURL=index.spec.js.map