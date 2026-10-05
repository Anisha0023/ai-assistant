import { useEffect, useRef, useState } from 'react';
import ChatInput from '../components/chat/ChatInput';
import ChatMessage, { type Message } from '../components/chat/ChatMessage';

interface Suggestion {
	label: string;
	detail: string;
}

const SUGGESTIONS: Suggestion[] = [
	{ label: 'Draft', detail: 'a follow-up email after a client meeting' },
	{ label: 'Explain', detail: 'how database indexes speed up queries' },
	{ label: 'Plan', detail: 'a two-week onboarding schedule for a new hire' },
	{ label: 'Debug', detail: 'why my React state update runs twice' },
];

function getGreeting(hour: number) {
	if (hour < 5) return 'Still up.';
	if (hour < 12) return 'Good morning.';
	if (hour < 18) return 'Good afternoon.';
	return 'Good evening.';
}

function ChatWorkspace() {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [isQuerying, setIsQuerying] = useState(false);
	const bottomRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(
		'' as unknown as ReturnType<typeof setTimeout>,
	);

	const greeting = getGreeting(new Date().getHours());
	const hasMessages = messages.length > 0;

	// Keep the newest message / thinking indicator in view
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
	}, [messages, isQuerying]);

	// Clean up the fake request if the component unmounts
	useEffect(() => () => clearTimeout(timeoutRef.current), []);

	const applySuggestion = (s: Suggestion) => {
		setMessage(`${s.label} ${s.detail}`);
	};

	const handleSendMessage = (text: string) => {
		const trimmed = text.trim();
		if (!trimmed || isQuerying) return;

		setMessages((prev) => [
			...prev,
			{ id: crypto.randomUUID(), role: 'user', content: trimmed },
		]);
		setMessage('');
		setIsQuerying(true);

		// TODO: replace this timeout with your real API call.
		// On success: append the assistant message, then setIsQuerying(false).
		// On error: setIsQuerying(false) and show an error message.
		timeoutRef.current = setTimeout(() => {
			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: 'assistant',
					content: `You asked: "${trimmed}"`,
				},
			]);
			setIsQuerying(false);
		}, 1500);
	};

	return (
		<div
			className={`flex w-full max-w-2xl flex-col ${hasMessages ? 'h-screen' : ''}`}>
			{/* Empty state: greeting */}
			{!hasMessages && (
				<h1 className="font-serif text-[32px] leading-tight text-[#20241F] sm:text-[38px]">
					{greeting} What are you working on?
				</h1>
			)}

			{/* Conversation state: scrollable thread */}
			{hasMessages && (
				<div className="flex-1 space-y-6 overflow-y-auto py-6">
					{messages.map((m) => (
						<ChatMessage
							key={m.id}
							role={m.role}
							content={m.content}
						/>
					))}
					{isQuerying && (
						<ChatMessage
							role="assistant"
							isThinking
						/>
					)}
					<div ref={bottomRef} />
				</div>
			)}

			{/* Input: same slot in both states, so it keeps focus and its text */}
			<div className={hasMessages ? 'pb-4' : ''}>
				<ChatInput
					handleSendMessage={handleSendMessage}
					message={message}
					setMessage={setMessage}
				/>
			</div>

			{/* Empty state: suggestions */}
			{!hasMessages && (
				<div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
					{SUGGESTIONS.map((s) => (
						<button
							key={s.label}
							onClick={() => applySuggestion(s)}
							className="flex items-baseline gap-1.5 rounded-lg border border-[#20241F]/10 px-3.5 py-2.5 text-left text-[13px] hover:border-[#2F6F62]/40 hover:bg-[#2F6F62]/[0.04]">
							<span className="font-medium text-[#20241F]/85">{s.label}</span>
							<span className="truncate text-[#20241F]/50">{s.detail}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}

export default ChatWorkspace;
