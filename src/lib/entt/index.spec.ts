// enTT RxJS lib base class tests
// ----------------------------------------------------------------------------

// Import dependencies
import { Subject } from 'rxjs';
import { assert } from '../../tests.init'
import { EnTT }  from '../../';

// Test ...
describe('class EnTT', () => {

  class Test extends EnTT {
    constructor () { super(); super.entt(); }
  }

  it('Can initialize extended EnTT class', () => {
    expect(() => { new Test(); }).not.toThrow();
  });

  it('Inherits all EnTT methods and properties', () => {
    const instance = new Test();
    assert(instance.serialize);
    assert(instance.deserialize);
    assert(instance.valid);
    assert(instance.errors);
    assert(instance.revert);
  });

  it('Casts Observables', () => {
    const instance = new Test(),
          observable = new Subject();
    Test.cast(observable, 'object', { Class: Test })
      .subscribe((value) => {
        assert(value instanceof Test);
      });
    observable.next(instance.serialize());
  });

  it('Casts Observables converted using .toPromise()', () => {
    const instance = new Test(),
          observable = new Subject();
    Test.cast(observable.toPromise(), 'object', { Class: Test })
      .then((value) => {
        assert(value instanceof Test);
      });
    observable.next(instance.serialize());
    observable.complete();
  });

});

