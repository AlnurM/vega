import { useEffect, useRef } from 'react'
import * as vegaEmbed from 'vega-embed'

interface VegaChartPreviewProps {
  spec: Record<string, unknown> | null
  className?: string
}

// Hardcoded data as per requirements
const HARDCODED_DATA = [
  { region: 'Almaty', revenue: 120 },
  { region: 'Astana', revenue: 90 },
  { region: 'Shymkent', revenue: 70 },
]

export function VegaChartPreview({ spec, className }: VegaChartPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!spec || !containerRef.current) {
      return
    }

    // Clear previous chart
    containerRef.current.innerHTML = ''

    // Add data to spec
    const specWithData = {
      ...spec,
      data: { values: HARDCODED_DATA },
    } as Record<string, unknown>

    // Render chart using vega-embed
    vegaEmbed
      .default(containerRef.current, specWithData as vegaEmbed.VisualizationSpec, {
        actions: false,
      })
      .catch((error) => {
        // Handle render errors gracefully
        console.error('Failed to render Vega chart:', error)
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div style="color: red; padding: 1rem;">Error rendering chart: ${error.message}</div>`
        }
      })

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [spec])

  if (!spec) {
    return (
      <div
        className={className}
        style={{
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          textAlign: 'center',
          color: '#666',
        }}
      >
        No chart spec available
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    />
  )
}

