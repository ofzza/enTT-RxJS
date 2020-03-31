// README.md file examples' tests
// ----------------------------------------------------------------------------

// Import dependencies
import { Subject } from 'rxjs';
import { assert } from './tests.init'
import { EnTT, cast } from './';

// Test ...
describe('README examples', () => {

  describe('Using @Serializable decorator', () => {

    describe('Cast accepts RxJS Observables', () => {

      it('Example', () => {

        class MyPersonClass extends EnTT {
          constructor () { super(); super.entt(); }
      
          public firstName = undefined as string;
          public lastName = undefined as string;
        }
      
        const instance = new MyPersonClass();
        instance.firstName = 'John';
        instance.lastName = 'Doe';
      
        const serialized = instance.serialize();
        assert(JSON.stringify(serialized) === JSON.stringify({ firstName: "John", lastName: "Doe" }));
      
        const observable = new Subject(),
              castObservable = MyPersonClass.cast(observable, { into: MyPersonClass });
        castObservable.subscribe((value) => {
          assert(value instanceof MyPersonClass);
          assert(value.firstName === 'John');
          assert(value.lastName === 'Doe');                
        });
        observable.next(serialized);
        observable.complete();

      });

    });

    describe('Exposes RxJS "cast" operator to use with .pipe()', () => {

      it('Example', () => {

        class MyPersonClass extends EnTT {
          constructor () { super(); super.entt(); }
      
          public firstName = undefined as string;
          public lastName = undefined as string;
        }
      
        const instance = new MyPersonClass();
        instance.firstName = 'John';
        instance.lastName = 'Doe';
      
        const serialized = instance.serialize();
        assert(JSON.stringify(serialized) === JSON.stringify({ firstName: "John", lastName: "Doe" }));
      
        const observable = new Subject();
        observable
          .pipe(cast(MyPersonClass))
          .subscribe((value: any) => {
            assert(value instanceof MyPersonClass);
            assert(value.firstName === 'John');
            assert(value.lastName === 'Doe');                
          });
        observable.next(serialized);
        observable.complete();

      });

    });

  });

});
