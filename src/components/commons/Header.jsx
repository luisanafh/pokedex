import React from 'react';
import './Header.scss';
import { img } from '../../images/index';
import { useLocation } from 'react-router';

const Header = () => {
	const location = useLocation();

	if (location.pathname === '/') {
		return null;
	}
	return (
		<header className="header">
			<div className="header-content">
				<img src={img} alt="pokedex" className="header-image" />
			</div>
		</header>
	);
};

export default Header;
