import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import './PokemonCard.scss';

function PokemonCard({ url }) {
	const [pokemon, setPokemon] = useState(null);
	const [typeColors, setTypeColors] = useState([]);

	useEffect(() => {
		axios.get(url).then(({ data }) => {
			setPokemon(data);
			const colors = data.types.map((type) => getTypeColor(type.type.name));
			setTypeColors(colors);
		});
	}, [url]);

	const getTypeColor = (type) => {
		switch (type) {
			case 'grass':
				return '#78C850';
			case 'fire':
				return '#F08030';
			case 'water':
				return '#6890F0';
			case 'bug':
				return '#A8B820';
			case 'normal':
				return '#A8A878';
			case 'poison':
				return '#A040A0';
			case 'electric':
				return '#babd14';
			case 'ground':
				return '#E0C068';
			case 'fairy':
				return '#EE99AC';
			case 'fighting':
				return '#C03028';
			case 'psychic':
				return '#F85888';
			case 'rock':
				return '#B8A038';
			case 'ghost':
				return '#705898';
			case 'ice':
				return '#98D8D8';
			case 'dragon':
				return '#7038F8';
			case 'dark':
				return '#705848';
			case 'steel':
				return '#B8B8D0';
			case 'flying':
				return '#A890F0';
			default:
				return '#A8A878';
		}
	};

	const adjustColor = (color, amount) => {
		let usePound = false;

		if (color[0] === '#') {
			color = color.slice(1);
			usePound = true;
		}

		const num = parseInt(color, 16);
		let r = (num >> 16) + amount;
		if (r > 255) r = 255;
		else if (r < 0) r = 0;

		let g = ((num >> 8) & 0x00ff) + amount;
		if (g > 255) g = 255;
		else if (g < 0) g = 0;

		let b = (num & 0x0000ff) + amount;
		if (b > 255) b = 255;
		else if (b < 0) b = 0;

		return (
			(usePound ? '#' : '') +
			r.toString(16).padStart(2, '0') +
			g.toString(16).padStart(2, '0') +
			b.toString(16).padStart(2, '0')
		);
	};

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	if (!pokemon) return <p>cargando...</p>;

	const statsToShow = ['hp', 'attack', 'defense', 'speed'];
	const firstTypeColor = typeColors[0];
	const darkenedColor = adjustColor(firstTypeColor, -50);
	const lightenedColor = adjustColor(firstTypeColor, 50);

	return (
		<Link to={`/pokedex/${pokemon.name}`}>
			<div
				className="pokemon-card"
				style={{
					background: `linear-gradient(45deg, ${lightenedColor}, ${firstTypeColor}, ${darkenedColor})`,
				}}
			>
				{pokemon.sprites &&
					pokemon.sprites.other &&
					pokemon.sprites.other['official-artwork'] && (
						<img
							className="pokemon-image"
							src={pokemon.sprites.other['official-artwork'].front_default}
							alt={pokemon.name}
						/>
					)}
				<div className="pokemon-stats">
					<h2 style={{ color: firstTypeColor }}>{capitalize(pokemon?.name)}</h2>
					<p className="pokemon-types" style={{ color: firstTypeColor }}>
						{pokemon.types.map((type) => type.type.name).join(' / ')}
					</p>
					<div className="stats-grid">
						{pokemon.stats &&
							pokemon.stats
								.filter((stat) => statsToShow.includes(stat.stat.name))
								.map((stat, index) => (
									<div key={index} className="stat-item">
										<span
											className="stat-name"
											style={{ color: firstTypeColor }}
										>
											{stat.stat.name.toUpperCase()}
										</span>
										<span className="stat-value">{stat.base_stat}</span>
									</div>
								))}
					</div>
				</div>
			</div>
		</Link>
	);
}

export default PokemonCard;
