import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Error boundary component for toast content
 * Prevents toast errors from crashing the entire app
 */
export class ToastErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console
    console.error('Toast error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Return null to hide the problematic content
      return null;
    }

    return this.props.children;
  }
}
