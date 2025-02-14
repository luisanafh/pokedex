import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import './Home.scss';
import { PokedexComp } from './components/PokedexComp';
import { img } from '../../images/index';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
	return (
		<div className="home d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
			<img src={img} alt="Pokedex" className="img-fluid custom-img" />
			<PokedexComp />
			<a href="https://es.textstudio.com/" className="styled-link mt-4">
				Font Generator
			</a>
		</div>
	);
}

export default Home;
