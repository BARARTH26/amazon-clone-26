import React ,{useEffect}from 'react';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Checkout from './components/Checkout';
import Login from "./components/Login";
import{auth} from "./firebase/firebase"
import { useStateValue } from './components/StateProvider';
import Payment from "./components/Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51IvNKUSDsfN2qiOVLsiB4QM9Ro8mf3giIOwecnqM1HeK9XghjZQHA6YLeeqNaHSdHVSOiuHstIyFE1HoMuUydTzc00VLmaEAtF");

function App() {

  const [{},dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app components loads
    auth.onAuthStateChanged(authUser =>{
      //console.log("the user is ===>",authUser);

      if(authUser)
      {
        //then user just logged in / the user was logged in
        dispatch({
          type:"SET_USER",
          user: authUser,
        })
      }
      else
      {

        //user logged out
        dispatch({
          type:"SET_USER",
          user : null,
        })
      }
    })
  }, [])
  return (

    <Router>
    <div className="app">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route path="/payment">
          <Header/>
          <Elements stripe={promise}>
            <Payment/>
          </Elements>
        </Route>
        <Route path="/">
          <Header />
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
