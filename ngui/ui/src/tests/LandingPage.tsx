import { useLocation } from "react-router-dom";

/**
 * A stand-in for the page a navigation lands on, for specs: it shows the query and the router state it arrived with
 * as `data-search` and `data-state` (JSON).
 */
const LandingPage = ({ testId }: { testId: string }) => {
  const { search, state } = useLocation();

  return <div data-test-id={testId} data-search={search} data-state={JSON.stringify(state)} />;
};

export default LandingPage;
