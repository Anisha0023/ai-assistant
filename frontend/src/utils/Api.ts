import axios from 'axios';

export const API = axios.create({
	baseURL: import.meta.env.VITE_CHAT_SERVER,
	headers: {
		Accept: 'application/json',
	},
});

API.interceptors.request.use(
	(request) => {
		request.headers['Accept'] = 'application/json';
		return request;
	},
	(error) => Promise.reject(error),
);

API.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response?.status === 404) {
			console.log('NOT FOUND');
		}
		return Promise.reject(error);
	},
);
