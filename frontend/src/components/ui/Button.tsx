import { type ReactNode } from 'react';

type sizeType = 'sm' | 'md' | 'lg';

interface ButtonProps {
	onClick?: () => void;
	size: sizeType;
	variant: string;
	children: ReactNode;
}

function Button({ onClick, size = 'sm', variant, children }: ButtonProps) {
	return (
		<div>
			<button
				onClick={onClick}
				className={`${size} ${variant}`}>
				{children}
			</button>
		</div>
	);
}

export default Button;
