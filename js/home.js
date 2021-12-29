import post from './api/post';
import { setTextContent } from './utils';

function createPostItem(post) {
    const postElement = document.getElementById("postTemplate");

    const liElement = postElement.content.firstElementChild.cloneNode(true);

    // update title , description, author,thumbnail
    setTextContent(liElement, '[data-id="title"]', post.title)
    setTextContent(liElement, '[data-id="author"]', post.author)
    setTextContent(liElement, '[data-id="description"]', post.description)
    setTextContent(liElement, '[data-id="thumbnail"]', post.imageUrl)

    const titleElement = liElement.querySelector()
    titleElement.textContent = post.title;
    const authorElement = liElement.querySelector('')
    authorElement.textContent = post.author;
    const descriptionElement = liElement.querySelector('')
    descriptionElement.textContent = post.description;
    const thumbnailElement = liElement.querySelector('')
    thumbnailElement.src = post.imageUrl;
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
        console.log(data);
    } catch (error) {
        console.log('get all failed', error);
    }
})()