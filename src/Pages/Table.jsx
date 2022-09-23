import React, { useState, useContext } from 'react';
import PlanetContext from '../Context/PlanetContext';

const Table = () => {
  const [names, setPlanetName] = useState('');
  const { planet, setPlanet } = useContext(PlanetContext);
  // const [filterPlanet, setFilterPlanet] = useState([]);
  const [markPlanet, setMarkPlanet] = useState('population');
  const [equalPlanets, setEqualPlanets] = useState('maior que');
  const [theAmount, setTheAmount] = useState(0);

  // useEffect(() => {
  //  setPlanet(planet.filter((item) => item.name.includes(planetName)));
  // },
  // [planetName, planet]);

  const filterAmount = () => {
    if (equalPlanets === 'maior que') {
      const star = planet.filter((item) => Number(item[markPlanet]) > Number(theAmount));
      setPlanet(star);
    }

    if (equalPlanets === 'menor que') {
      const star = planet.filter((item) => Number(item[markPlanet]) < Number(theAmount));
      setPlanet(star);
    }

    if (equalPlanets === 'igual a') {
      const str = planet.filter((item) => Number(item[markPlanet]) === Number(theAmount));
      setPlanet(str);
    }
  };

  const answer = planet.filter((item) => item.name.includes(names)).map((item, i) => (
    <tbody key={ i }>
      <tr>
        <td>
          {item.name}
        </td>
        <td>
          {item.rotation_period}
        </td>
        <td>
          {item.orbital_period}
        </td>
        <td>
          {item.diameter}
        </td>
        <td>
          {item.climate}
        </td>
        <td>
          {item.gravity}
        </td>
        <td>
          {item.terrain}
        </td>
        <td>
          {item.surface_water}
        </td>
        <td>
          {item.population}
        </td>
        <td>
          {item.films}
        </td>
        <td>
          {item.created}
        </td>
        <td>
          {item.edited}
        </td>
        <td>
          {item.url}
        </td>
      </tr>
    </tbody>
  ));
  return (
    <div>
      <select
        name="markPlanet"
        data-testid="column-filter"
        value={ markPlanet }
        onChange={ (e) => setMarkPlanet(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="equalPlanets"
        data-testid="comparison-filter"
        value={ equalPlanets }
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
        value={ names }
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
        {answer}
      </table>
    </div>
  );
};

export default Table;
