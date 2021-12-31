import dayjs, { Dayjs } from 'dayjs';
import post from './api/post';
import { setImg, setTextContent } from './utils';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getPagination } from './utils';
import debounce from 'lodash.debounce'
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
    return liElement;

}

function renderPost(data) {

    const ulElement = document.getElementById("postList");
    // check current list 
    ulElement.textContent = "";
    data.forEach((itemData) => {
        const liElement = createPostItem(itemData);
        ulElement.appendChild(liElement)
    })
}