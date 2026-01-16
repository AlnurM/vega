export interface VegaValidationResult {
  isValid: boolean
  errors: string[]
}

/**
 * Validates Vega-Lite spec
 * Checks for required fields: mark and encoding
 * 
 * @param spec - Vega-Lite spec object to validate
 * @returns Validation result with isValid flag and errors array
 */
export function validateVegaSpec(
  spec: Record<string, unknown> | null | undefined
): VegaValidationResult {
  const errors: string[] = []

  if (!spec || typeof spec !== 'object') {
    return {
      isValid: false,
      errors: ['Spec is null, undefined, or not an object'],
    }
  }

  // Check for required 'mark' field
  if (!spec.mark) {
    errors.push("Missing required field: 'mark'")
  } else if (typeof spec.mark !== 'string') {
    errors.push("Field 'mark' must be a string")
  }

  // Check for required 'encoding' field
  if (!spec.encoding) {
    errors.push("Missing required field: 'encoding'")
  } else if (typeof spec.encoding !== 'object' || Array.isArray(spec.encoding)) {
    errors.push("Field 'encoding' must be an object")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

