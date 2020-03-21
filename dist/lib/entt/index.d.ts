import { EnTT as EnTTBase } from 'entt';
/**
 * Main, extensible EnTT class definition
 */
export declare class EnTT extends EnTTBase {
    /**
     * Casts a value of given type as an instance of a parent EnTT Class
     * @param value Value (or structure of values) being cast, or (alternatively) a Promise or Observable about to resolve such a value
     * @param type Type of value being cast
     * @param Class Casting target class, or structure:
     * - MyEnTTClass, will cast value as instance of MyEnTTClass
     *    => new myEnTTClass()
     * - [MyEnTTClass], will cast value (assumed to be an array) as an array of instances of MyEnTTClass
     *    => [ new myEnTTClass(), new myEnTTClass(), new myEnTTClass(), ... ]
     * - {MyEnTTClass}, will cast value (assumed to be a hashmap) as a hashmap of instances of MyEnTTClass
     *    => { a: new myEnTTClass(), b: new myEnTTClass(), c: new myEnTTClass(), ... }
     * @returns Instance (or structure of instances) of the class with deserialized data, or (alternatively) a Promise or Observable about to resolve to such an instance
     */
    static cast(value: any, type?: "object" | "json", { Class }?: {
        Class?: (new () => EnTT) | (new () => EnTT)[] | Record<any, new () => EnTT>;
    }): void;
    /**
     * Creates an extended instance of EnTT.
     */
    constructor();
}
