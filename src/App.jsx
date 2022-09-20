import React, { Provider } from 'react';
import './App.css';
// import Table from './tests';

function App() {
  const endpoint = 'https://swapi.dev/api/planets';
  console.log(endpoint);

  return (
    <Provider>
      <span>Hello, world</span>
    </Provider>
  );
}

export default App;
