'use client';

import { Component, type ReactNode } from 'react';
import { Shield } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Dashboard Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-negative)]/10 flex items-center justify-center mx-auto mb-4">
            <Shield size={32} className="text-[var(--color-negative)]" />
          </div>
          <h3 className="font-display font-semibold text-lg text-white mb-2">Something went wrong</h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-4 max-w-sm mx-auto">
            An error occurred while rendering this section. Please try again.
          </p>
          <button
            onClick={this.handleRetry}
            className="btn-primary text-sm !px-4 !py-2 !rounded-lg"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
