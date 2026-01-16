import { useState, useRef } from 'react'
import { FileUpload } from '../components/FileUpload'
import { StreamControls, type StreamStatus } from '../components/StreamControls'
import { StreamingOutput } from '../components/StreamingOutput'
import { VegaChartPreview } from '../components/VegaChartPreview'
import { emulateSSE } from '../utils/sseEmulator'
import { extractVegaSpec } from '../utils/vegaExtractor'
import { validateVegaSpec } from '../utils/vegaValidator'
import type { StreamEvent } from '../types/stream'

export function AIExplore() {
  const [events, setEvents] = useState<StreamEvent[]>([])
  const [streamingText, setStreamingText] = useState('')
  const [vegaSpec, setVegaSpec] = useState<Record<string, unknown> | null>(null)
  const [status, setStatus] = useState<StreamStatus>('idle')
  const cleanupRef = useRef<(() => void) | null>(null)

  const handleFileLoaded = (loadedEvents: StreamEvent[]) => {
    setEvents(loadedEvents)
    setStreamingText('')
    setVegaSpec(null)
    setStatus('idle')
  }

  const handlePlay = () => {
    if (events.length === 0) {
      setStatus('error')
      return
    }

    setStatus('streaming')
    setStreamingText('')
    setVegaSpec(null)

    let accumulatedText = ''

    const { promise, cleanup } = emulateSSE(events, 100, (event) => {
      if (event.event === 'token') {
        accumulatedText += event.data.delta
        setStreamingText(accumulatedText)

        // Try to extract and validate Vega spec
        const extractedSpec = extractVegaSpec(accumulatedText)
        if (extractedSpec) {
          const validation = validateVegaSpec(extractedSpec)
          if (validation.isValid) {
            setVegaSpec(extractedSpec)
          }
        }
      } else if (event.event === 'done') {
        setStatus('done')
      } else if (event.event === 'error') {
        setStatus('error')
      }
    })

    cleanupRef.current = cleanup

    promise
      .then(() => {
        if (status !== 'error') {
          setStatus('done')
        }
      })
      .catch(() => {
        setStatus('error')
      })
  }

  const handleStop = () => {
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
    setStatus('idle')
  }

  const handleError = (error: string) => {
    console.error('File upload error:', error)
    setStatus('error')
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>AI Explore</h1>

      <div style={{ marginBottom: '2rem' }}>
        <FileUpload onFileLoaded={handleFileLoaded} onError={handleError} />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <StreamControls
          status={status}
          onPlay={handlePlay}
          onStop={handleStop}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Streaming Output</h2>
        <StreamingOutput text={streamingText} />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Vega Chart Preview</h2>
        <VegaChartPreview spec={vegaSpec} />
      </div>
    </div>
  )
}

