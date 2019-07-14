import axios from 'axios';
import { client } from './config';

const checkPassword = async (password) => {
    console.log(password);
};

const setAuthHeaders = () => {
    axios.defaults.headers.common['Authorization'] = client;
}

const clearAuthHeaderes = () => {
    delete axios.defaults.headers.common['Authorization'];
}

export { checkPassword, setAuthHeaders, clearAuthHeaderes }