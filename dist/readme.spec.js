"use strict";
// README.md file examples' tests
// ----------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const rxjs_1 = require("rxjs");
const tests_init_1 = require("./tests.init");
const _1 = require("./");
// Test ...
describe('README examples', () => {
    describe('Using @Serializable decorator', () => {
        describe('Cast accepts RxJS Observables', () => {
            it('Example', () => {
                class MyPersonClass extends _1.EnTT {
                    constructor() {
                        super();
                        this.firstName = undefined;
                        this.lastName = undefined;
                        super.entt();
                    }
                }
                const instance = new MyPersonClass();
                instance.firstName = 'John';
                instance.lastName = 'Doe';
                const serialized = instance.serialize();
                tests_init_1.assert(JSON.stringify(serialized) === JSON.stringify({ firstName: "John", lastName: "Doe" }));
                const observable = new rxjs_1.Subject(), castObservable = MyPersonClass.cast(observable, { Class: MyPersonClass });
                castObservable.subscribe((value) => {
                    tests_init_1.assert(value instanceof MyPersonClass);
                    tests_init_1.assert(value.firstName === 'John');
                    tests_init_1.assert(value.lastName === 'Doe');
                });
                observable.next(serialized);
                observable.complete();
            });
        });
        describe('Exposes RxJS "cast" operator to use with .pipe()', () => {
            it('Example', () => {
                class MyPersonClass extends _1.EnTT {
                    constructor() {
                        super();
                        this.firstName = undefined;
                        this.lastName = undefined;
                        super.entt();
                    }
                }
                const instance = new MyPersonClass();
                instance.firstName = 'John';
                instance.lastName = 'Doe';
                const serialized = instance.serialize();
                tests_init_1.assert(JSON.stringify(serialized) === JSON.stringify({ firstName: "John", lastName: "Doe" }));
                const observable = new rxjs_1.Subject();
                observable
                    .pipe(_1.cast(MyPersonClass))
                    .subscribe((value) => {
                    tests_init_1.assert(value instanceof MyPersonClass);
                    tests_init_1.assert(value.firstName === 'John');
                    tests_init_1.assert(value.lastName === 'Doe');
                });
                observable.next(serialized);
                observable.complete();
            });
        });
    });
});
//# sourceMappingURL=readme.spec.js.map