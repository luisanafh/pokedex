import React from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.scss';

function PokemonList({ pokemons }) {
	return (
		<div className="pokemon-list">
			{pokemons.map((pokemon) => (
				<PokemonCard key={pokemon.name} url={pokemon.url} />
			))}
		</div>
	);
}

export default PokemonList;
