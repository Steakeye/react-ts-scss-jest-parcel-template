#Tests Guidelines

1. [General](#general)
    1. [Given-When-Then](#given-when-then)
1. [Unit Tests](#unit-tests)
    1. [Mocking Dependencies](#mocking-dependencies)
1. [Functional Tests](#functional-tests)
    1. TBD
1. [Integration Tests](#integration-tests)
    1. TBD
1. [End to End Tests](#end-to-end-tests)
    1. TBD


##General
This section covers gnereal principles for testing code and how one should write tests. 

...

###Given-When-Then

When writing tests it's important to have a clean structure where it's clear what is being tested and what conditions 
have been simulated in order to generate the test case scenario. Broadly defined, the pattern should follow:

>“Given X thing”
>
> → “When Y scenario”
>
> → “Then X is expected behaviour”

It's also important to cleanly and logically group your assertions by singular concerns, so that testing the behaviour 
is chunked into isolated areas of functionality; this becomes useful when tests fail because it's easier to identify the
 problem instead of having one large assertion block with a number of unrelated things that could be the point of 
 failure.

##Unit Tests

This section covers unit test in mode detail.

...

###Mocking Dependencies

As unit tests are meant to be as granular as to only test a singular class or module, usually in a single file, it's 
important that the coverage within the test correctly reflects this; ideally this means by having mocked dependencies in
the tests for all concrete dependencies in the class/module. In only a few exceptional cases might it make sense to 
import the concrete dependency in order to test yor implementation but generally speaking, if the dependency is another 
file in the project, it should have its own set of unit tests to cover its own functionality and if it's a 3rd party 
library then it's not your responsibility to test it.

####Mocking JSX Components in Jest

One of the most common situations where you will need to mock something is a JSX component and whether that's another 
file in the code base or a 3rd party component the pattern is likely to be much the same. For the sake of clarity, it's 
a good idea that the `data-mock` attribute is adopted (as well as the `data-testid` attribute) just to make it clear 
that the dependency being used is a mocked version. Below is an example of a 3rd party component that has been mocked in
 this manner.

```typescript jsx
import { Link } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(props => {
    const { children, ...restOfProps } = props;
    return <span data-testid="mock-link" data-mock="Link" {...restOfProps}>{children}</span>;
  }),
}));
```

####Verifying Usage of Dependencies

When mocking or spying dependencies it is possible to verify what arguments are passed in (and even the return value). 
 While spies wrap the concrete implementation and so the actual behaviour also executes, so other forms of assertions 
 can be made using call signature assertion is especially important for pure mocks. 
 
 Here follows an example of an assertion of a mock function call:
 ```typescript
import { func } from 'dependency'

jest.mock('dependency', () => ({
  func: jest.fn(),
}));

const testArgument = 'test-string';

func(testArgument);

expect(func).toHaveBeenCalledWith(testArgument); // returns true
```

 For more information see the 
 [Jest expect](https://jestjs.io/docs/en/expect.html#tohavebeencalledwitharg1-arg2-) documentation.
 
 ####Asserting DOM Elements
 Please see the following links for more information about libraries being used alongside js-dom to evaluate the JSX 
 components:
 
 - https://testing-library.com/docs/dom-testing-library/api-queries
 - [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)
 
 ## Functional Tests
 TBD
 
 ## Integration Tests
 TBD
 
 ## End to End Tests
TBD
