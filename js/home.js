import dayjs from 'dayjs';
import post from './api/post';
import { setImg, setTextContent } from './common';
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



async function handleFilterChange(filterName, filterValue) {
    //update query params
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterValue);
    //reset page if needed
    if (filterName === "title_like") url.searchParams.set("_page", 1);
    history.pushState({}, '', url);
    //fetch API
    //render post
    const { data, pagination } = await post.getAll(url.searchParams);
    renderPost(data);
    renderPage(pagination)


}



function initSearch() {
    const searchInput = document.getElementById("searchInput");
    // set default value from query params
    // title_like  
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('title_like')) {
        searchInput.value = queryParams.get('title_like')
    }
    const debounceSearch = debounce(
        (event) => handleFilterChange('title_like', event.target.value), 500
    );
    searchInput.addEventListener("input", debounceSearch);
}

function getDefaultParams() {
    const url = new URL(window.location)
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);
    history.pushState({}, '', url);
    return url.searchParams;
}
(async() => {
    try {
        init();
        initSearch();
        const queryParams = getDefaultParams();
        // set default query params if not exitsted
        const { data, pagination } = await post.getAll(queryParams);
        renderPost(data);
        renderPage(pagination)
    } catch (error) {
        console.log('get all failed', error);
    }
})()