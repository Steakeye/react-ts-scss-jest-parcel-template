import * as UrlPatternModule from 'url-pattern';
import { Optional, OptionalU } from '~/app/declarations/standard';
import {
  ExtendedRouteProps,
  UrlPattern as UrlPatternMatcher,
  UrlPatternOptions,
} from './AppRoutes.d';

const { default: UrlPattern } = (UrlPatternModule as unknown) as {
  default: UrlPatternMatcher;
};

function getPathsToCheck(path: Optional<string | string[]>): string[] {
  let pathsToCheck: string[];

  switch (true) {
    case path instanceof Array:
      {
        pathsToCheck = path as string[];
      }
      break;
    case typeof path === 'string':
      {
        pathsToCheck = [path] as string[];
      }
      break;
    default:
      pathsToCheck = [];
  }

  return pathsToCheck;
}

function getRouteConfigFromPath(
  path: string,
  appRoutes: ExtendedRouteProps[]
): Optional<ExtendedRouteProps> {
  return appRoutes.find((route: ExtendedRouteProps) => {
    const { path: routePath, matchingValues: segmentValueCharset } = route;
    const pathsToCheck: string[] = getPathsToCheck(routePath);
    const options: Optional<UrlPatternOptions> = segmentValueCharset
      ? { segmentValueCharset }
      : undefined;

    const matchedPath: Optional<string> = pathsToCheck.find(pathToCheck => {
      const urlPatternMatcher: UrlPatternMatcher = new UrlPattern(
        pathToCheck,
        options
      );
      return urlPatternMatcher.match(path);
    });

    return matchedPath;
  });
}

function getPathDataFromPathAndRouteConfig<D>(
  path: string,
  { path: routePath, matchingValues: segmentValueCharset }: ExtendedRouteProps
): OptionalU<D> {
  const options: Optional<UrlPatternOptions> = segmentValueCharset
    ? { segmentValueCharset }
    : undefined;
  let params: OptionalU<D> = undefined;

  getPathsToCheck(routePath).find(pathToCheck => {
    const urlPatternMatcher: UrlPatternMatcher = new UrlPattern(
      pathToCheck,
      options
    );
    const match = urlPatternMatcher.match(path);

    const found = !!(match && Object.keys(match).length);

    params = match as D;

    return found;
  });

  return params;
}

export { getRouteConfigFromPath, getPathDataFromPathAndRouteConfig };
