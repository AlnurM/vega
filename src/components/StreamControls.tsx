export type StreamStatus = 'idle' | 'streaming' | 'done' | 'error'

interface StreamControlsProps {
  status: StreamStatus
  onPlay: () => void
  onStop: () => void
  className?: string
}

export function StreamControls({ status, onPlay, onStop, className }: StreamControlsProps) {
  const isIdle = status === 'idle'
  const isStreaming = status === 'streaming'
  const isDone = status === 'done'
  const isError = status === 'error'

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <button
        onClick={onPlay}
        disabled={!isIdle && !isDone && !isError}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: isIdle || isDone || isError ? 'pointer' : 'not-allowed',
          opacity: isIdle || isDone || isError ? 1 : 0.6,
        }}
      >
        Play
      </button>
      <button
        onClick={onStop}
        disabled={!isStreaming}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: isStreaming ? 'pointer' : 'not-allowed',
          opacity: isStreaming ? 1 : 0.6,
        }}
      >
        Stop
      </button>
      <span
        style={{
          padding: '0.5rem 1rem',
          fontSize: '0.9rem',
          color: '#666',
          textTransform: 'capitalize',
        }}
      >
        Status: <strong>{status}</strong>
      </span>
    </div>
  )
}

