import axiosClient from './api/axiosClient';
import post from './api/post';
async function main() {
    try {
        const queryParams = {
            _page: 1,
            _limit: 5,
        }
        const response = await post.getAll(queryParams);
        console.log(response);
    } catch (error) {
        console.log('get all failed');
    }

}
main();