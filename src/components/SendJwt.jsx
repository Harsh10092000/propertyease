import axios from "axios";
const SendJwt = () => {
    const token = localStorage.getItem('user5');
    axios.defaults.headers.common['x-access-token'] = token;
}

export default SendJwt
