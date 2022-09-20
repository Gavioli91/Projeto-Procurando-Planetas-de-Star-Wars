import React, { useEffect } from 'react';

function Table () {

useEffect(() => {
  const apiRequest = async () => {
    const { results } = await fetch (endpoint).then((response) => response.json())
  };
  apiRequest()
return (
  <main>
    <div>
      <h1>Planetas</h1>
    </div>
  </main>
)

export default Table;
