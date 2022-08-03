import { RouteComponentProps, RouteProps, Switch } from 'react-router';
import { FunctionComponent, default as React, ReactElement } from 'react';
import { Optional } from '~/app/declarations/common';

export type AnyView =
  // tslint:disable-next-line:no-any
  | React.ComponentType<RouteComponentProps<any>>
  // tslint:disable-next-line:no-any
  | React.ComponentType<any>;

export interface ExtendedRouteProps extends RouteProps {
  readonly name?: string;
  readonly matchingValues?: string;
  readonly requiresAuth?: boolean;
  readonly scrollToTop?: boolean;
  readonly disabled?: boolean;
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
  match(path: string): Optional<{}>;
}
