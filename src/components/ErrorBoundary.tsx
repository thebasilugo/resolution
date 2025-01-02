import React, { ErrorInfo, ReactNode } from "react";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen flex items-center justify-center bg-gray-100">
					<div className="bg-white p-8 rounded-lg shadow-md">
						<h1 className="text-2xl font-bold mb-4 text-red-600">
							Oops! Something went wrong.
						</h1>
						<p className="text-gray-600">
							We're sorry for the inconvenience. Please try refreshing the page
							or contact support if the problem persists.
						</p>
						<button
							onClick={() => this.setState({ hasError: false })}
							className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
						>
							Try again
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
