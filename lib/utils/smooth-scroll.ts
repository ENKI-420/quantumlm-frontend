/**
 * Smooth Scroll Utilities
 * Enhanced scrolling behavior for better UX
 */

export function smoothScrollTo(element: HTMLElement | null, options?: {
  offset?: number
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
}) {
  if (!element) return

  const offset = options?.offset || 0
  const behavior = options?.behavior || 'smooth'
  const block = options?.block || 'start'

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior
  })
}

export function smoothScrollToBottom(container: HTMLElement | null, behavior: ScrollBehavior = 'smooth') {
  if (!container) return

  container.scrollTo({
    top: container.scrollHeight,
    behavior
  })
}

export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export function scrollIntoViewIfNeeded(element: HTMLElement | null, options?: {
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
  inline?: ScrollLogicalPosition
}) {
  if (!element) return

  if (!isElementInViewport(element)) {
    element.scrollIntoView({
      behavior: options?.behavior || 'smooth',
      block: options?.block || 'nearest',
      inline: options?.inline || 'nearest'
    })
  }
}

/**
 * Debounced scroll listener for performance
 */
export function useScrollListener(
  callback: () => void,
  delay: number = 100
): () => void {
  let timeout: NodeJS.Timeout

  const handleScroll = () => {
    clearTimeout(timeout)
    timeout = setTimeout(callback, delay)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', handleScroll)
    clearTimeout(timeout)
  }
}
