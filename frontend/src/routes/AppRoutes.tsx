import { BrowserRouter, Route, Routes } from 'react-router';
import AppLayout from '../components/layout/AppLayout';
import HomePage from '../pages/HomePage';

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					<Route
						index
						path="/"
						element={<HomePage />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
