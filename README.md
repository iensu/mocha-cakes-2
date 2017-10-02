# Mocha Cakes 2

Mocha Cakes is a [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin)/[Cucumber](https://cucumber.io/) syntax integration for the [Mocha](https://mochajs.org/) testing framework.

## Installation

NPM:

```
npm install --save-dev mocha-cakes-2
```

## Usage

You need to specify `mocha-cakes-2` as a mocha integration by adding the option `--ui mocha-cakes-2` to your `mocha` command:

``` javascript
mocha --ui mocha-cakes-2 path/to/my/tests
```

You can also specify it in your [`mocha.opts`](https://mochajs.org/#mochaopts) file:

``` javascript
--ui mocha-cakes-2
```

```javascript
require('chai').should();

Feature('Some feature', () => {

  Scenario('Some Scenario', () => {

    let number = 2;

    Given('a number', () => {
      number.should.exist;
    });
    And('that number is 2', () => {
      number.should.equal(2);
    });

    When('adding 40', () => {
      number += 40;
    });

    Then('the number should be 42', () => {
      number.should.equal(42);
    });
  });
});
```

The result will look something like this:

<img src="doc/example-feature-v2.png" width="500" />

The common Mocha functions (`describe`, `it`, `before`, `after`, etc) are also available and can be used together with Mocha Cakes.

### Upgrading from version 1.x

Replace the `require('mocha-cakes-2')` statement(s) with the `--ui mocha-cakes-2` option as described above.

## API

The Mocha Cakes integration adds the following functions to the global scope:

* `Feature | feature`
  * `Scenario | scenario`
      - `Given | given`
      - `When | when`
      - `Then | then`
      - `And | and`
      - `But | but`

### `.skip`

Skips a test clause. Works on all test functions.

```javascript
Feature('Some feature', () => {

  Scenario.skip('Skipped scenario', () => {
    // ...
  });

  Scenario('Ordinary', () => {
    // ...
  });
});
```

<img src="doc/skipped-v2.png" width="400" />

### `.only`

Only run the specified test clause. Works on all test functions.

```javascript
Feature('Some feature', () => {

  Scenario('First scenario', () => {
    // ...
  });

  Scenario('Second scenario', () => {
    // ...
  });

  Scenario.only('Only I will run!', () => {
    // ...
  });

  // ...
});
```

<img src="doc/only-v2.png" width="400" />


### TypeScript

The TypeScript definitions are bundled together with mocha-cakes-2.
When using TypeScript run mocha with [`mocha -r ts-node/register ...`](https://github.com/TypeStrong/ts-node).

Your tests should look like this:

```
import 'mocha-cakes-2';

Feature('Some feature', () => {

  Scenario('Some Scenario', () => {

    let number = 2;

    Given('a number', () => {

    });
    And('that number is 2', () => {

    });

    When('adding 40', () => {

    });

    Then('the number should be 42', () => {

    });
  });
});
```


## Acknowledgements

Mocha Cakes 2 is heavily influenced by **quangv**'s [mocha-cakes](https://github.com/quangv/mocha-cakes/).
