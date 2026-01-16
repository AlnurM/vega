/**
 * Stream event types for SSE (Server-Sent Events) emulation
 * Matches structure from llm_stream_dump.jsonl
 */

export type TokenEvent = {
  event: 'token'
  data: {
    delta: string
  }
}

export type DoneEvent = {
  event: 'done'
  data: {
    usage?: {
      input_tokens?: number
      output_tokens?: number
    }
    [key: string]: unknown
  }
}

export type ErrorEvent = {
  event: 'error'
  data: {
    message: string
  }
}

export type StreamEvent = TokenEvent | DoneEvent | ErrorEvent

