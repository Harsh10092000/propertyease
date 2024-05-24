import axios from "axios";
const SendJwt = () => {
    const token = localStorage.getItem('user2');
    axios.defaults.headers.common['x-access-token'] = token;
}

export default SendJwt
