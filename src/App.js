import Header from "./Components/layout/Header";
import { useEffect } from "react";
import Home from "./Components/Home/Home";
import Footer from "./Components/layout/Footer";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./Components/Authorization/Login/Login";
import Register from "./Components/Authorization/Register/Register";
import Purchase from "./Components/Purchase/Purchase";
import PurchaseEth from "./Components/Purchase/PurchaseEth";
import store from './store';
import jwt_decode from 'jwt-decode'
import { Provider } from 'react-redux';
import { setCurrentUser } from "./redux/actions/auth";
import PublicRoute from "./uitls/PublicRoute";
import PrivateRoute from "./uitls/PrivateRoute";
import AOS from "aos";
import "aos/dist/aos.css";

if (localStorage.jwtToken) {
  // Set auth token header auth
  // Decode token and get user info 
  const decoded = jwt_decode(localStorage.jwtToken)
  console.log("decoded", decoded)
  store.dispatch(setCurrentUser(decoded))
}


function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          {/* <PublicRoute exact path="/signup" component={Register} />
          <PublicRoute exact path="/login" component={Login} /> */}
          <Route exact path="/" component={Purchase} />
          <Route exact path="/purchase-with-eth" component={PurchaseEth} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
