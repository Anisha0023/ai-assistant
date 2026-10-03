import { useEffect } from 'react';
import {
	MessageSquare,
	PanelLeftClose,
	Plus,
	Search,
	Settings,
} from 'lucide-react';

interface ChatHistoryItem {
	id: string;
	title: string;
	timeLabel: string;
}

const HISTORY: ChatHistoryItem[] = [
	{ id: '1', title: 'Rewriting the onboarding email', timeLabel: 'Today' },
	{ id: '2', title: 'Debugging the auth redirect loop', timeLabel: 'Today' },
	{
		id: '3',
		title: 'Comparing shipping vendors for Q4',
		timeLabel: 'Yesterday',
	},
	{ id: '4', title: 'Outline for the client retro', timeLabel: 'Yesterday' },
	{
		id: '5',
		title: 'Naming ideas for the new feature',
		timeLabel: '7 days ago',
	},
	{ id: '6', title: 'Summarizing the research paper', timeLabel: '7 days ago' },
];

export const DESKTOP_QUERY = '(min-width: 768px)';

function Sidebar({
	sidebarOpen,
	setSidebarOpen,
}: {
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
}) {
	const isMobile = () => !window.matchMedia(DESKTOP_QUERY).matches;

	// Auto close on mobile / auto open on desktop: on mount and whenever the screen crosses the breakpoint
	useEffect(() => {
		const mq = window.matchMedia(DESKTOP_QUERY);
		setSidebarOpen(mq.matches);
		const onChange = (e: MediaQueryListEvent) => setSidebarOpen(e.matches);
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Close with Escape (mobile drawer)
	useEffect(() => {
		if (!sidebarOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isMobile()) setSidebarOpen(false);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [sidebarOpen, setSidebarOpen]);

	const closeOnMobile = () => {
		if (isMobile()) setSidebarOpen(false);
	};

	return (
		<>
			<div
				onClick={() => setSidebarOpen(false)}
				aria-hidden="true"
				className={`fixed inset-0 z-30 bg-[#20241F]/40 transition-opacity duration-200 md:hidden ${
					sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
				}`}
			/>

			<aside
				className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 overflow-hidden border-r border-[#20241F]/10 bg-[#EEECE3] transition-[transform,width] duration-200 ease-out md:static md:z-auto md:translate-x-0 ${
					sidebarOpen
						? 'translate-x-0 md:w-64'
						: '-translate-x-full md:w-0 md:border-r-0'
				}`}>
				<div className="flex h-full w-64 flex-col">
					<div className="flex items-center justify-between px-4 pt-5 pb-3">
						<div className="flex items-center gap-2">
							<div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2F6F62] text-[11px] font-semibold text-[#F6F5F0]">
								S
							</div>
							<span className="text-[13px] font-medium tracking-tight text-[#20241F]/80">
								Sable
							</span>
						</div>
						<button
							onClick={() => setSidebarOpen(false)}
							className="rounded-md p-1.5 text-[#20241F]/50 hover:bg-[#20241F]/5 hover:text-[#20241F]"
							aria-label="Collapse sidebar">
							<PanelLeftClose size={16} />
						</button>
					</div>

					<div className="px-3">
						<button
							onClick={closeOnMobile}
							className="flex w-full items-center gap-2 rounded-lg border border-[#20241F]/12 bg-[#F6F5F0] px-3 py-2 text-sm text-[#20241F]/80 transition-colors hover:border-[#2F6F62]/40 hover:text-[#20241F]">
							<Plus size={15} />
							New chat
						</button>
					</div>

					<div className="mt-4 px-3">
						<div className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[#20241F]/45">
							<Search size={14} />
							<input
								type="text"
								placeholder="Search chats"
								className="w-full bg-transparent text-[13px] placeholder:text-[#20241F]/40 focus:outline-none"
							/>
						</div>
					</div>

					<nav className="mt-3 flex-1 overflow-y-auto px-3 pb-3">
						{Object.entries(
							HISTORY.reduce<Record<string, ChatHistoryItem[]>>((acc, item) => {
								acc[item.timeLabel] = acc[item.timeLabel] || [];
								acc[item.timeLabel].push(item);
								return acc;
							}, {}),
						).map(([group, items]) => (
							<div
								key={group}
								className="mb-4">
								<p className="px-2 pb-1 text-[11px] text-[#20241F]/40">
									{group}
								</p>
								<ul>
									{items.map((item) => (
										<li key={item.id}>
											<button
												onClick={closeOnMobile}
												className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] text-[#20241F]/70 hover:bg-[#20241F]/5 hover:text-[#20241F]">
												<MessageSquare
													size={13}
													className="shrink-0 text-[#20241F]/30 group-hover:text-[#2F6F62]"
												/>
												<span className="truncate">{item.title}</span>
											</button>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>

					<div className="border-t border-[#20241F]/10 px-3 py-3">
						<button className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left hover:bg-[#20241F]/5">
							<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C89B3C]/25 text-[11px] font-medium text-[#8A6A22]">
								RN
							</div>
							<div className="min-w-0">
								<p className="truncate text-[13px] font-medium text-[#20241F]/85">
									Riya N.
								</p>
								<p className="truncate text-[11px] text-[#20241F]/45">
									Free plan
								</p>
							</div>
							<Settings
								size={14}
								className="ml-auto shrink-0 text-[#20241F]/35"
							/>
						</button>
					</div>
				</div>
			</aside>
		</>
	);
}

export default Sidebar;
