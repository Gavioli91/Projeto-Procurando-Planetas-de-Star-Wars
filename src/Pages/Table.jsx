import React, { useState, useContext, useEffect } from 'react';
import PlanetContext from '../Context/PlanetContext';

const Table = () => {
  const [names, setPlanetName] = useState('');
  const { planet, setPlanet } = useContext(PlanetContext);
  const [selected, setSelected] = useState({
    column: 'population',
    condition: 'maior que',
    value: '0',
  });
  const columnList = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [selectedFilter, setSelectedFilter] = useState([]);
  useEffect(() => {
    selectedFilter.forEach((filter) => {
      if (filter.condition === 'maior que') {
        const star = planet
          .filter((item) => Number(item[filter.column]) > Number(filter.value));
        setPlanet(star);
      }
      if (filter.condition === 'menor que') {
        const star = planet
          .filter((item) => Number(item[filter.column]) < Number(filter.value));
        setPlanet(star);
      }
      if (filter.condition === 'igual a') {
        const star = planet.filter((item) => item[filter.column] === filter.value);
        setPlanet(star);
      }
    });
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [selectedFilter]);

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
  const planetas = (opcao) => !selectedFilter.find((filtro) => opcao === filtro.column);
  return (
    <div>
      <select
        name="markPlanet"
        data-testid="column-filter"
        value={ selected.column }
        onChange={ (e) => setSelected({ ...selected, column: e.target.value }) }
      >
        {columnList
          .filter(planetas).map((column) => (
            <option value={ column } key={ column }>
              {column}
            </option>))}
      </select>
      <select
        name="equalPlanets"
        data-testid="comparison-filter"
        value={ selected.condition }
        onChange={ (e) => setSelected({ ...selected, condition: e.target.value }) }
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
        value={ selected.value }
        onChange={ (e) => setSelected({ ...selected, value: e.target.value }) }
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
        onClick={ () => {
          setSelectedFilter([...selectedFilter, selected]);
          setSelected({ ...selected, column: columnList[0] });
        } }
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
