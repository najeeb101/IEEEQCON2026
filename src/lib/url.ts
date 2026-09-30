const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes internal paths with the deployment base path; leaves external links untouched. */
export function url(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return base + (path.startsWith('/') ? path : `/${path}`);
}

export function isExternal(href: string): boolean {
  return /^https?:/.test(href);
}

const trim = (p: string) => p.replace(/\/+$/, '') || '/';

/** True when `href` is the current page, or (with `section`) a parent of it. */
export function isActive(currentPath: string, href: string, section = false): boolean {
  const current = trim(currentPath.slice(base.length) || '/');
  const target = trim(href);
  if (target === '/') return current === '/';
  return section ? current === target || current.startsWith(`${target}/`) : current === target;
}
