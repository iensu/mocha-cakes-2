interface MochaCakesTestFn {
  (description: string, testFn: Function): any;
  only(description: string, testFn: Function): any;
  skip(description: string, testFn: Function): any;
}

interface MochaCakesDone {
  (error?: any): any
}

interface MochaCakesHookCallback {
  (done: MochaCakesDone): void;
}

interface MochaCakesHook {
  (callback: MochaCakesHookCallback): void;
  (description: string, callback: MochaCakesHookCallback): void;
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

declare var afterEachFeature: MochaCakesHook;
declare var beforeEachFeature: MochaCakesHook;
declare var afterEachScenario: MochaCakesHook;
declare var beforeEachScenario: MochaCakesHook;
