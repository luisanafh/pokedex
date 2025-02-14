import React, { useRef, useState, useEffect } from 'react';
import './PokedexComp.scss';
import { useNavigate } from 'react-router';
import { useName } from '../../../hooks/useName';
import { start } from '../../../assets/audio';

export const PokedexComp = () => {
	const inputRef = useRef();
	const audioRef = useRef();
	const { setName } = useName();
	const navigate = useNavigate();
	const [isOn, setIsOn] = useState(false);
	const [input, setInput] = useState('');
	const [displayText, setDisplayText] = useState('');
	const [displayPText, setDisplayPText] = useState('');
	const [index, setIndex] = useState(0);
	const textToDisplay = 'Hi Pokémon Trainer';
	const pTextToDisplay = 'to start, write your name';

	const handleSetName = () => {
		if (!input) return;
		setName(input);
		navigate('/pokedex');
	};

	const handleOnClick = () => {
		setIsOn(!isOn);
		if (!isOn) {
			setInput('');
			setIndex(0);
			setDisplayText('');
			setDisplayPText('');
			audioRef.current.play();
		}
	};

	useEffect(() => {
		if (isOn) {
			if (index < textToDisplay.length) {
				const timeoutId = setTimeout(() => {
					setDisplayText((prev) => prev + textToDisplay[index]);
					setIndex(index + 1);
				}, 100);
				return () => clearTimeout(timeoutId);
			} else if (
				index >= textToDisplay.length &&
				index < textToDisplay.length + pTextToDisplay.length
			) {
				const timeoutId = setTimeout(() => {
					setDisplayPText(
						(prev) => prev + pTextToDisplay[index - textToDisplay.length],
					);
					setIndex(index + 1);
				}, 100);
				return () => clearTimeout(timeoutId);
			}
		}
	}, [isOn, index, textToDisplay, pTextToDisplay]);

	return (
		<div className="content">
			<div className="pokedex-container">
				<div className="pokedex">
					<div
						id="div_light"
						className={`pokedex-light ${isOn ? 'light-on' : ''}`}
					></div>
					<div
						id="div_screen"
						className={`pokedex-screen ${isOn ? 'screen-on' : ''}`}
					>
						<h4 className="text">{isOn && displayText}</h4>
						<p className="pokedex-text">{isOn && displayPText}</p>
					</div>
					<div id="div_loader" className="loader"></div>
					<button
						id="btn_on"
						className="pokedex-button-on"
						onClick={handleOnClick}
					>
						{isOn ? 'OFF' : 'ON'}
					</button>
					<input
						className={`pokedex-input ${isOn ? 'is-enabled' : 'is-disabled'}`}
						type="text"
						placeholder="Name"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleSetName()}
					/>
					<button
						onClick={handleSetName}
						className={`pokedex-button-start ${
							isOn ? 'is-enabled' : 'is-disabled'
						}`}
					>
						start
					</button>
					<audio ref={audioRef} src={start}></audio>
				</div>
			</div>
		</div>
	);
};
