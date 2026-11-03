import { useEffect, useRef, useState } from 'react';
import ChatInput from '../features/chat/ChatInput';
import ChatMessage, { type Message } from '../features/chat/ChatMessage';
import { ChatService } from '../services/chat';

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

	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const greeting = getGreeting(new Date().getHours());
	const hasMessages = messages.length > 0;

	useEffect(() => {
		const container = messagesContainerRef.current;
		if (!container) return;

		container.scrollTo({
			top: container.scrollHeight,
			behavior: 'smooth',
		});
	}, [messages, isQuerying]);

	const applySuggestion = (s: Suggestion) => {
		setMessage(`${s.label} ${s.detail}`);
	};

	const handleSendMessage = async (text: string) => {
		const trimmed = text.trim();

		if (!trimmed || isQuerying) return;

		setMessages((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				role: 'user',
				content: trimmed,
			},
		]);

		setMessage('');
		setIsQuerying(true);

		try {
			const res = await ChatService.createChat({
				message: trimmed,
			});

			const response = res?.data?.response;

			if (typeof response !== 'string' || !response.trim()) {
				throw new Error('Received an empty response.');
			}

			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: 'assistant',
					content: response,
				},
			]);
		} catch (error) {
			console.error('Chat request failed:', error);

			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: 'assistant',
					content:
						'Something went wrong. Please try sending your message again.',
				},
			]);
		} finally {
			setIsQuerying(false);
		}
	};

	return (
		<div className="flex min-h-0 flex-1 flex-col overflow-hidden">
			<div
				ref={messagesContainerRef}
				className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-y-auto overscroll-contain px-6">
				{!hasMessages ? (
					<div className="flex min-h-0 flex-1 flex-col justify-center ">
						<h1 className="font-serif text-[32px] leading-tight text-[#20241F] sm:text-[38px]">
							{greeting} What are you working on?
						</h1>

						<div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
							{SUGGESTIONS.map((s) => (
								<button
									key={s.label}
									type="button"
									onClick={() => applySuggestion(s)}
									className="flex min-w-0 items-baseline gap-1.5 rounded-lg border border-[#20241F]/10 px-3.5 py-2.5 text-left text-[13px] transition-colors hover:border-[#2F6F62]/40 hover:bg-[#2F6F62]/[0.04]">
									<span className="shrink-0 font-medium text-[#20241F]/85">
										{s.label}
									</span>
									<span className="truncate text-[#20241F]/50">
										{s.detail}
									</span>
								</button>
							))}
						</div>
					</div>
				) : (
					<div className="min-h-0 flex-1 ">
						<div className="space-y-6 py-4">
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
						</div>
					</div>
				)}
			</div>

			<div className="mx-auto w-full max-w-3xl shrink-0 px-6 pb-2 pt-3">
				<ChatInput
					handleSendMessage={handleSendMessage}
					message={message}
					setMessage={setMessage}
				/>
			</div>
		</div>
	);
}

export default ChatWorkspace;
