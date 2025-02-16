import React, { useEffect, useState } from 'react';
import { useName } from '../../hooks/useName';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import Pagination from './components/Pagination';
import PokemonCard from './components/PokemonCard';
import { Link } from 'react-router';
import './Pokedex.scss';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2/';

function Pokedex() {
	const [pokemons, setPokemons] = useState([]);
	const [filteredPokemons, setFilteredPokemons] = useState([]);
	const [search, setSearch] = useState('');
	const [types, setTypes] = useState([]);
	const [selectedType, setSelectedType] = useState('all');
	const [singlePokemon, setSinglePokemon] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pokemonsPerPage] = useState(20);
	const [totalPokemons, setTotalPokemons] = useState(0);

	const { name, clearName } = useName();

	// Carga pokemons basado en la página actual
	const getPokemons = (page = 1, type = 'all') => {
		const offset = (page - 1) * pokemonsPerPage;
		let url = `${POKEAPI_BASE}/pokemon?limit=${pokemonsPerPage}&offset=${offset}`;

		if (type !== 'all') {
			axios.get(`${POKEAPI_BASE}/type/${type}`).then(({ data }) => {
				const allTypePokemons = data.pokemon.map((p) => p.pokemon);
				setTotalPokemons(allTypePokemons.length);
				const typePokemons = allTypePokemons.slice(
					offset,
					offset + pokemonsPerPage,
				);
				setPokemons(typePokemons);
				setFilteredPokemons(typePokemons);
				setSinglePokemon(null);
			});
			return;
		}

		axios.get(url).then(({ data }) => {
			setPokemons(data.results);
			setFilteredPokemons(data.results);
			setSinglePokemon(null);
			setTotalPokemons(1118);
		});
	};

	useEffect(() => {
		getPokemons(currentPage, selectedType);
	}, [currentPage, selectedType]);

	// Tipos de pokemons
	useEffect(() => {
		axios
			.get(`${POKEAPI_BASE}/type?limit=18`)
			.then(({ data }) => setTypes(data.results));
	}, []);

	// Filtrado de pokemons
	useEffect(() => {
		if (!search) {
			setFilteredPokemons(pokemons);
			setSinglePokemon(null);
			return;
		}
		setFilteredPokemons(
			pokemons.filter((p) =>
				p.name.toLowerCase().includes(search.toLowerCase()),
			),
		);
	}, [search, pokemons]);

	// Buscar pokemon por nombre o id
	const searchPokemon = () => {
		if (!search) {
			getPokemons(currentPage, selectedType);
			return;
		}
		setCurrentPage(1);
		axios
			.get(`${POKEAPI_BASE}/pokemon/${search.toLowerCase()}`)
			.then(({ data }) => {
				if (selectedType !== 'all') {
					const isOfType = data.types.some((t) => t.type.name === selectedType);
					if (!isOfType) {
						alert('El Pokémon no es del tipo seleccionado');
						return;
					}
				}
				setSinglePokemon(data);
			})
			.catch(() => {
				alert('Pokémon no encontrado');
			});
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
		scrollToTop();
	};

	const handleTypeChange = (type) => {
		setSelectedType(type);
		setCurrentPage(1);
	};

	return (
		<div className="pokedex-container">
			<div className="top-container">
				<button className="exit-button" onClick={clearName}>
					Exit
				</button>
				{name && (
					<div className="welcome-container">
						<p>Welcome {name}!, here you can find your favorite Pokémon</p>
					</div>
				)}
			</div>

			<div className="search-controls-container">
				<div className="search-controls">
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Filter or search by name or id"
						onKeyDown={(e) => e.key === 'Enter' && searchPokemon()}
					/>
					<button className="search-button" onClick={searchPokemon}>
						Search
					</button>
					<select
						value={selectedType}
						onChange={(e) => handleTypeChange(e.target.value)}
					>
						<option value="all">all</option>
						{types.map((type) => (
							<option key={type.name} value={type.name}>
								{type.name}
							</option>
						))}
					</select>
				</div>
			</div>

			{singlePokemon ? (
				<div className="pokemon-list-container">
					<PokemonCard
						key={singlePokemon.name}
						url={`${POKEAPI_BASE}/pokemon/${singlePokemon.name}`}
					/>
				</div>
			) : (
				<div className="pokemon-list-container">
					<PokemonList pokemons={filteredPokemons} />
					<Pagination
						currentPage={currentPage}
						totalPages={Math.ceil(totalPokemons / pokemonsPerPage)}
						onPageChange={paginate}
					/>
				</div>
			)}
		</div>
	);
}

export default Pokedex;
