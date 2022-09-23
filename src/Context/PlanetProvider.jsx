import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetContext from './PlanetContext';

const PlanetProvider = ({ children }) => {
  const [planet, setPlanet] = useState([]);

  useEffect(() => {
    const getPlanet = async () => {
      const starWarsAPI = 'https://swapi.dev/api/planets';
      const result = await fetch(starWarsAPI);
      const { results } = await result.json();
      const returnPlanet = await results.map((name) => {
        delete name.residents;
        return name;
      });
      setPlanet(returnPlanet);
    };
    getPlanet();
  }, []);
  const returnAnswer = { planet, setPlanet };
  return (
    <PlanetContext.Provider value={ returnAnswer }>{children}</PlanetContext.Provider>
  );
};

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
