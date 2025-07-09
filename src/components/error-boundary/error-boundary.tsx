import React, { Component } from "react";
import type { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleRefresh = () => window.location.reload();
  handleBack = () => window.history.back();

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-6 py-12">
          <Alert variant="destructive" className="max-w-md">
            <AlertTitle className="text-lg">Something went wrong</AlertTitle>
            <AlertDescription>
              An unexpected error occurred while rendering the page.
            </AlertDescription>
          </Alert>

          <div className="w-full max-w-md rounded-md border bg-muted/50 p-4 text-sm">
            <p className="font-semibold">Error message:</p>
            <pre className="whitespace-pre-wrap break-all">
              {this.state.error?.message || "Unknown error"}
            </pre>
          </div>

          <div className="flex gap-2">
            <Button onClick={this.handleBack}>Go Back</Button>
            <Button variant="outline" onClick={this.handleRefresh}>
              Refresh
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
