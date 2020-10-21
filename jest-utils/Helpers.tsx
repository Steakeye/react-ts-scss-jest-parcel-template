import React, { ReactElement } from 'react';
import { BrowserRouter, RouteComponentProps } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import {
  createMemoryHistory,
  MemoryHistoryBuildOptions,
  Location,
} from 'history';
import { match } from 'react-router';
import { RenderResult } from '@testing-library/react';
// tslint:disable-next-line:ban-ts-ignore
// @ts-ignore
import reactElementToJSXString from 'react-element-to-jsx-string';
import { Optional, POJSObject } from '~/app/declarations/standard';

export interface RouteWrapperConfig {
  children?: JSX.Element[];
}

export function routerWrapper({ children }: RouteWrapperConfig) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

export function svgWrapper(children: JSX.Element | JSX.Element[]) {
  return <svg>{children}</svg>;
}

export function getElementByQuery(
  context: RenderResult | Element,
  query: string
): Optional<Element> {
  const el = (context as RenderResult).container
    ? (context as RenderResult).container
    : (context as Element);

  return el.querySelector(query);
}

function mutateProps(props: POJSObject, stringifyObjects = true): void {
  let key: string;
  // tslint:disable-next-line:forin
  for (key in props) {
    const val = props[key];
    if (key !== 'className') {
      delete props[key];
      key = key.toLowerCase();
    }
    if (key !== 'disabled' && typeof val === 'boolean') {
      props[key] = val.toString();
    } else if (
      val &&
      typeof (val as { $$typeof: unknown }).$$typeof === 'symbol'
    ) {
      let parsedVal: string;

      if (typeof (val as { type: unknown }).type === 'string') {
        parsedVal = reactElementToJSXString(val);
      } else {
        parsedVal = renderToString(val as ReactElement);
      }

      props[key] = parsedVal;
    } else if (stringifyObjects && typeof val === 'object') {
      props[key] = JSON.stringify(val as {});
    } else {
      props[key] = val;
    }
  }
}

export interface MockRouteComponentProps<P> {
  history?: Partial<MemoryHistoryBuildOptions>;
  location?: Partial<Location>;
  match?: Partial<match<P>>;
}

export function createRouteComponentProps<T>({
  history,
  location,
  match,
}: MockRouteComponentProps<T> = {}): RouteComponentProps<T> {
  const defaultLocation = {
    pathname: '',
    search: '',
    state: '',
    hash: '',
  };
  const defaultMatch = { params: {} as T, isExact: true, path: '', url: '' };

  return {
    history: createMemoryHistory(history),
    location: { ...defaultLocation, ...location },
    match: { ...defaultMatch, ...match },
  };
}

export function createMockComponent(
  componentName: string,
  testId: string,
  stringifyObjects = true
) {
  return jest.fn(props => {
    const { children, ...restOfProps } = props;

    mutateProps(restOfProps, stringifyObjects);

    return (
      <span data-mock={componentName} data-testid={testId} {...restOfProps}>
        {children ? children : `Mock ${componentName}`}
      </span>
    );
  });
}

export function createMockContextConsumer(
  componentName: string,
  testId: string,
  mockState: {} = {}
): jest.Mock<React.Consumer<{}>> {
  return jest.fn(props => {
    const { children } = props;

    const childrenResult = children(mockState);

    return childrenResult;
  });
}

export function getMockCallValue<T extends unknown>(
  mock: jest.Mock,
  index = 0
): T[] {
  return mock.mock.calls[index] as T[];
}

export function getMockReturnValue<T extends unknown>(
  mock: jest.Mock,
  index = 0
): T {
  return mock.mock.results[index].value as T;
}

export function createMockAppEnums() {
  enum mockBaseReducerActionType {
    Create = 'mock-create',
    Delete = 'mock-delete',
    Read = 'mock-read',
    Update = 'mock-update',
  }

  enum mockAsyncReducerActionType {
    Request = 'mock-request',
    Receive = 'mock-receive',
    Request = 'mock-request',
  }

  enum mockEditableReducerActionType {
    Remove = 'mock-remove',
    Reset = 'mock-reset',
  }

  const appModule = {
    BaseReducerActionType: mockBaseReducerActionType,
    AsyncReducerActionType: mockAsyncReducerActionType,
    EditableReducerActionType: mockEditableReducerActionType,
  };

  return appModule;
}
