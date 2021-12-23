import axiosClient from './api/axiosClient';
async function main() {
    const response = axiosClient.get("/posts");
    console.log(response);
}
main();
