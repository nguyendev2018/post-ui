import axios from "axios";
const axiosClient = axios.create({
    baseURL: "https://post-ui-lilac.vercel.app/",
    headers: {
        'Content-Type': "application/json",

    }
})
export default axiosClient;