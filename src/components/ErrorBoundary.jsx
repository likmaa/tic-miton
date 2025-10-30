import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    // Optionally log to a service
    // console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16 }}>
          <div style={{
            background: '#fff1f0',
            color: '#a8071a',
            border: '1px solid #ffa39e',
            borderRadius: 8,
            padding: 16,
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'
          }}>
            <strong>Une erreur est survenue dans l’interface.</strong>
            <div style={{ marginTop: 8 }}>
              {this.state.error?.message}
            </div>
            {import.meta.env.DEV && this.state.info?.componentStack && (
              <pre style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>
                {this.state.info.componentStack}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
