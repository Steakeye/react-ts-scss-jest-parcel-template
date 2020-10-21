const { origin } = window.location;

export function getApplicationRootNode(): HTMLElement {
  return document.getElementById('app') as HTMLElement;
}

export function getApplicationRootURL(): string {
  return origin;
}
