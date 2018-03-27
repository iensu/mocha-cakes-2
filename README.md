# Mocha Cakes 2

Mocha Cakes is a [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin)/[Cucumber](https://cucumber.io/) syntax integration for the [Mocha](https://mochajs.org/) testing framework.

[![Build Status](https://travis-ci.org/iensu/mocha-cakes-2.svg?branch=master)](https://travis-ci.org/iensu/mocha-cakes-2)
[![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAMAAADjyg5GAAABqlBMVEUAAAAzmTM3pEn%2FSTGhVSY4ZD43STdOXk5lSGAyhz41iz8xkz2HUCWFFhTFFRUzZDvbIB00Zzoyfj9zlHY0ZzmMfY0ydT0zjj92l3qjeR3dNSkoZp4ykEAzjT8ylUBlgj0yiT0ymECkwKjWqAyjuqcghpUykD%2BUQCKoQyAHb%2BgylkAyl0EynkEzmkA0mUA3mj86oUg7oUo8n0k%2FS%2Bw%2Fo0xBnE5BpU9Br0ZKo1ZLmFZOjEhesGljuzllqW50tH14aS14qm17mX9%2Bx4GAgUCEx02JySqOvpSXvI%2BYvp2orqmpzeGrQh%2Bsr6yssa2ttK6v0bKxMBy01bm4zLu5yry7yb29x77BzMPCxsLEzMXFxsXGx8fI3PLJ08vKysrKy8rL2s3MzczOH8LR0dHW19bX19fZ2dna2trc3Nzd3d3d3t3f39%2FgtZTg4ODi4uLj4%2BPlGxLl5eXm5ubnRzPn5%2Bfo6Ojp6enqfmzq6urr6%2Bvt7e3t7u3uDwvugwbu7u7v6Obv8fDz8%2FP09PT2igP29vb4%2BPj6y376%2Bu%2F7%2Bfv9%2Ff39%2Fv3%2BkAH%2FAwf%2FtwD%2F9wCyh1KfAAAAKXRSTlMABQ4VGykqLjVCTVNgdXuHj5Kaq62vt77ExNPX2%2Bju8vX6%2Bvr7%2FP7%2B%2FiiUMfUAAADTSURBVAjXBcFRTsIwHAfgX%2FtvOyjdYDUsRkFjTIwkPvjiOTyX9%2FAIJt7BF570BopEdHOOstHS%2BX0s439RGwnfuB5gSFOZAgDqjQOBivtGkCc7j%2B2e8XNzefWSu%2BsZUD1QfoTq0y6mZsUSvIkRoGYnHu6Yc63pDCjiSNE2kYLdCUAWVmK4zsxzO%2BQQFxNs5b479NHXopkbWX9U3PAwWAVSY%2FpZf1udQ7rfUpQ1CzurDPpwo16Ff2cMWjuFHX9qCV0Y0Ok4Jvh63IABUNnktl%2B6sgP%2BARIxSrT%2FMhLlAAAAAElFTkSuQmCC)](http://spiceprogram.org/oss-sponsorship)

## Installation

NPM:

```
npm install --save-dev mocha-cakes-2
```

## Usage

### Enable the mocha-cakes-2 integration

To enable the Mocha integration you need to specify `mocha-cakes-2` in the `ui` option.

#### CLI

Either use the command line argument:

``` javascript
mocha --ui mocha-cakes-2 path/to/my/tests
```

Or set it in your [`mocha.opts`](https://mochajs.org/#mochaopts) file:

``` javascript
--ui mocha-cakes-2
```

#### API

Either pass it in the options as you construct Mocha:

``` javascript
var mocha = new Mocha({
  ui: 'mocha-cakes-2'
});
```

Or set it after you've constructed Mocha:

``` javascript
var mocha = new Mocha();
mocha.ui('mocha-cakes-2')
```

### Test structure

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

### TypeScript

The TypeScript definitions are bundled together with mocha-cakes-2.
To use mocha directly with TypeScript you need types for mocha and [ts-node](https://github.com/TypeStrong/ts-node).

```
npm install --save-dev typescript ts-node @types/mocha
```

You should have a `tsconfig.json` in the root of your project like so

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node"
  }
}
```

Now you can run it like so:

```
mocha -r ts-node/register --ui mocha-cakes-2  ...
```

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

### `beforeEachScenario` and `afterEachScenario`

Executes the provided function only once for each of the scenarios under the current scope.

```javascript
Feature('Some feature', () => {

  beforeEachScenario( () => {
    someSetup();
  });

  afterEachScenario( () => {
    doCleanup();
  });

  Scenario('First scenario', () => {
    // ...
  });

  Scenario('Second scenario', () => {
    // ...
  });

  // ...
});
```

### `beforeEachFeature` and `afterEachFeature`

Executes the provided function only once for each of the features under the current scope.

```javascript
beforeEachFeature( () => {
  someSetup();
});

afterEachFeature( () => {
  doCleanup();
});

Feature('Some feature', () => {
  // ...
});

Feature('Another feature', () => {
  // ...
});

// ...
```

## Development

### Testing the CLI and API interfaces

If you use Mocha directly to run the tests you can set the `MOCHA_INTERFACE` environment variable to either `cli` or `api` to choose which Mocha interface to run the tests with: `MOCHA_INTERFACE=api mocha test/feature/tests.js`.

`MOCHA_INTERFACE` will default to `cli` if no value is set.

When you run `npm run test:cli` or `npm run test:api` (or `npm test` to run them both), `MOCHA_INTERFACE` is set automatically to the appropriate value.

## Acknowledgements

Mocha Cakes 2 is heavily influenced by **quangv**'s [mocha-cakes](https://github.com/quangv/mocha-cakes/).
