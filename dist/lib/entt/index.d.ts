import { Observable } from 'rxjs';
import { EnTT as EnTTBase } from '@ofzza/entt';
import { TNew, _rawDataType } from '@ofzza/entt';
/**
 * Main, extensible EnTT class definition
 */
export declare class EnTT extends EnTTBase {
    /**
     * Casts a value of given type as an instance of a parent EnTT Class
     * @param value Value (or structure of values) being cast, or (alternatively) a Promise or Observable about to resolve such a value
     * @param into Casting target class, or structure:
     * - MyEnTTClass, will cast value as instance of MyEnTTClass
     *    => new myEnTTClass()
     * - [MyEnTTClass], will cast value (assumed to be an array) as an array of instances of MyEnTTClass
     *    => [ new myEnTTClass(), new myEnTTClass(), new myEnTTClass(), ... ]
     * - {MyEnTTClass}, will cast value (assumed to be a hashmap) as a hashmap of instances of MyEnTTClass
     *    => { a: new myEnTTClass(), b: new myEnTTClass(), c: new myEnTTClass(), ... }
     * @param type Type of value being cast
     * @param validate If cast instance should be validated after
     * @returns Instance (or structure of instances) of the class with deserialized data, or (alternatively) a Promise or Observable about to resolve
     * to such an instance
     */
    static cast<T>(this: TNew<T>, value: Observable<any>, params?: {
        into?: TNew<T>;
        type?: _rawDataType;
        validate?: boolean;
    }): Observable<T>;
    static cast<T>(this: TNew<T>, value: Observable<any>, params?: {
        into?: TNew<T>[];
        type?: _rawDataType;
        validate?: boolean;
    }): Observable<T[]>;
    static cast<T>(this: TNew<T>, value: Observable<any>, params?: {
        into?: Record<any, TNew<T>>;
        type?: _rawDataType;
        validate?: boolean;
    }): Observable<Record<any, T>>;
    static cast<T>(this: TNew<T>, value: Observable<any>, params?: {
        into?: TNew<T> | TNew<T>[] | Record<any, TNew<T>>;
        type?: _rawDataType;
        validate?: boolean;
    }): Observable<T | T[] | Record<any, T>>;
    static cast<T>(this: TNew<T>, value: Promise<any>, params?: {
        into?: TNew<T>;
        type?: _rawDataType;
        validate?: boolean;
    }): Promise<T>;
    static cast<T>(this: TNew<T>, value: Promise<any>, params?: {
        into?: TNew<T>[];
        type?: _rawDataType;
        validate?: boolean;
    }): Promise<T[]>;
    static cast<T>(this: TNew<T>, value: Promise<any>, params?: {
        into?: Record<any, TNew<T>>;
        type?: _rawDataType;
        validate?: boolean;
    }): Promise<Record<any, T>>;
    static cast<T>(this: TNew<T>, value: Promise<any>, params?: {
        into?: TNew<T> | TNew<T>[] | Record<any, TNew<T>>;
        type?: _rawDataType;
        validate?: boolean;
    }): Promise<T | T[] | Record<any, T>>;
    static cast<T>(this: TNew<T>, value: any, params?: {
        into?: TNew<T>;
        type?: _rawDataType;
        validate?: boolean;
    }): T;
    static cast<T>(this: TNew<T>, value: any, params?: {
        into?: TNew<T>[];
        type?: _rawDataType;
        validate?: boolean;
    }): T[];
    static cast<T>(this: TNew<T>, value: any, params?: {
        into?: Record<any, TNew<T>>;
        type?: _rawDataType;
        validate?: boolean;
    }): Record<any, T>;
    static cast<T>(this: TNew<T>, value: any, params?: {
        into?: TNew<T> | TNew<T>[] | Record<any, TNew<T>>;
        type?: _rawDataType;
        validate?: boolean;
    }): T | T[] | Record<any, T>;
    static cast<T>(this: TNew<T>, value: Observable<any> | Promise<any> | any, params?: {
        into?: TNew<T> | TNew<T>[] | Record<any, TNew<T>>;
        type?: _rawDataType;
        validate?: boolean;
    }): T | T[] | Record<any, T> | Promise<T | T[] | Record<any, T>> | Observable<T | T[] | Record<any, T>>;
    /**
     * Creates an extended instance of EnTT.
     */
    constructor();
}
/**
 * RxJs operator casts value into an EnTT instance or structure
 * @param into Casting target class, or structure:
 * - MyEnTTClass, will cast value as instance of MyEnTTClass
 *    => new myEnTTClass()
 * - [MyEnTTClass], will cast value (assumed to be an array) as an array of instances of MyEnTTClass
 *    => [ new myEnTTClass(), new myEnTTClass(), new myEnTTClass(), ... ]
 * - {MyEnTTClass}, will cast value (assumed to be a hashmap) as a hashmap of instances of MyEnTTClass
 *    => { a: new myEnTTClass(), b: new myEnTTClass(), c: new myEnTTClass(), ... }
 * @param type Type of value being cast
 * @param validate If cast instance should be validated after
 * @returns Observable about to resolve cast instance or structure
 */
export declare function cast<T extends EnTT>(into: TNew<T> | TNew<T>[] | Record<any, TNew<T>>, type?: _rawDataType, validate?: boolean): (value: Observable<any>) => Observable<EnTT | EnTT[] | Record<any, EnTT>>;
