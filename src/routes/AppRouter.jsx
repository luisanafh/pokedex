import { Routes, Route } from 'react-router';
import Home from '../app/home/Home';
import Pokedex from '../app/pokedex/Pokedex';
import Pokemon from '../app/pokemon/Pokemon';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import DarkModeToggle from '../components/commons/DarkModeToggle';
import Header from '../components/commons/Header';
import './AppRouter.scss';
import { useState } from 'react';
function AppRouter() {
	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};
	return (
		<div className={darkMode ? 'dark-mode' : ''}>
			<header>
				<Header />
			</header>
			<DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
			<Routes>
				<Route
					path="/"
					element={
						<PublicRoute>
							<Home />
						</PublicRoute>
					}
				/>
				<Route path="/pokedex" element={<ProtectedRoute />}>
					<Route index element={<Pokedex />} />
					<Route path=":name" element={<Pokemon />} />
				</Route>
			</Routes>
		</div>
	);
}

export default AppRouter;
