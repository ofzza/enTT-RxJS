// enTT RxJS lib main, extensible class
// ----------------------------------------------------------------------------

// Import dependencies
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnTT as EnTTBase } from '@ofzza/entt';
import { TNew, _rawDataType } from '@ofzza/entt';

/**
 * Main, extensible EnTT class definition
 */
export class EnTT extends EnTTBase {
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
  // OVERLOADS: Casting observables
  // Observable<any> => Observable<EnTT>
  public static cast<T>(this: TNew<T>, value: Observable<any>, params?: { into?: TNew<T>; type?: _rawDataType; validate?: boolean }): Observable<T>;
  // Observable<any[]> => Observable<EnTT[]>
  public static cast<T>(this: TNew<T>, value: Observable<any>, params?: { into?: TNew<T>[]; type?: _rawDataType; validate?: boolean }): Observable<T[]>;
  // Observable<Record<any, any> => Observable<Record<any, EnTT>>
  public static cast<T>(
    this: TNew<T>,
    value: Observable<any>,
    params?: { into?: Record<any, TNew<T>>; type?: _rawDataType; validate?: boolean },
  ): Observable<Record<any, T>>;
  // Observable<any | any[] | Record<any, any> => Observable<EnTT | EnTT[] | Record<any, EnTT>
  public static cast<T>(
    this: TNew<T>,
    value: Observable<any>,
    params?: { into?: TNew<T> | TNew<T>[] | Record<any, TNew<T>>; type?: _rawDataType; validate?: boolean },
  ): Observable<T | T[] | Record<any, T>>;
  // OVERLOADS: Casting promises
  // Promise<any> => Promise<EnTT>
  public static cast<T>(this: TNew<T>, value: Promise<any>, params?: { into?: TNew<T>; type?: _rawDataType; validate?: boolean }): Promise<T>;
  // Promise<any[]> => Promise<EnTT[]>
  public static cast<T>(this: TNew<T>, value: Promise<any>, params?: { into?: TNew<T>[]; type?: _rawDataType; validate?: boolean }): Promise<T[]>;
  // Promise<Record<any, any> => Promise<Record<any, EnTT>>
  public static cast<T>(
    this: TNew<T>,
    value: Promise<any>,
    params?: { into?: Record<any, TNew<T>>; type?: _rawDataType; validate?: boolean },
  ): Promise<Record<any, T>>;
  // Promise<any | any[] | Record<any, any> => Promise<EnTT | EnTT[] | Record<any, EnTT>
  public static cast<T>(
    this: TNew<T>,
    value: Promise<any>,
    params?: { into?: TNew<T> | TNew<T>[] | Record<any, TNew<T>>; type?: _rawDataType; validate?: boolean },
  ): Promise<T | T[] | Record<any, T>>;
  // OVERLOADS: Casting values
  // any => EnTT
  public static cast<T>(this: TNew<T>, value: any, params?: { into?: TNew<T>; type?: _rawDataType; validate?: boolean }): T;
  // any[] => EnTT[]
  public static cast<T>(this: TNew<T>, value: any, params?: { into?: TNew<T>[]; type?: _rawDataType; validate?: boolean }): T[];
  // Record<any, any> => Record<any, EnTT>
  public static cast<T>(this: TNew<T>, value: any, params?: { into?: Record<any, TNew<T>>; type?: _rawDataType; validate?: boolean }): Record<any, T>;
  // any | any[] | Record<any, any> => EnTT | EnTT[] | Record<any, EnTT>
  public static cast<T>(
    this: TNew<T>,
    value: any,
    params?: { into?: TNew<T> | TNew<T>[] | Record<any, TNew<T>>; type?: _rawDataType; validate?: boolean },
  ): T | T[] | Record<any, T>;
  // OVERLOAD: Combined
  // Observable<any | any[] | Record<any, any> => Observable<EnTT | EnTT[] | Record<any, EnTT>
  // Promise<any | any[] | Record<any, any> => Promise<EnTT | EnTT[] | Record<any, EnTT>
  // any | any[] | Record<any, any> => EnTT | EnTT[] | Record<any, EnTT>
  public static cast<T>(
    this: TNew<T>,
    value: Observable<any> | Promise<any> | any,
    params?: { into?: TNew<T> | TNew<T>[] | Record<any, TNew<T>>; type?: _rawDataType; validate?: boolean },
  ): T | T[] | Record<any, T> | Promise<T | T[] | Record<any, T>> | Observable<T | T[] | Record<any, T>>;
  // Implementation
  public static cast<T>(
    this: TNew<T>,
    value: Observable<any> | Promise<any> | any,
    { into = undefined as TNew<T> | TNew<T>[] | Record<any, TNew<T>>, type = 'object' as _rawDataType, validate = true } = {},
  ): T | T[] | Record<any, T> | Promise<T | T[] | Record<any, T>> | Observable<T | T[] | Record<any, T>> {
    // using @Serializable
    // Check if value is an Observable
    if (value instanceof Observable) {
      // Pipe observable through a casting transformation
      return value.pipe(
        map(value => {
          return EnTTBase.cast.bind(this)(value, { into, type, validate });
        }),
      );
    } else {
      // Cast value
      return EnTTBase.cast.bind(this)(value, { into, type, validate });
    }
  }

  /**
   * Creates an extended instance of EnTT.
   */
  constructor() {
    super();
    super.entt();
  }
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
export function cast<T extends EnTT>(into: TNew<T> | TNew<T>[] | Record<any, TNew<T>>, type = 'object' as _rawDataType, validate = true) {
  // tslint:disable-next-line: only-arrow-functions
  return function (value: Observable<any>): Observable<EnTT | EnTT[] | Record<any, EnTT>> {
    return EnTT.cast(value, { into, type, validate });
  };
}
