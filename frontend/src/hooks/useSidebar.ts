import { useState, useEffect } from 'react';
import { DESKTOP_QUERY } from '../components/layout/Sidebar';

export function useSidebar() {
	const [sidebarOpen, setSidebarOpen] = useState(
		() =>
			typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches,
	);

	useEffect(() => {
		const mq = window.matchMedia(DESKTOP_QUERY);
		const onChange = (e: MediaQueryListEvent) => setSidebarOpen(e.matches);
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}, []);

	return { sidebarOpen, setSidebarOpen };
}
