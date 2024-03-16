import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"; // Importing routing components from react-router-dom
import PurchaseWithEth from "./pages/purchase/purchaseWithEth"; // Importing component for purchasing with Ethereum
import PurchaseWithBtc from "./pages/purchase/purchaseWithBtc"; // Importing component for purchasing with Bitcoin
import NoFound from "./pages/noPageFound/noFound";

function App() {
  // Render the application routes using BrowserRouter, Switch, and Route components
  return (
    <BrowserRouter>
      <Switch>
        {/* Redirect the root path to /purchase-with-eth */}
        <Route exact path="/">
          <Redirect to="/purchase-with-eth" />
        </Route>
        {/* Route for purchasing with Ethereum */}
        <Route exact path="/purchase-with-eth" component={PurchaseWithEth} />
        {/* Route for purchasing with Bitcoin */}
        <Route exact path="/purchase-with-btc" component={PurchaseWithBtc} />
        <Route exact path="*" component={NoFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App; // Export the App component
