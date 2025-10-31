interface ErrorLogContext {
  readonly componentStack?: string
  readonly errorBoundary?: string
  readonly userAgent?: string
  readonly url?: string
}

export const logErrorToMonitoring = (error: Error, context?: ErrorLogContext): void => {
  
  if (import.meta.env.DEV) {
    console.error('Error logged to monitoring (dev mode):', {
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
      context,
      timestamp: new Date().toISOString(),
    })
  }
}

