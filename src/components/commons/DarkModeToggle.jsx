import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './DarkModeToggle.scss';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
	return (
		<button className="dark-mode-toggle" onClick={toggleDarkMode}>
			<FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
		</button>
	);
};

export default DarkModeToggle;
