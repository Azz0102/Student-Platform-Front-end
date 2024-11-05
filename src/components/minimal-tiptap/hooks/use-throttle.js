import { useRef, useCallback } from 'react'

export function useThrottle(
  callback,
  delay
) {
  const lastRan = useRef(Date.now())
  const timeoutRef = useRef < NodeJS.Timeout | null > (null)

  return useCallback(
    (...args) => {
      const handler = () => {
        if (Date.now() - lastRan.current >= delay) {
          callback(...args)
          lastRan.current = Date.now()
        } else {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = setTimeout(
            () => {
              callback(...args)
              lastRan.current = Date.now()
            },
            delay - (Date.now() - lastRan.current)
          )
        }
      }

      handler()
    },
    [callback, delay, timeoutRef]
  )
}
