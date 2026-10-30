/** Mount each element once per page and release resources before the DOM swap. */
export function onPageLoad<T extends HTMLElement>(
  selector: string,
  setup: (element: T) => void | (() => void),
) {
  const mounted = new Map<T, void | (() => void)>();

  document.addEventListener('astro:page-load', () => {
    for (const element of document.querySelectorAll<T>(selector)) {
      if (!mounted.has(element)) mounted.set(element, setup(element));
    }
  });

  document.addEventListener('astro:before-swap', () => {
    for (const cleanup of mounted.values()) {
      if (typeof cleanup === 'function') cleanup();
    }
    mounted.clear();
  });
}
