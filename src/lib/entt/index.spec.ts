// enTT RxJS lib base class tests
// ----------------------------------------------------------------------------

// Import dependencies
import { Subject } from 'rxjs';
import { assert } from '../../tests.init';
import { EnTT, cast } from '../../';

// Test ...
describe('class EnTT', () => {
  class Test extends EnTT {
    constructor() {
      super();
      super.entt();
    }
  }

  it('Can initialize extended EnTT class', () => {
    expect(() => {
      new Test();
    }).not.toThrow();
  });

  it('Inherits all EnTT methods and properties', () => {
    const instance = new Test();
    assert(instance.serialize);
    assert(instance.deserialize);
    assert(instance.valid);
    assert(instance.errors);
    assert(instance.revert);
  });

  describe('Casts Observable', () => {
    it('Casts single Observable', () => {
      const instance = new Test(),
        observable = new Subject(),
        value = instance.serialize();
      Test.cast(observable).subscribe(value => {
        assert(value instanceof Test);
      });
      EnTT.cast(observable, { into: Test }).subscribe(value => {
        assert(value instanceof Test);
      });
      Test.cast(observable, { into: Test }).subscribe(value => {
        assert(value instanceof Test);
      });
      observable.next(value);
      observable.complete();
    });

    it('Casts Observable array', () => {
      const instance = new Test(),
        observable = new Subject(),
        value = instance.serialize();
      Test.cast(observable, { into: [Test] }).subscribe(value => {
        assert(value instanceof Array);
        assert(value.length === 3);
        assert(value[0] instanceof Test);
      });
      EnTT.cast(observable, { into: [Test] }).subscribe(value => {
        assert(value instanceof Array);
        assert(value.length === 3);
        assert(value[0] instanceof Test);
      });
      observable.next([value, value, value]);
      observable.complete();
    });

    it('Casts Observable hashmap', () => {
      const instance = new Test(),
        observable = new Subject(),
        value = instance.serialize();
      Test.cast(observable, { into: { Test } }).subscribe(value => {
        assert(value instanceof Object);
        assert(Object.values(value).length === 3);
        assert(value.a instanceof Test);
      });
      EnTT.cast(observable, { into: { Test } }).subscribe(value => {
        assert(value instanceof Object);
        assert(Object.values(value).length === 3);
        assert(value.a instanceof Test);
      });
      observable.next({ a: value, b: value, c: value });
      observable.complete();
    });
  });

  describe('Cast can be used in Observable.pipe', () => {
    it('Casts single Observable', () => {
      const instance = new Test(),
        observable = new Subject(),
        value = instance.serialize();
      observable.pipe(cast(Test)).subscribe(value => {
        assert(value instanceof Test);
      });
      observable.next(value);
      observable.complete();
    });

    it('Casts Observable array', () => {
      const instance = new Test(),
        observable = new Subject(),
        value = instance.serialize();
      observable.pipe(cast([Test])).subscribe(value => {
        assert(value instanceof Array);
        assert(value.length === 3);
        assert(value[0] instanceof Test);
      });
      observable.next([value, value, value]);
      observable.complete();
    });

    it('Casts Observable hashmap', () => {
      const instance = new Test(),
        observable = new Subject(),
        value = instance.serialize();
      observable.pipe(cast({ Test })).subscribe(value => {
        assert(value instanceof Object);
        assert(Object.values(value).length === 3);
        assert(value.a instanceof Test);
      });
      observable.next({ a: value, b: value, c: value });
      observable.complete();
    });
  });

  describe('Casts Observables converted using .toPromise()', () => {
    it('Casts single Observable', () => {
      const instance = new Test(),
        observable = new Subject(),
        value = instance.serialize();
      Test.cast(observable.toPromise(), { into: Test }).then(value => {
        assert(value instanceof Test);
      });
      observable.next(value);
      observable.complete();
    });

    it('Casts Observable array', () => {
      const instance = new Test(),
        observable = new Subject(),
        value = instance.serialize();
      Test.cast(observable.toPromise(), { into: [Test] }).then(value => {
        assert(value instanceof Array);
        assert(value.length === 3);
        assert(value[0] instanceof Test);
      });
      observable.next([value, value, value]);
      observable.complete();
    });

    it('Casts Observable hashmap', () => {
      const instance = new Test(),
        observable = new Subject(),
        value = instance.serialize();
      Test.cast(observable.toPromise(), { into: { Test } }).then(value => {
        assert(value instanceof Object);
        assert(Object.values(value).length === 3);
        assert(value.a instanceof Test);
      });
      observable.next({ a: value, b: value, c: value });
      observable.complete();
    });
  });
});
