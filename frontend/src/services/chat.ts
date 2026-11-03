import { API } from '../utils/Api';

export interface SendChat {
	message: string;
}

export const ChatService = {
	createChat: (data: SendChat) => API.post('chat/', data),
};
