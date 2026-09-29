import { PanelLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const MODELS = [
	'Sable — balanced',
	'Sable Mini — fast',
	'Sable Pro — deep reasoning',
];

function ChatHeader() {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [modelOpen, setModelOpen] = useState(false);
	const [model, setModel] = useState(MODELS[0]);
	return (
		<header className="flex items-center justify-between px-5 py-4">
			<div className="flex items-center gap-3">
				{!sidebarOpen && (
					<button
						onClick={() => setSidebarOpen(true)}
						className="rounded-md p-1.5 text-[#20241F]/50 hover:bg-[#20241F]/5 hover:text-[#20241F]"
						aria-label="Expand sidebar">
						<PanelLeft size={16} />
					</button>
				)}
				<div className="relative">
					<button
						onClick={() => setModelOpen((v) => !v)}
						className="flex items-center gap-1.5 rounded-full border border-[#20241F]/12 px-3 py-1.5 text-[13px] text-[#20241F]/75 hover:border-[#20241F]/25">
						{model}
						<ChevronDown
							size={13}
							className={`transition-transform ${modelOpen ? 'rotate-180' : ''}`}
						/>
					</button>
					{modelOpen && (
						<div className="absolute left-0 top-full z-10 mt-1.5 w-56 overflow-hidden rounded-lg border border-[#20241F]/10 bg-[#FCFBF8] py-1 shadow-[0_8px_24px_rgba(32,36,31,0.08)]">
							{MODELS.map((m) => (
								<button
									key={m}
									onClick={() => {
										setModel(m);
										setModelOpen(false);
									}}
									className={`block w-full px-3 py-2 text-left text-[13px] hover:bg-[#20241F]/5 ${
										m === model ? 'text-[#2F6F62]' : 'text-[#20241F]/75'
									}`}>
									{m}
								</button>
							))}
						</div>
					)}
				</div>
			</div>
			<button className="rounded-full bg-[#20241F] px-3.5 py-1.5 text-[13px] font-medium text-[#F6F5F0] hover:bg-[#20241F]/90">
				Upgrade
			</button>
		</header>
	);
}

export default ChatHeader;
