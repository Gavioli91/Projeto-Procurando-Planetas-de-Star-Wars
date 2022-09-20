import React from 'react';
import './App.css';
import Table from './Pages/Table';
import PlanetProvider from './Context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <Table />
    </PlanetProvider>
  );
}

export default App;
