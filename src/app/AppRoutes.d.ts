import { PathRouteProps, LayoutRouteProps, IndexRouteProps, RouteProps, Switch } from 'react-router-dom';
import { FunctionComponent, default as React, ReactElement } from 'react';

export type AnyView =
  // tslint:disable-next-line:no-any
  | React.ComponentType<ReactRouterRoutesUnion<any>>
  // tslint:disable-next-line:no-any
  | React.ComponentType<any>;

type ReactRouterRoutesUnion = PathRouteProps | LayoutRouteProps | IndexRouteProps;

export interface ExtendedRouteProps extends PathRouteProps {
  readonly name?: string;
  readonly matchingValues?: string;
  readonly requiresAuth?: boolean;
  readonly scrollToTop?: boolean;
  readonly disabled?: boolean;
  readonly component: AnyView
}

interface UrlPatternOptions {
  escapeChar?: string;
  segmentNameStartChar?: string;
  segmentValueCharset?: string;
  segmentNameCharset?: string;
  optionalSegmentStartChar?: string;
  optionalSegmentEndChar?: string;
  wildcardChar?: string;
}

export interface UrlPattern {
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  new (path: string, options?: UrlPatternOptions): UrlPattern;
  match(path: string): {} | undefined ;
}
