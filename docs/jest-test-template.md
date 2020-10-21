#Jest Test template

This is a template for the most common boilerplate when writing a jest unit test.

```typescript jsx
//for testing hooks - import React from 'react';
import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
/* for testing hooks
import {
  renderHook,
  act,
  RenderHookResult,
} from '@testing-library/react-hooks';
*/
import '@testing-library/jest-dom/extend-expect';
import { createMockComponent } from '~/../jest-utils/Helpers';

import { ComponentFC } from './Component.d';

/* for testing hooks
const useEffectSpy = jest
  .spyOn(React, 'useEffect')
  .mockImplementation(useLayoutEffect);
*/

const mockComponent = createMockComponent('OtherComponent', 'mock-other-component');

jest.doMock('../other/OtherComponent', () => ({
  OtherComponent: mockComponent,
}));

describe('Component component', () => {
  const props = {};
  // tslint:disable-next-line:prefer-const
  let Component: ComponentFC;
  let componentInstance: RenderResult;

  beforeAll(async () => {
    ({ Component } = await import('./Component'));
  });

  describe('default behaviour', () => {
    beforeAll(async () => {
      componentInstance = render(
        <Component
          {...props}
        />
      );
    });
 
    it('renders without error', () => {
      const el = componentInstance.container;
      expect(el).toMatchSnapshot();
    });

    it('dependencies are initialised', () => {
      expect(mockComponent).toHaveBeenCalled();
    });
  });
});
```
