"use strict";
// enTT RxJS lib main, extensible class
// ----------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const entt_1 = require("entt");
/**
 * Main, extensible EnTT class definition
 */
class EnTT extends entt_1.EnTT {
    /**
     * Casts a value of given type as an instance of a parent EnTT Class
     * @param value Value (or structure of values) being cast, or (alternatively) a Promise or Observable about to resolve such a value
     * @param Class Casting target class, or structure:
     * - MyEnTTClass, will cast value as instance of MyEnTTClass
     *    => new myEnTTClass()
     * - [MyEnTTClass], will cast value (assumed to be an array) as an array of instances of MyEnTTClass
     *    => [ new myEnTTClass(), new myEnTTClass(), new myEnTTClass(), ... ]
     * - {MyEnTTClass}, will cast value (assumed to be a hashmap) as a hashmap of instances of MyEnTTClass
     *    => { a: new myEnTTClass(), b: new myEnTTClass(), c: new myEnTTClass(), ... }
     * @param type Type of value being cast
     * @returns Instance (or structure of instances) of the class with deserialized data, or (alternatively) a Promise or Observable about to resolve to such an instance
     */
    static cast(value, { Class = undefined, type = 'object' } = {}) {
        // using @Serializable
        // Check if value is an Observable
        if (value instanceof rxjs_1.Observable) {
            // Pipe observable through a casting transformation
            return value.pipe(operators_1.map(value => {
                return entt_1.EnTT.cast.bind(this)(value, { Class, type });
            }));
        }
        else {
            // Cast value
            return entt_1.EnTT.cast.bind(this)(value, { Class, type });
        }
    }
    /**
     * Creates an extended instance of EnTT.
     */
    constructor() { super(); super.entt(); }
}
exports.EnTT = EnTT;
/**
 * RxJs operator casts value into an EnTT instance or structure
 * @param Class Casting target class, or structure:
 * - MyEnTTClass, will cast value as instance of MyEnTTClass
 *    => new myEnTTClass()
 * - [MyEnTTClass], will cast value (assumed to be an array) as an array of instances of MyEnTTClass
 *    => [ new myEnTTClass(), new myEnTTClass(), new myEnTTClass(), ... ]
 * - {MyEnTTClass}, will cast value (assumed to be a hashmap) as a hashmap of instances of MyEnTTClass
 *    => { a: new myEnTTClass(), b: new myEnTTClass(), c: new myEnTTClass(), ... }
 * @param type Type of value being cast
 * @returns Observable about to resolve cast instance or structure
 */
function cast(Class, type = 'object') {
    return function (value) {
        return EnTT.cast(value, { Class, type });
    };
}
exports.cast = cast;
//# sourceMappingURL=index.js.map