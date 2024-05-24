import axios from "axios";
const SendJwt = () => {
    const token = localStorage.getItem('user');
    axios.defaults.headers.common['x-access-token'] = token;
}

export default SendJwt
