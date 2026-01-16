import { useRef, useState } from 'react'
import { parseJsonlFile } from '../utils/jsonlParser'
import type { StreamEvent } from '../types/stream'

interface FileUploadProps {
  onFileLoaded: (events: StreamEvent[]) => void
  onError?: (error: string) => void
  className?: string
}

export function FileUpload({ onFileLoaded, onError, className }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    // Validate file extension
    if (!file.name.endsWith('.jsonl')) {
      const errorMsg = 'Please select a .jsonl file'
      onError?.(errorMsg)
      setSelectedFileName(null)
      return
    }

    setSelectedFileName(file.name)
    setIsLoading(true)

    try {
      const events = await parseJsonlFile(file)
      onFileLoaded(events)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to read file'
      onError?.(errorMsg)
      setSelectedFileName(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".jsonl"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button
        onClick={handleButtonClick}
        disabled={isLoading}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        {isLoading ? 'Loading...' : 'Load dump'}
      </button>
      {selectedFileName && (
        <span style={{ marginLeft: '1rem', color: '#666' }}>
          Selected: {selectedFileName}
        </span>
      )}
    </div>
  )
}

