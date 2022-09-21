import React, { useState, useEffect, useContext } from 'react';
import PlanetContext from '../Context/PlanetContext';

const Table = () => {
  const [planetName, setPlanetName] = useState('');
  const { planet } = useContext(PlanetContext);
  const [filterPlanet, setFilterPlanet] = useState([]);
  const [markPlanet, setMarkPlanet] = useState('population');
  const [equalPlanets, setEqualPlanets] = useState('maior que');
  const [theAmount, setTheAmount] = useState(0);

  useEffect(() => {
    setFilterPlanet(planet.filter((planetas) => planetas.name.includes(planetName)));
  },
  [planetName, planet]);

  const filterAmount = () => {
    if (equalPlanets === 'maior que') {
      const star = planet.filter((name) => Number(name[markPlanet]) > Number(theAmount));
      setFilterPlanet(star);
    }

    if (equalPlanets === 'menor que') {
      const star = planet.filter((name) => Number(name[markPlanet]) < Number(theAmount));
      setFilterPlanet(star);
    }

    if (equalPlanets === 'igual a') {
      const str = planet.filter((name) => Number(name[markPlanet]) === Number(theAmount));
      setFilterPlanet(str);
    }
  };

  const returnPlanet = filterPlanet.map((planetas, i) => (
    <tbody key={ i }>
      <tr>
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
    </tbody>
  ));
  return (
    <div>
      <select
        name="selected"
        data-testid="column-filter"
        // value={ markPlanet }
        onChange={ (e) => setMarkPlanet(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="igualdate"
        data-testid="comparison-filter"
        // value={ equalPlanets }
        onChange={ (e) => setEqualPlanets(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        max="10000000"
        name="number"
        value={ theAmount }
        onChange={ (e) => setTheAmount(e.target.value) }
      />
      <input
        type="text"
        data-testid="name-filter"
        name="name"
        // value={ planetName }
        onChange={ (e) => setPlanetName(e.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterAmount }
      >
        Filtrar
      </button>
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
