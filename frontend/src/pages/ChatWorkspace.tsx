import { useState } from 'react';
import ChatInput from '../components/chat/ChatInput';

interface Suggestion {
	id: string;
	detail: string;
}

const SUGGESTIONS: Suggestion[] = [
	{
		id: 's1',
		detail: 'a follow-up email after a client meeting',
	},
	{
		id: 's2',
		detail: 'how database indexes speed up queries',
	},
	{
		id: 's3',
		detail: 'a two-week onboarding schedule for a new hire',
	},
	{ id: 's4', detail: 'why my React state update runs twice' },
];

function ChatWorkspace() {
	const [suggestions, setSuggestions] = useState<Suggestion[]>(SUGGESTIONS);
	const [message, setMessage] = useState('');
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
		setSuggestions((prev) => [
			...prev,
			{ id: `s${Math.floor(Math.random() * 1000)}`, detail: s.detail },
		]);
		setMessage(`${s.detail}`);
		// textareaRef.current?.focus();
		console.log('apply suggestion', s);
	};

	const handleSendMessage = async (message: string) => {
		applySuggestion({
			id: `s${Math.floor(Math.random() * 1000)}`,
			detail: message,
		});
		console.log('user query', message);
		setMessage('');
	};

	return (
		<div className="w-full max-w-2xl">
			<h1 className="font-serif text-[32px] leading-tight text-[#20241F] sm:text-[38px]">
				{greeting} What are you working on?
			</h1>

			{/* Input */}
			<ChatInput
				handleSendMessage={handleSendMessage}
				message={message}
				setMessage={setMessage}
			/>

			{/* Suggestions */}
			<div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
				{suggestions.map((s) => (
					<button
						key={s.id}
						onClick={() => applySuggestion(s)}
						className="flex items-baseline gap-1.5 rounded-lg border border-[#20241F]/10 px-3.5 py-2.5 text-left text-[13px] hover:border-[#2F6F62]/40 hover:bg-[#2F6F62]/[0.04]">
						<span className="truncate text-[#20241F]/50">{s.detail}</span>
					</button>
				))}
			</div>
		</div>
	);
}

export default ChatWorkspace;
