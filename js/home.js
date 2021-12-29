import post from './api/post';

function createPostItem(post) {
    const postElement = document.getElementById("postTemplate");

    const liElement = postElement.content.firstElementChild.cloneNode(true);

    // update title , description, author,thumbnail
    const titleElement = liElement.querySelector('[data-id="title"]')
    titleElement.textContent = post.title;
    return liElement;

}

function renderPost(postList) {
    const ulElement = document.getElementById("postList");
    if (!ulElement) return
    postList.forEach((post) => {
        const liElement = createPostItem(post);
        ulElement.appendChild(liElement)
    })
}
(async() => {
    try {
        const queryParams = {
            _page: 1,
            _limit: 5,
        }
        const { data, pagination } = await post.getAll(queryParams);
        renderPost(data);
    } catch (error) {
        console.log('get all failed', error);
    }
})()