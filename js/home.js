import post from './api/post';

function renderPost(postList) {
    console.log({ postList });
}
(async() => {
    try {
        const queryParams = {
            _page: 1,
            _limit: 6,
        }
        const data = await post.getAll(queryParams);
        renderPost(data)
    } catch (error) {
        console.log('get all failed');
    }

})()