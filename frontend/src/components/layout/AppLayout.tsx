import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function AppLayout() {
	return (
		<div className="flex w-full h-screen">
			<Sidebar />
			<main className="flex-1 overflow-y-auto bg-[#F6F5F0]">
				<Outlet />
			</main>
		</div>
	);
}

export default AppLayout;
