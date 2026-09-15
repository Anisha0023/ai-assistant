import { Paperclip, ArrowUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

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

function ChatPage() {
	const [message, setMessage] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

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
		setMessage(`${s.label} ${s.detail}`);
		textareaRef.current?.focus();
	};

	useEffect(() => {
		const el = textareaRef.current;
		if (!el) return;
		el.style.height = 'auto';
		el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
	}, [message]);

	const handleSendMessage = async () => {
		console.log('user query', message);
		setMessage('');
	};
	return (
		<div className="w-full max-w-2xl">
			<h1 className="font-serif text-[32px] leading-tight text-[#20241F] sm:text-[38px]">
				{greeting} What are you working on?
			</h1>

			{/* Input */}
			<div className="mt-7 rounded-2xl border border-[#20241F]/12 bg-[#FCFBF8] p-3 shadow-[0_1px_0_rgba(32,36,31,0.04)] focus-within:border-[#2F6F62]/50">
				<textarea
					ref={textareaRef}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Message Sable..."
					rows={1}
					className="max-h-[200px] w-full resize-none bg-transparent text-[15px] leading-relaxed text-[#20241F] placeholder:text-[#20241F]/40 focus:outline-none"
				/>
				<div className="mt-2 flex items-center justify-between">
					<button
						className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[#20241F]/45 hover:bg-[#20241F]/5 hover:text-[#20241F]/70"
						aria-label="Attach file">
						<Paperclip size={16} />
					</button>
					<button
						onClick={() => {
							handleSendMessage();
						}}
						disabled={message.trim().length === 0}
						className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F6F62] text-[#F6F5F0] transition-opacity disabled:opacity-30"
						aria-label="Send message">
						<ArrowUp size={16} />
					</button>
				</div>
			</div>

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

export default ChatPage;
