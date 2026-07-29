import { useMemo, useSyncExternalStore } from 'react'

// Single source of truth for the JS breakpoints so they stay in step with the
// @media blocks in global.css.
export const MOBILE_QUERY  = '(max-width: 768px)'   // perf kill-switch
export const COMPACT_QUERY = '(max-width: 860px)'   // matches the existing CSS grid collapse
export const TOUCH_QUERY   = '(pointer: coarse)'
export const MOTION_QUERY  = '(prefers-reduced-motion: reduce)'

const mqlCache = new Map()

function getMql(query) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return null
  let mql = mqlCache.get(query)
  if (!mql) { mql = window.matchMedia(query); mqlCache.set(query, mql) }
  return mql
}

function makeSubscribe(query) {
  return (onStoreChange) => {
    const mql = getMql(query)
    if (!mql) return () => {}
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onStoreChange)
      return () => mql.removeEventListener('change', onStoreChange)
    }
    mql.addListener(onStoreChange)               // Safari < 14
    return () => mql.removeListener(onStoreChange)
  }
}

// useSyncExternalStore rather than useState+useEffect so the value is correct on
// the very first render, otherwise mobile would build a WebGL context for one
// frame before the lighter branch swapped in.
export function useMediaQuery(query) {
  const subscribe = useMemo(() => makeSubscribe(query), [query])
  const getSnapshot = useMemo(() => () => { const m = getMql(query); return m ? m.matches : false }, [query])
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

// Non-hook read, for imperative call sites (canvas setup, GSAP config).
export function prefersReducedMotion() {
  const m = getMql(MOTION_QUERY)
  return m ? m.matches : false
}

export function useDeviceProfile() {
  const isMobile      = useMediaQuery(MOBILE_QUERY)
  const isCompact     = useMediaQuery(COMPACT_QUERY)
  const isTouch       = useMediaQuery(TOUCH_QUERY)
  const reducedMotion = useMediaQuery(MOTION_QUERY)
  // Memoized so consumers can safely put the object itself in a dep array.
  return useMemo(
    () => ({ isMobile, isCompact, isTouch, reducedMotion }),
    [isMobile, isCompact, isTouch, reducedMotion]
  )
}
