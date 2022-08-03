import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  createMockComponent,
  createMockContextConsumer,
  getMockReturnValue,
} from '~/../jest-utils/Helpers';
import { WithStore, WithStoreWrappedComponent } from '~/app/stores/Stores';
import { ReactElement } from 'react';

jest.doMock('./auth/AuthStore.tsx', () => ({
  UserStore: createMockComponent('AuthStore', 'mock-auth-store'),
}));

jest.doMock('./user/UserStore', () => ({
  UserStore: createMockComponent('UserStore', 'mock-user-store'),
}));

// tslint:disable-next-line:ban
describe.skip('Stores module - contains the aggregated stores component and the WithStore Higher Order Component', () => {
  // tslint:disable-next-line:ban
  describe.skip('Stores component', () => {
    // tslint:disable-next-line:prefer-const
    let storesInstance: RenderResult;

    // tslint:disable-next-line:ban
    describe.skip('expected behaviour is', () => {
      beforeAll(async () => {
        //const { Stores } = await import('./Stores');
        //storesInstance = render(<Stores>{'store children'}</Stores>);
      });

      // tslint:disable-next-line:ban
      it.skip('composes the individual stores for all children to use', () => {
        expect(storesInstance.container).toMatchSnapshot();
        expect(storesInstance.container).toHaveTextContent('store children');
        expect(storesInstance.getAllByTestId('mock-user-store')).toHaveLength(
          1
        );
      });
    });
  });

  describe('WithStore HOC', () => {
    let WithStore: WithStore<Record<string, unknown>>;
    let ComponentWithStore: WithStoreWrappedComponent;
    let componentWithStoreInstance: RenderResult;

    beforeAll(async () => {
      ({ WithStore } = await import('./Stores'));
    });

    describe('when used with a component', () => {
      let MockStore: jest.Mock<React.Consumer<Record<string, unknown>>>;
      let MockComponent: jest.Mock<JSX.Element>;

      beforeAll(async () => {
        MockComponent = createMockComponent('Component', 'mock-component');
        MockStore = createMockContextConsumer('MockStore', 'mock-store', {
          mockProp: 'mock-value',
        });
        ComponentWithStore = WithStore(
          MockComponent,
          (MockStore as unknown) as React.Consumer<Record<string, unknown>>
        );
        componentWithStoreInstance = render(<ComponentWithStore />);
      });

      it('wraps a component so it can consume the store', () => {
        expect(ComponentWithStore.toString()).toMatchSnapshot();
        expect(ComponentWithStore.displayName).toEqual(
          'WithStore(mockConstructor)'
        );
      });

      describe('and the wrapped component is rendered', () => {
        it('the component has access to store data', () => {
          expect(MockStore).toHaveBeenCalled();
          expect(MockStore).toHaveBeenCalledTimes(1);
          expect(MockStore).toHaveBeenCalledWith(
            { children: expect.any(Function) },
            {}
          );
          expect(MockStore).toHaveReturned();

          const storeElement: ReactElement = getMockReturnValue<ReactElement>(
            MockStore
          );

          expect(storeElement.props).toEqual({
            context: { mockProp: 'mock-value' },
          });

          expect(storeElement).toEqualJSX(
            // eslint-disable-next-line
            // @ts-ignore
            <mockConstructor context={{ mockProp: 'mock-value' }} />
          );
        });

        it('the component is called with store props', () => {
          expect(MockComponent).toHaveBeenCalled();
          expect(MockComponent).toHaveBeenCalledTimes(1);
          expect(MockComponent).toHaveBeenCalledWith(
            { context: { mockProp: 'mock-value' } },
            {}
          );
          expect(MockComponent).toHaveReturned();

          const componentElement: ReactElement = getMockReturnValue<
            ReactElement
          >(MockComponent);

          expect(componentElement).toEqualJSX(
            // eslint-disable-next-line
            // @ts-ignore
            <span
              context={JSON.stringify({ mockProp: 'mock-value' })}
              data-mock="Component"
              data-testid="mock-component"
            >
              Mock Component
            </span>
          );
        });
      });
    });
  });
});
