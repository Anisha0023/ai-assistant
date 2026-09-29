import ChatWorkspace from './ChatWorkspace';
import ChatHeader from '../components/chat/ChatHeader';

function HomePage() {
	return (
		<div className="flex h-screen w-full bg-[#F6F5F0] text-[#20241F] font-sans antialiased">
			<div className="flex min-w-0 flex-1 flex-col">
				{/* Header */}
				<ChatHeader />

				{/* Center content */}
				<main className="flex flex-1 flex-col items-center justify-center px-6">
					<ChatWorkspace />
				</main>

				<p className="pb-4 text-center text-[11px] text-[#20241F]/35">
					Sable can make mistakes. Check important information.
				</p>
			</div>
		</div>
	);
}

export default HomePage;
