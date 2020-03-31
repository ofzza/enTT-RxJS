import { Observable } from 'rxjs';
import { EnTT as EnTTBase } from 'entt';
/**
 * Main, extensible EnTT class definition
 */
export declare class EnTT extends EnTTBase {
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
    static cast(value: any, { Class, type }?: {
        Class?: (new () => EnTT) | (new () => EnTT)[] | Record<any, new () => EnTT>;
        type?: "object" | "json";
    }): any;
    /**
     * Creates an extended instance of EnTT.
     */
    constructor();
}
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
export declare function cast<T extends EnTT>(Class: ((new () => T) | (new () => T)[] | Record<any, (new () => T)>), type?: "object" | "json"): <T_1>(value: Observable<T_1>) => any;
