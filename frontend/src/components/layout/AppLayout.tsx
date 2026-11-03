import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatHeader from '../../features/chat/ChatHeader';
import { useSidebar } from '../../hooks/useSidebar';

function AppLayout() {
	const { sidebarOpen, setSidebarOpen } = useSidebar();

	return (
		<div className="flex h-dvh overflow-hidden bg-[#F6F5F0] font-sans text-[#20241F] antialiased">
			<Sidebar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
			/>

			<div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
				<ChatHeader
					isSidebarOpen={sidebarOpen}
					toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
				/>

				<main className="flex min-h-0 flex-1 flex-col overflow-hidden">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default AppLayout;
