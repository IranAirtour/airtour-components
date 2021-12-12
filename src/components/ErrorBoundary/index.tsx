import React, { Component } from 'react';
import { ErrorDialog } from './ErrorDialog';

export type IBaseViewState = {
  showErrorDialog: boolean;
  errorMeta: Error | null;
};

class ErrorBoundary extends Component<{}, IBaseViewState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showErrorDialog: false,
      errorMeta: null,
    };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ showErrorDialog: true, errorMeta: error });
  }
  render() {
    if (this.state.showErrorDialog) {
      return <ErrorDialog errorMeta={this.state.errorMeta} />;
    }
    return <>{this.props.children}</>;
  }
}

export { ErrorBoundary };
