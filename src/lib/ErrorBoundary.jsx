import React from "react";
class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: undefined,
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error,
    };
  }

  // Log the error to some sort of a service logger
  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    // if an error occurred
    if (this.state.hasError) {
      return <> {this.props.fallback}</>;
    } else {
      // default behavior
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
