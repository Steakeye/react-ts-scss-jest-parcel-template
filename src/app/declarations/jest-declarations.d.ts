declare namespace jest {
  interface Matchers<R> {
    toEqualJSX(expected: React.ReactElement): R;
  }
}