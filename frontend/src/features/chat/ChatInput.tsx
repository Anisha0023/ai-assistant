import { Paperclip, ArrowUp } from 'lucide-react';
import { useEffect, useRef } from 'react';

function ChatInput({
	handleSendMessage,
	message,
	setMessage,
}: {
	handleSendMessage: (message: string) => void;
	message: string;
	setMessage: (message: string) => void;
}) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const el = textareaRef.current;
		if (!el) return;
		el.style.height = 'auto';
		el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
	}, [message]);

	const handleEnterPress = (
		event: React.KeyboardEvent<HTMLTextAreaElement>,
	) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();

			if (message.trim().length > 0) {
				handleSendMessage(message);
			}
		}
	};

	return (
		<div className="mt-7 rounded-2xl border border-[#20241F]/12 bg-[#FCFBF8] p-3 shadow-[0_1px_0_rgba(32,36,31,0.04)] focus-within:border-[#2F6F62]/50">
			<textarea
				ref={textareaRef}
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder="Message Sable..."
				rows={1}
				onKeyDown={handleEnterPress}
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
						handleSendMessage(message);
					}}
					disabled={message.trim().length === 0}
					className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F6F62] text-[#F6F5F0] transition-opacity disabled:opacity-30"
					aria-label="Send message">
					<ArrowUp size={16} />
				</button>
			</div>
		</div>
	);
}

export default ChatInput;
