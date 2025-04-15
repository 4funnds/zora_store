// components/ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }

    componentDidCatch(error, errorInfo) {
        // Safely log the error
        console.error('Error caught by boundary:', {
            error: error.toString(),
            componentStack: errorInfo.componentStack
        });

        this.setState({ errorInfo });

        // Here you would also log to your error tracking service
        // logErrorToService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">
                            Something went wrong
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {this.state.error?.toString() || 'An unexpected error occurred'}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Refresh Page
                        </button>

                        {/* Optional: Show component stack in development */}
                        {import.meta.env.DEV && this.state.errorInfo && (
                            <details className="mt-4 text-left text-sm text-gray-500">
                                <summary>Error details</summary>
                                <pre className="mt-2 overflow-auto bg-gray-100 p-2 rounded">
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;