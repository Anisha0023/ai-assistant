export interface Message {
	id: string;
	role: 'user' | 'assistant';
	content: string;
}

interface ChatMessageProps {
	role: Message['role'];
	content?: string;
	isThinking?: boolean;
}

function ChatMessage({
	role,
	content = '',
	isThinking = false,
}: ChatMessageProps) {
	if (role === 'user') {
		return (
			<div className="flex justify-end">
				<div className="max-w-[85%] whitespace-pre-wrap rounded-2xl bg-[#20241F]/[0.05] px-4 py-2.5 text-[14px] leading-relaxed text-[#20241F]">
					{content}
				</div>
			</div>
		);
	}

	return (
		<div className="flex justify-start">
			{isThinking ? (
				<div
					className="flex items-center gap-1 py-2"
					role="status"
					aria-label="Generating response">
					<span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#2F6F62]/70" />
					<span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#2F6F62]/70 [animation-delay:150ms]" />
					<span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#2F6F62]/70 [animation-delay:300ms]" />
				</div>
			) : (
				<div className="max-w-full whitespace-pre-wrap text-[14px] leading-relaxed text-[#20241F]/90">
					{content}
				</div>
			)}
		</div>
	);
}

export default ChatMessage;
