import React, { useState, useEffect, useContext } from 'react';
import PlanetContext from '../Context/PlanetContext';

const Table = () => {
  const [planetName, setPlanetName] = useState('');
  const { planet } = useContext(PlanetContext);
  const [filterPlanet, setFilterPlanet] = useState([]);
  useEffect(() => {
    setFilterPlanet(planet.filter((planetas) => planetas.name.includes(planetName)));
  },
  [planetName, planet]);
  const returnPlanet = filterPlanet.map((planetas, i) => (
    <tr key={ i }>
      <td>
        {planetas.name}
      </td>
      <td>
        {planetas.rotation_period}
      </td>
      <td>
        {planetas.orbital_period}
      </td>
      <td>
        {planetas.diameter}
      </td>
      <td>
        {planetas.climate}
      </td>
      <td>
        {planetas.gravity}
      </td>
      <td>
        {planetas.terrain}
      </td>
      <td>
        {planetas.surface_water}
      </td>
      <td>
        {planetas.population}
      </td>
      <td>
        {planetas.films}
      </td>
      <td>
        {planetas.created}
      </td>
      <td>
        {planetas.edited}
      </td>
      <td>
        {planetas.url}
      </td>
    </tr>
  ));
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        name="name"
        onChange={ (e) => setPlanetName(e.target.value) }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        {returnPlanet}
      </table>
    </div>
  );
};

export default Table;
