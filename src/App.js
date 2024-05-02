import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import PurchaseWithEth from "./pages/purchase/purchaseWithEth";
import PurchaseWithBtc from "./pages/purchase/purchaseWithBtc";
import GetFreeUSB from './pages/purchase/getFreeUSB';
import NoFound from "./pages/noPageFound/noFound";

function App() {
  return (
    
    <Router>
      <Routes>
        {/* Redirect the root path to /purchase-with-eth */}
        <Route path="/" element={<Navigate to="/purchase-with-eth" />} />
        {/* Route for purchasing with Ethereum */}
        <Route path="/purchase-with-eth" element={<PurchaseWithEth />} />
        {/* Route for purchasing with Bitcoin */}
        <Route path="/purchase-with-btc" element={<PurchaseWithBtc />} />
        <Route path="/free-usb-coin" element={<GetFreeUSB />} />
        {/* Route for handling 404 */}
        <Route path="*" element={<NoFound />} />
      </Routes>
    </Router>
  );
}

export default App;
