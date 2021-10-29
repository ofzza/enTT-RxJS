// enTT RxJS lib main, extensible class
// ----------------------------------------------------------------------------

// Import dependencies
import { Observable, OperatorFunction, pipe } from 'rxjs';
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
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: Observable<any>,
    params?: { into?: TNew<TInto>; type?: _rawDataType; validate?: boolean },
  ): Observable<unknown extends TInto ? TThis : TInto>;
  // Observable<any[]> => Observable<EnTT[]>
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: Observable<any>,
    params?: { into?: TNew<TInto>[]; type?: _rawDataType; validate?: boolean },
  ): Observable<(unknown extends TInto ? TThis : TInto)[]>;
  // Observable<Record<any, any> => Observable<Record<any, EnTT>>
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: Observable<any>,
    params?: { into?: Record<any, TNew<TInto>>; type?: _rawDataType; validate?: boolean },
  ): Observable<Record<any, unknown extends TInto ? TThis : TInto>>;
  // Observable<any | any[] | Record<any, any> => Observable<EnTT | EnTT[] | Record<any, EnTT>
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: Observable<any>,
    params?: { into?: TNew<TInto> | TNew<TInto>[] | Record<any, TNew<TInto>>; type?: _rawDataType; validate?: boolean },
  ): Observable<(unknown extends TInto ? TThis : TInto) | (unknown extends TInto ? TThis : TInto)[] | Record<any, unknown extends TInto ? TThis : TInto>>;
  // OVERLOADS: Casting promises
  // Promise<any> => Promise<EnTT>
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: Promise<any>,
    params?: { into?: TNew<TInto>; type?: _rawDataType; validate?: boolean },
  ): Promise<unknown extends TInto ? TThis : TInto>;
  // Promise<any[]> => Promise<EnTT[]>
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: Promise<any>,
    params?: { into?: TNew<TInto>[]; type?: _rawDataType; validate?: boolean },
  ): Promise<(unknown extends TInto ? TThis : TInto)[]>;
  // Promise<Record<any, any> => Promise<Record<any, EnTT>>
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: Promise<any>,
    params?: { into?: Record<any, TNew<TInto>>; type?: _rawDataType; validate?: boolean },
  ): Promise<Record<any, unknown extends TInto ? TThis : TInto>>;
  // Promise<any | any[] | Record<any, any> => Promise<EnTT | EnTT[] | Record<any, EnTT>
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: Promise<any>,
    params?: { into?: TNew<TInto> | TNew<TInto>[] | Record<any, TNew<TInto>>; type?: _rawDataType; validate?: boolean },
  ): Promise<(unknown extends TInto ? TThis : TInto) | (unknown extends TInto ? TThis : TInto)[] | Record<any, unknown extends TInto ? TThis : TInto>>;
  // OVERLOADS: Casting values
  // any => EnTT
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: any,
    params?: { into?: TNew<TInto>; type?: _rawDataType; validate?: boolean },
  ): unknown extends TInto ? TThis : TInto;
  // any[] => EnTT[]
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: any,
    params?: { into?: TNew<TInto>[]; type?: _rawDataType; validate?: boolean },
  ): (unknown extends TInto ? TThis : TInto)[];
  // Record<any, any> => Record<any, EnTT>
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: any,
    params?: { into?: Record<any, TNew<TInto>>; type?: _rawDataType; validate?: boolean },
  ): Record<any, unknown extends TInto ? TThis : TInto>;
  // any | any[] | Record<any, any> => EnTT | EnTT[] | Record<any, EnTT>
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: any,
    params?: { into?: TNew<TInto> | TNew<TInto>[] | Record<any, TNew<TInto>>; type?: _rawDataType; validate?: boolean },
  ): (unknown extends TInto ? TThis : TInto) | (unknown extends TInto ? TThis : TInto)[] | Record<any, unknown extends TInto ? TThis : TInto>;
  // OVERLOAD: Combined
  // Observable<any | any[] | Record<any, any> => Observable<EnTT | EnTT[] | Record<any, EnTT>
  // Promise<any | any[] | Record<any, any> => Promise<EnTT | EnTT[] | Record<any, EnTT>
  // any | any[] | Record<any, any> => EnTT | EnTT[] | Record<any, EnTT>
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: Observable<any> | Promise<any> | any,
    params?: { into?: TNew<TInto> | TNew<TInto>[] | Record<any, TNew<TInto>>; type?: _rawDataType; validate?: boolean },
  ):
    | (unknown extends TInto ? TThis : TInto)
    | (unknown extends TInto ? TThis : TInto)[]
    | Record<any, unknown extends TInto ? TThis : TInto>
    | Promise<(unknown extends TInto ? TThis : TInto) | (unknown extends TInto ? TThis : TInto)[] | Record<any, unknown extends TInto ? TThis : TInto>>
    | Observable<(unknown extends TInto ? TThis : TInto) | (unknown extends TInto ? TThis : TInto)[] | Record<any, unknown extends TInto ? TThis : TInto>>;
  // Implementation
  public static cast<TThis, TInto>(
    this: TNew<TThis>,
    value: Observable<any> | Promise<any> | any,
    { into = undefined as TNew<TInto> | TNew<TInto>[] | Record<any, TNew<TInto>>, type = 'object' as _rawDataType, validate = true } = {},
  ):
    | (unknown extends TInto ? TThis : TInto)
    | (unknown extends TInto ? TThis : TInto)[]
    | Record<any, unknown extends TInto ? TThis : TInto>
    | Promise<(unknown extends TInto ? TThis : TInto) | (unknown extends TInto ? TThis : TInto)[] | Record<any, unknown extends TInto ? TThis : TInto>>
    | Observable<(unknown extends TInto ? TThis : TInto) | (unknown extends TInto ? TThis : TInto)[] | Record<any, unknown extends TInto ? TThis : TInto>> {
    // using @Serializable
    // Return observable of cast, resolved value
    if (value instanceof Observable) {
      // Pipe observable through a casting transformation
      return value.pipe(
        map(value => {
          return EnTTBase.cast.bind(this)(value, { into, type, validate });
        }),
      );
    }
    // Cast value using base EnTT class
    else {
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
export function cast<T>(into: TNew<T>, type?: _rawDataType, validate?: boolean): OperatorFunction<any, T>;
export function cast<T>(into: TNew<T>[], type?: _rawDataType, validate?: boolean): OperatorFunction<any[], T[]>;
export function cast<T>(into: Record<any, TNew<T>>, type?: _rawDataType, validate?: boolean): OperatorFunction<Record<any, any>, Record<any, T>>;
export function cast<T>(
  into: TNew<T> | TNew<T>[] | Record<any, TNew<T>>,
  type = 'object' as _rawDataType,
  validate = true,
): OperatorFunction<any | any[] | Record<any, T>, T | T[] | Record<any, T>> {
  // tslint:disable-next-line: only-arrow-functions
  return pipe(map(value => EnTT.cast(value, { into, type, validate }) as T | T[] | Record<any, T>));
}
