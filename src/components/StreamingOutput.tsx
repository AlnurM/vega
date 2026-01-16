import { useEffect, useRef } from 'react'

interface StreamingOutputProps {
  text: string
  className?: string
}

export function StreamingOutput({ text, className }: StreamingOutputProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldAutoScrollRef = useRef(true)

  useEffect(() => {
    // Auto-scroll to bottom when new text arrives
    if (containerRef.current && shouldAutoScrollRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [text])

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      // Enable auto-scroll if user is near bottom (within 50px)
      shouldAutoScrollRef.current = scrollHeight - scrollTop - clientHeight < 50
    }
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={className}
      style={{
        overflowY: 'auto',
        maxHeight: '400px',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {text || ''}
    </div>
  )
}

