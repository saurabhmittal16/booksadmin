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

const getRentData = async () => {
	try {
		const res = await axios.get(`${server}/api/v1/admin/rents`)
		if (res.status === 200) {
			return res.data;
		}
	} catch (err) {
		console.log(err);
		return [];
	}
}

const getMoreData = async (url) => {
	try {
		const res = await axios.get(`${server}/api/v1${url}`);
		if (res.status === 200) {
			return res.data;
		}
	} catch (err) {
		console.log(err);
		return [];
	}
}

const markStatus = async (id, status) => {
	try {
		const res = await axios.post(server + '/api/v1/admin/status', {
			id: id,
			status: status
		});

		if (res.status === 200 && res.data.success === true)
			return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}

const getUID = async (mobile) => {
	try {
		const res = await axios.get(server + '/api/v1/admin/mobile/' + mobile);
		if (res.status === 200)
			return res.data;
	} catch (err) {
		console.log(err);
		return null;
	}
}

const findByISBN = async (isbn) => {
	try {
		const res = await axios.get(server + '/api/v1/book/isbn?isbn=' + isbn);
		if (res.status === 200) {
			return res.data;
		} else {
			return null;
		}
	} catch (err) {
		console.log(err);
		return null;
	}
}

const addListing = async (data) => {
	try {
		const res = await axios.post(server + '/api/v1/admin/book', data);
		if (res.status === 200 && res.data.success) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		console.log(err);
		return false;
	}
}

export { checkPassword, setAuthHeaders, clearAuthHeaders, getRentData, getMoreData, markStatus, getUID, findByISBN, addListing };
