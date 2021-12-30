import dayjs, { Dayjs } from 'dayjs';
import post from './api/post';
import { setImg, setTextContent } from './utils';
import relativeTime from 'dayjs/plugin/relativeTime';
// to use from now function
dayjs.extend(relativeTime);

function createPostItem(itemData) {
    const postElement = document.getElementById("postTemplate");

    const liElement = postElement.content.firstElementChild.cloneNode(true);

    // update title , description, author,thumbnail
    setTextContent(liElement, '[data-id="title"]', itemData.title)
    setTextContent(liElement, '[data-id="author"]', itemData.author)
    setTextContent(liElement, '[data-id="description"]', itemData.description)
    setImg(liElement, '[data-id="thumbnail"]', itemData.imageUrl)
    setTextContent(liElement, '[data-id="timeSpan"]', dayjs(itemData.updateAt).fromNow());
    const thumbnailImg = liElement.querySelector('[data-id="thumbnail"]');
    if (thumbnailImg) {
        thumbnailImg.src = itemData.imageUrl;
        thumbnailImg.addEventListener("error", () => {
            thumbnailImg.src = "https://image.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg"
        })
    }
    // const titleElement = liElement.querySelector()
    // titleElement.textContent = post.title;
    // const authorElement = liElement.querySelector('')
    // authorElement.textContent = post.author;
    // const descriptionElement = liElement.querySelector('')
    // descriptionElement.textContent = post.description;
    // const thumbnailElement = liElement.querySelector('')
    // thumbnailElement.src = post.imageUrl;
    return liElement;

}

function renderPost(data) {

    const ulElement = document.getElementById("postList");
    data.forEach((itemData) => {
        console.log(itemData);
        const liElement = createPostItem(itemData);
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