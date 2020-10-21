import '@testing-library/jest-dom/extend-expect';
import reactElementToJSXString from 'react-element-to-jsx-string';

expect.extend({
  toEqualJSX(received, expected) {
    const receivedJSXString = reactElementToJSXString(received);
    const expectedJSXString = reactElementToJSXString(expected);

    const pass = receivedJSXString === expectedJSXString;
    let resultMessageMatchFragment = pass ? 'to match' : 'to not match';

    return {
      message() {
        return `expected ${receivedJSXString} ${resultMessageMatchFragment} ${expectedJSXString}`;
      },
      pass: pass,
    };
  },

  toBeTagClassName(received, expected) {
    const foundTagName = received.constructor.name;
    const isPass = received.constructor.name === foundTagName;
    return {
      message: () => `expected ${expected} ${isPass ? 'and': 'but'} got ${foundTagName}`,
      pass: isPass,
    };
  },
});
