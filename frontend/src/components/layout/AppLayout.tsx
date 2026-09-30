import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState } from 'react';
import ChatHeader from '../chat/ChatHeader';

function AppLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const toggleSidebar = () => setSidebarOpen((prev) => !prev);
	return (
		<div className="flex h-screen w-screen overflow-hidden">
			<Sidebar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
			/>

			<div className="flex flex-1 flex-col overflow-hidden transition-all duration-300 bg-[#F6F5F0]">
				<ChatHeader
					isSidebarOpen={sidebarOpen}
					toggleSidebar={toggleSidebar}
				/>

				<main className="flex-1 overflow-y-auto p-6">{<Outlet />}</main>
			</div>
		</div>
	);
}

export default AppLayout;
