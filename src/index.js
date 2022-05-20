import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from "react-redux";
import getStore from "./store/getStore";
import reducers from './reducers';
import Main from './Main';
import "./sass/app.scss";
import 'antd/dist/antd.css'; 

ReactDOM.render(
  
    <ReduxProvider store={getStore(reducers)}>
	    <BrowserRouter>
	      <Main />
	    </BrowserRouter>
    </ReduxProvider>,
  document.getElementById("root")
);
