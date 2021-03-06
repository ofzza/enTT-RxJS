# enTT RxJS

`enTT-RxJS` is a RxJS compatible extension of [enTT](https://github.com/ofzza/enTT), read as "Entity" - an extensible TypeScript data-modeling solution with some of the typically required functionality, such as change-detection, easy import/export, composition/decomposition, data validation, etc., all available out of the box and easy to use.

###### Table of contents:

- [Get enTT](#get-entt-rxjs)
- [Using enTT](#using-entt-rxjs)
- [Contributing](#contributing)
  - [Reporting Issues](#reporting-issues)
  - [Contributing Code](#contributing-code)

# Get enTT-RxJS

To start using `enTT-RxJS` in your project, simply install it from NPM by running the following in your terminal:

```sh
> npm install @ofzza/entt-rxjs --save
```

# Using enTT-RxJS

Usage of `enTT-RxJS` is nearly identical to [enTT](https://github.com/ofzza/enTT), so please read up on basic usage of [enTT](https://github.com/ofzza/enTT) first! Covered here will be only what is different from the base [enTT](https://github.com/ofzza/enTT) implementation ...

### Cast accepts RxJS Observables

If passed a RxJS Observable, cast will return a piped Observable which will map any resolved value to a cast instance, in line with how the base [enTT](https://github.com/ofzza/enTT) library works with Promises, like so:

<details><summary>EXAMPLE</summary>

```ts
import { EnTT } from '@ofzza/entt-rxjs';
import { Subject } from 'rxjs';

class MyPersonClass extends EnTT {
  constructor() {
    super();
    super.entt();
  }

  public firstName = undefined as string;
  public lastName = undefined as string;
}

const instance = new MyPersonClass();
instance.firstName = 'John';
instance.lastName = 'Doe';

const serialized = instance.serialize();
console.log(serialized); // Outputs: { firstName: "John", lastName: "Doe" }

const observable = new Subject(),
  castObservable = MyPersonClass.cast(observable, { target: MyPersonClass });
castObservable.subscribe(value => {
  console.log(value instanceof MyPersonClass); // Outputs: true
  console.log(value.firstName); // Outputs: "John"
  console.log(value.lastName); // Outputs: "Doe"
});
observable.next(serialized);
observable.complete();
```

</details>

### Exposes RxJS "cast" operator to use with .pipe()

To cast a value as an EnTT in an RxJS pipe user the `cast` operator, like so:

<details><summary>EXAMPLE</summary>

```ts
import { EnTT, cast } from '@ofzza/entt-rxjs';
import { Subject } from 'rxjs';

class MyPersonClass extends EnTT {
  constructor() {
    super();
    super.entt();
  }

  public firstName = undefined as string;
  public lastName = undefined as string;
}

const instance = new MyPersonClass();
instance.firstName = 'John';
instance.lastName = 'Doe';

const serialized = instance.serialize();
console.log(serialized); // Outputs: { firstName: "John", lastName: "Doe" }

const observable = new Subject();
observable.pipe(cast(MyPersonClass)).subscribe(value => {
  console.log(value instanceof MyPersonClass); // Outputs: true
  console.log(value.firstName); // Outputs: "John"
  console.log(value.lastName); // Outputs: "Doe"
});
observable.next(serialized);
observable.complete();
```

</details>

<!--

TODO:

- [ ] Add entt as a real npm package dependency


-->

# Contributing

## Reporting Issues

When reporting issues, please keep to provided templates.

Before reporting issues, please read: [GitHub Work-Flow](https://github.com/ofzza/onboarding/blob/master/CONTRIBUTING/github.md)

## Contributing Code

For work-flow and general etiquette when contributing, please see:

- [Git Source-Control Work-Flow](https://github.com/ofzza/onboarding/blob/master/CONTRIBUTING/git.md)
- [GitHub Work-Flow](https://github.com/ofzza/onboarding/blob/master/CONTRIBUTING/github.md)

Please accompany any work, fix or feature with their own issue, in it's own branch (see [Git Source-Control Work-Flow](https://github.com/ofzza/onboarding/blob/master/CONTRIBUTING/git.md) for branch naming conventions), and once done, request merge via pull request.

When creating issues and PRs, please keep to provided templates.
