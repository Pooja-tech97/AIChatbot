import React from "react";
import { Provider } from 'react-redux';
import logo from './logo.svg';
import Chatbot from './components/Chatbot';
import { store } from "./app/store";

function App() {
  return (
  <Provider store={store}>
    <div>
      <Chatbot/>
    </div>
  </Provider>
  );
}

export default App;
