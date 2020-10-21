export function isStatusSuccess(status: number): boolean {
  return status === 200;
}

export function isStatusFail(status: number): boolean {
  return status >= 400;
}

export function getContentTypeFromHeaders(headers: HeadersInit): string {
  let contentType: string;

  ({ 'Content-Type': contentType } = headers as Record<'Content-Type', string>);

  if (!contentType) {
    contentType = '';
  }

  return contentType;
}

export function isJsonContentType(contentType: string) {
  return contentType.toUpperCase().includes('JSON');
}
