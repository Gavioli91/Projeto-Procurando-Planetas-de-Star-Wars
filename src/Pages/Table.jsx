import React, { useState, useEffect, useContext } from 'react';
import PlanetContext from '../Context/PlanetContext';

const Table = () => {
  const [planetName, setPlanetName] = useState('');
  const { planet } = useContext(PlanetContext);
  const [filterPlanet, setFilterPlanet] = useState([]);
  const [markPlanet, setMarkPlanet] = useState('population');
  const [equalPlanets, setEqualPlanets] = useState('maior que');
  const [theAmount, setTheAmount] = useState(0);
  const [selection, setSelection] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [forms, setForms] = useState({ filterPlanet: [] });

  useEffect(() => {
    setFilterPlanet(planet.filter((planetas) => planetas.name.includes(planetName)));
  },
  [planetName, planet]);

  const filterAmount = () => {
    const parameters = { equalPlanets, markPlanet, theAmount };
    if (equalPlanets === 'maior que') {
      const star = planet.filter((name) => Number(name[markPlanet]) > Number(theAmount));
      setFilterPlanet(star);
      setForms((state) => ({
        ...state, filterPlanet: [...state.filterPlanet, parameters] }));
      const str = planet.filter((name) => Number(name[markPlanet]) > Number(theAmount));
      setFilterPlanet(str);
    }
    if (equalPlanets === 'menor que') {
      const str = planet.filter((name) => Number(name[markPlanet]) < Number(theAmount));
      setFilterPlanet(str);
      setForms((state) => ({
        ...state, filterPlanet: [...state.filterPlanet, parameters] }));
    }
    if (equalPlanets === 'igual a') {
      const str = planet.filter((name) => Number(name[markPlanet]) === Number(theAmount));
      setFilterPlanet(str);
      setForms((state) => ({
        ...state, filterPlanet: [...state.filterPlanet, parameters] }));
    }
    setListFilter((state) => ({
      ...state,
      filterede: [...state.filterede, valor] }));
  };
  switch (markPlanet) {
  case 'population':
    setSelection(() => (['orbital_period',
      'diameter', 'rotation_period', 'surface_water']));
    break;
  case 'orbital_period':
    setSelection(() => ([
      'diameter', 'rotation_period', 'surface_water']));
    break;
  case 'diameter':
    setSelection(() => ([
      'rotation_period', 'surface_water']));
    break;
  case 'rotation_period':
    setSelection(() => (['surface_water']));
    break;
  case 'surface_water':
    setSelection(() => ([]));
    break;
  default:
    break;
  }

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
  const answer = [forms];
  let answerForms = [];
  if (answer[0].filterPlanet.length > 0) {
    answerForms = answer[0].filterPlanet.map((planets, i) => (
      <div key={ i } data-testid="filter">
        <p>{planets.i}</p>
        <button
          type="button"
        >
          X
        </button>
      </div>
    ));
  }
  return (
    <div>
      <select
        name="selected"
        data-testid="column-filter"
        value={ markPlanet }
        onChange={ (e) => setMarkPlanet(e.target.value) }
      >
        {selection.map((planets, i) => (
          <option key={ i }>
            {planets}
          </option>
        ))}
      </select>
      <select
        name="igualdate"
        data-testid="comparison-filter"
        // value={ equalPlanets }
        onChange={ (e) => setEqualPlanets(e.target.value) }
      >
        {selection.map((planetas, i) => (
          <option key={ i }>{ planetas }</option>
        ))}
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
      {answerForms}
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
