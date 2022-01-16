import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { setImg, setTextContent } from './common';
// to use from now function
dayjs.extend(relativeTime);
export function renderPost(data) {

    const ulElement = document.getElementById("postList");
    // check current list 
    ulElement.textContent = "";
    data.forEach((itemData) => {
        const liElement = createPostItem(itemData);
        ulElement.appendChild(liElement)
    })

}
export function createPostItem(itemData) {
    const postElement = document.getElementById("postTemplate");
    const liElement = postElement.content.firstElementChild.cloneNode(true);
    // attach events 
    // go to post detail when click on post-item
    const postItem = liElement.firstElementChild;
    postItem.addEventListener("click", (event) => {
            const menu = liElement.querySelector('[data-id="menu"]');
            if (menu && menu.contains(event.target)) return;
            window.location.assign(`/post-detail.html?id=${itemData.id}`)
        })
        // go to post detail when click on div.post-item
        // update title , description, author,thumbnail
    setTextContent(liElement, '[data-id="title"]', itemData.title)
    setTextContent(liElement, '[data-id="author"]', itemData.author)
    setTextContent(liElement, '[data-id="description"]', itemData.description)
    setImg(liElement, '[data-id="thumbnail"]', itemData.imageUrl)
    setTextContent(liElement, '[data-id="timeSpan"]', dayjs(itemData.updateAt).fromNow());
    const thumbnailImg = liElement.querySelector('[data-id="thumbnail"]');
    thumbnailImg.src = itemData.imageUrl;
    thumbnailImg.addEventListener("error", () => {
            thumbnailImg.src = "https://image.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg"
        })
        //add click event for edit button
    const edit = liElement.querySelector('[data-id="edit"]');
    edit.addEventListener("click", (e) => {
        // prevent event bubbling to parent

        window.location.assign(`/add-edit-post.html?id=${itemData.id}`)
    })
    return liElement;

}