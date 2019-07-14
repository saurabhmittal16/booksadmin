import axios from 'axios';
import { client, server } from './config';

const checkPassword = async password => {
	try {
		const res = await axios.post(server + '/api/v1/admin/login', {
			password: password,
		});

		if (res.status === 200 && res.data.success === true)
			return true;

	} catch (err) {
		console.log(err);
		return false;
    }
};

const setAuthHeaders = () => {
	axios.defaults.headers.common['Authorization'] = client;
};

const clearAuthHeaders = () => {
	delete axios.defaults.headers.common['Authorization'];
};

export { checkPassword, setAuthHeaders, clearAuthHeaders };
