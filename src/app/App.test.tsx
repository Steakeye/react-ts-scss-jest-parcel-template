import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMockComponent } from '~/../jest-utils/Helpers';

jest.mock('./Config.ts', () => ({
  Config: {},
}));

jest.doMock('./stores/Stores', () => ({
  Stores: createMockComponent('Stores', 'mock-stores'),
}));

jest.doMock('./AuthenticatedRoute', () => ({
  AuthenticatedRoute: createMockComponent(
    'AuthenticatedRoute',
    'mock-authenticated-route'
  ),
}));

jest.mock('./AppRoutes', () => ({
  GlobalHistory: jest.fn(props => props.children),
  AppRoutes: [{ exact: true, path: '/', component: () => 'Mock View' }],
}));

// tslint:disable-next-line:ban
describe.skip('App entrypoint', () => {
  let App: React.JSXElementConstructor<Record<string, unknown>>;
  let appInstance: RenderResult;

  beforeAll(async () => {
    ({ App } = await import('./App'));
  });

  beforeEach(() => {
    appInstance = render(<App />);
  });

  // tslint:disable-next-line:ban
  it.skip('renders without error', () => {
    const el = appInstance.container;

    expect(el).toMatchSnapshot();
    expect(el).toHaveTextContent('Mock Route - Mock View');
  });
});
