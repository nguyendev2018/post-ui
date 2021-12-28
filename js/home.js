import post from './api/post';

function createPostItem() {

}

function renderPost(postList) {
    console.log({ postList });
}
(async() => {
        try {
            const queryParams = {
                _page: 1,
                _limit: 6,
            }
            const { data, pagination } = await post.getAll(queryParams);
        })
}
catch (error) {
    console.log('get all failed');
}

})()