import ChatInput from '../components/chat/ChatInput';

interface Suggestion {
	id: string;
	label: string;
	detail: string;
}

const SUGGESTIONS: Suggestion[] = [
	{
		id: 's1',
		label: 'Draft',
		detail: 'a follow-up email after a client meeting',
	},
	{
		id: 's2',
		label: 'Explain',
		detail: 'how database indexes speed up queries',
	},
	{
		id: 's3',
		label: 'Plan',
		detail: 'a two-week onboarding schedule for a new hire',
	},
	{ id: 's4', label: 'Debug', detail: 'why my React state update runs twice' },
];

function ChatWorkspace() {
	const greetingHour = new Date().getHours();
	const greeting =
		greetingHour < 5
			? 'Still up.'
			: greetingHour < 12
				? 'Good morning.'
				: greetingHour < 18
					? 'Good afternoon.'
					: 'Good evening.';

	const applySuggestion = (s: Suggestion) => {
		// setMessage(`${s.label} ${s.detail}`);
		// textareaRef.current?.focus();
		console.log('apply suggestion', s);
	};

	const handleSendMessage = async (message: string) => {
		console.log('user query', message);
	};
	return (
		<div className="w-full max-w-2xl">
			<h1 className="font-serif text-[32px] leading-tight text-[#20241F] sm:text-[38px]">
				{greeting} What are you working on?
			</h1>

			{/* Input */}
			<ChatInput handleSendMessage={handleSendMessage} />

			{/* Suggestions */}
			<div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
				{SUGGESTIONS.map((s) => (
					<button
						key={s.id}
						onClick={() => applySuggestion(s)}
						className="flex items-baseline gap-1.5 rounded-lg border border-[#20241F]/10 px-3.5 py-2.5 text-left text-[13px] hover:border-[#2F6F62]/40 hover:bg-[#2F6F62]/[0.04]">
						<span className="font-medium text-[#20241F]/85">{s.label}</span>
						<span className="truncate text-[#20241F]/50">{s.detail}</span>
					</button>
				))}
			</div>
		</div>
	);
}

export default ChatWorkspace;
