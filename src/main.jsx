import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './index.scss';
import * as bootstrap from 'bootstrap';
import AppRouter from './routes/AppRouter.jsx';

createRoot(document.getElementById('root')).render(
	<HashRouter>
		<AppRouter />
	</HashRouter>,
);
