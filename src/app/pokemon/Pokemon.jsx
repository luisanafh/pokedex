import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './Pokemon.scss';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2/';

const statColors = {
	hp: 'bg-danger',
	attack: 'bg-success',
	defense: 'bg-warning',
	'special-attack': 'bg-info',
	'special-defense': 'bg-primary',
	speed: 'bg-secondary',
};

function Pokemon() {
	const params = useParams();
	const navigate = useNavigate();
	const [pokemon, setPokemon] = useState({});

	useEffect(() => {
		if (params.name) {
			axios
				.get(`${POKEAPI_BASE}/pokemon/${params.name}`)
				.then(({ data }) => setPokemon(data))
				.catch((error) => console.error(error));
		}
	}, [params]);

	const renderTypes = () =>
		pokemon?.types?.map((t) => (
			<span key={t.type.name} className={`type-badge type-${t.type.name}`}>
				{t.type.name}
			</span>
		));

	const renderAbilities = () =>
		pokemon?.abilities?.map((a) => (
			<div key={a.ability.name} className="ability-badge">
				{a.ability.name}
			</div>
		));

	const stats = pokemon?.stats || [];
	const [hp, attack, defense, specialAttack, specialDefense, speed] = stats;

	const renderStat = (stat, value) => (
		<div>
			<p>
				{stat}: <span>{value}</span>
			</p>
			<div className="progress">
				<div
					className={`progress-bar progress-bar-striped progress-bar-animated ${statColors[stat]}`}
					role="progressbar"
					aria-valuenow={value}
					aria-valuemin="0"
					aria-valuemax="100"
					style={{ width: `${value}%` }}
				></div>
			</div>
		</div>
	);

	const renderMoves = () =>
		pokemon?.moves?.map((m) => (
			<div key={m.move.name} className="move-badge">
				{m.move.name}
			</div>
		));

	return (
		<div className="pokemon-container">
			<button className="back-button" onClick={() => navigate(-1)}>
				← Back
			</button>
			{pokemon?.sprites?.other?.['official-artwork']?.front_default && (
				<img
					src={pokemon?.sprites?.other['official-artwork']?.front_default}
					alt={pokemon?.name}
					className="pokemon-img"
				/>
			)}
			{pokemon?.id && (
				<span className="pokemon-id">
					#{pokemon?.id?.toString().padStart(3, '0')}
				</span>
			)}
			<h2 className="pokemon-name">
				{pokemon?.name
					? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
					: ''}
			</h2>
			<div className="pokemon-details">
				<div className="detail-block">
					<h3 className="subtitle">Types</h3>
					<div className="types-container">{renderTypes()}</div>
				</div>
				<div className="detail-block">
					<h3 className="subtitle">Abilities</h3>
					<div className="abilities-container">{renderAbilities()}</div>
				</div>
			</div>
			<div className="pokemon-stats detail-block">
				<h3 className="subtitle">Stats</h3>
				{renderStat(hp?.stat.name, hp?.base_stat)}
				{renderStat(attack?.stat.name, attack?.base_stat)}
				{renderStat(defense?.stat.name, defense?.base_stat)}
				{renderStat(specialAttack?.stat.name, specialAttack?.base_stat)}
				{renderStat(specialDefense?.stat.name, specialDefense?.base_stat)}
				{renderStat(speed?.stat.name, speed?.base_stat)}
			</div>
			<div className="pokemon-moves detail-block" style={{ marginTop: '10px' }}>
				<h3 className="subtitle" style={{ marginTop: '5px' }}>
					Moves
				</h3>
				<div className="moves-container" style={{ padding: '5px' }}>
					{renderMoves()}
				</div>
			</div>
		</div>
	);
}

export default Pokemon;
