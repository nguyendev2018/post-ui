import axiosClient from "./axiosClient";

const post = {
    getAll(params) {
        const url = './posts';
        return axiosClient.get(url, { params });
    },
    getById(id) {

    }
}
export default post