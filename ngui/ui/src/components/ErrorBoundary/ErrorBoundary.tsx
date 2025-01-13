import { Component, PropsWithChildren } from "react";
import { useLocation, type Location } from "react-router-dom";
import SomethingWentWrong from "components/SomethingWentWrong";

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = PropsWithChildren<{
  location: Location;
}>;

class ErrorBoundaryInner extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // Set the local state when the error is caught to display a fallback error component
  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.setState({ hasError: false });
    }
  }

  render() {
    return this.state.hasError ? <SomethingWentWrong /> : this.props.children;
  }
}

const ErrorBoundary = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  return <ErrorBoundaryInner location={location}>{children}</ErrorBoundaryInner>;
};

export default ErrorBoundary;
