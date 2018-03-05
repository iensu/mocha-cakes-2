interface MochaCakesTestFn {
  (t: string, f: Function): any;
  only(t: string, f: Function): any;
  skip(t: string, f: Function): any;
}

declare var Feature: MochaCakesTestFn;
declare var Scenario: MochaCakesTestFn;
declare var Given: MochaCakesTestFn;
declare var And: MochaCakesTestFn;
declare var When: MochaCakesTestFn;
declare var Then: MochaCakesTestFn;
declare var But: MochaCakesTestFn;

declare var feature: MochaCakesTestFn;
declare var scenario: MochaCakesTestFn;
declare var given: MochaCakesTestFn;
declare var and: MochaCakesTestFn;
declare var when: MochaCakesTestFn;
declare var then: MochaCakesTestFn;
declare var but: MochaCakesTestFn;
