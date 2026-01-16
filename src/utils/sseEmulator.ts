import type { StreamEvent } from '../types/stream'

export type SSEEmulatorCallback = (event: StreamEvent) => void

export type SSEEmulatorCleanup = () => void

/**
 * Emulates SSE streaming by emitting events one by one with configurable delay
 * 
 * @param events - Array of StreamEvent objects to emit
 * @param delay - Delay between events in milliseconds (50-150ms recommended)
 * @param onEvent - Callback function called for each event
 * @returns Promise that resolves when all events are emitted, and cleanup function to cancel
 */
export function emulateSSE(
  events: StreamEvent[],
  delay: number,
  onEvent: SSEEmulatorCallback
): { promise: Promise<void>; cleanup: SSEEmulatorCleanup } {
  let cancelled = false
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const cleanup: SSEEmulatorCleanup = () => {
    cancelled = true
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  const promise = new Promise<void>((resolve, reject) => {
    let currentIndex = 0

    const emitNext = () => {
      if (cancelled) {
        resolve()
        return
      }

      if (currentIndex >= events.length) {
        resolve()
        return
      }

      try {
        onEvent(events[currentIndex])
        currentIndex++

        if (currentIndex < events.length) {
          timeoutId = setTimeout(emitNext, delay)
        } else {
          resolve()
        }
      } catch (error) {
        reject(error)
      }
    }

    // Start emitting events
    timeoutId = setTimeout(emitNext, delay)
  })

  return { promise, cleanup }
}

