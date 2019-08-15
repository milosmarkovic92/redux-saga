import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './js/store/store';
import List from './components/List';
import Form from './components/Form';
import Posts from './components/Posts';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <List />
        <Form />
        <Posts />
      </div>
    </Provider>
  );
}

export default App;
