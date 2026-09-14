import type { SidebarItem } from '../../types/sidebar';
import { HiClock, HiMiniMagnifyingGlassPlus } from 'react-icons/hi2';

export const sidebarItems: SidebarItem[] = [
	{
		label: 'New Chat',
		icon: HiMiniMagnifyingGlassPlus,
	},
	{
		label: 'Chat History',
		icon: HiClock,
	},
];
