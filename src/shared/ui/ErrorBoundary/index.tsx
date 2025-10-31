import { Component, type ErrorInfo, type ReactNode } from 'react'
import { logErrorToMonitoring } from './errorLogger'
import './index.css'

interface ErrorBoundaryProps {
  readonly children: ReactNode
  readonly fallback?: ReactNode
  readonly title?: string
  readonly errorDetailsLabel?: string
  readonly errorBoundaryName?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logErrorToMonitoring(error, {
      componentStack: errorInfo.componentStack ?? undefined,
      errorBoundary: this.props.errorBoundaryName ?? 'ErrorBoundary',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const { title = 'Something went wrong', errorDetailsLabel = 'Error details' } = this.props

      return (
        <div className="error-boundary">
          <h2>{title}</h2>
          {this.state.error && (
            <details>
              <summary>{errorDetailsLabel}</summary>
              <pre>{this.state.error.message}</pre>
              {import.meta.env.DEV && this.state.error.stack && (
                <pre>{this.state.error.stack}</pre>
              )}
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

