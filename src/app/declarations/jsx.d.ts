declare namespace JSX {
  interface IntrinsicAttributes {
    // tslint:disable-next-line:no-any
    children?:
      | Element
      | Element[]
      | ((...args: any[]) => Element)
      | string
      | number
      | boolean
      | Record<string, unknown>
      | null;
    context?: any;
    className?: string;
    // tslint:disable-next-line:no-any
    value?: any;
  }
}
