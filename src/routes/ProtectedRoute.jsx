import React from 'react';
import { useName } from '../hooks/useName';
import { Navigate, Outlet } from 'react-router';

function ProtectedRoute({ children }) {
	const { name } = useName();

	if (!name) {
		return <Navigate to="/" />;
	}

	return children ? children : <Outlet />;
}

export default ProtectedRoute;
