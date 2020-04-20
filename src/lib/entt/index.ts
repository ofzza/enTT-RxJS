// enTT RxJS lib main, extensible class
// ----------------------------------------------------------------------------

// Import dependencies
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnTT as EnTTBase } from '@ofzza/entt';

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
   * @returns Instance (or structure of instances) of the class with deserialized data, or (alternatively) a Promise or Observable about to resolve to such an instance
   */
  public static cast (value, { into = undefined as ((new() => EnTT) | (new() => EnTT)[] | Record<any, (new() => EnTT)>), type = 'object' as 'object'|'json' } = {}) {
    // using @Serializable
    // Check if value is an Observable
    if (value instanceof Observable) {
      // Pipe observable through a casting transformation
      return value.pipe(map(value => {
        return EnTTBase.cast.bind(this)(value, { into, type });
      }));
    } else {
      // Cast value
      return EnTTBase.cast.bind(this)(value, { into, type });
    }
  }

  /**
   * Creates an extended instance of EnTT.
   */
  constructor () { super(); super.entt(); }
  
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
 * @returns Observable about to resolve cast instance or structure
 */
export function cast <T extends EnTT> (into: ((new() => T) | (new() => T)[] | Record<any, (new() => T)>), type = 'object' as 'object'|'json') {
  return function <T> (value: Observable<T>) {
    return EnTT.cast(value, { into, type });
  };
}
