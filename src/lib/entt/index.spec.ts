// enTT RxJS lib base class tests
// ----------------------------------------------------------------------------

// Import dependencies
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

});

