import dayjs, { Dayjs } from 'dayjs';
import post from './api/post';
import { setImg, setTextContent } from './utils';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getPagination } from './utils';
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
    // check current list 
    ulElement.textContent = "";
    data.forEach((itemData) => {
        const liElement = createPostItem(itemData);
        ulElement.appendChild(liElement)
    })
}

function renderPage(pagination) {
    const ulPage = getPagination();
    //calc totalPage
    const { _page, _limit, _totalRows } = pagination;
    const totalPages = Math.ceil(_totalRows / _limit);
    //save page and totalPage to ulPage
    ulPage.dataset.page = _page;
    ulPage.dataset.totalPages = totalPages;
    // check if enable/ disable prev/ next links
    (_page <= 1) ? ulPage.firstElementChild.classList.add("disabled"): ulPage.firstElementChild.classList.remove("disabled");
    (_page > totalPages) ? ulPage.lastElementChild.classList.add("disabled"): ulPage.lastElementChild.classList.remove("disabled");
}

async function handleFilterChange(filterName, filterValue) {
    //update query params
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterValue);
    history.pushState({}, '', url);
    //fetch API
    //render post
    const { data, pagination } = await post.getAll(url.searchParams);
    renderPost(data);
    renderPage(pagination)


}

function handlePrevClick(e) {
    e.preventDefault();
    const ulPage = getPagination();
    console.log(ulPage);
    const page = Number.parseInt(ulPage.dataset.page)
    if (page <= 1) return;
    handleFilterChange('_page', page - 1)
}

function handleNextClick(e) {
    e.preventDefault();
    const ulPage = getPagination();
    const page = Number.parseInt(ulPage.dataset.page);
    const totalPages = ulPage.dataset.totalPages;
    if (page >= totalPages) return;
    handleFilterChange('_page', page + 1)
}

function init() {
    // bind click event for prev/next link
    const ulPage = document.getElementById("pagination");
    // add click event for prev link  
    const prevLink = ulPage.firstElementChild.firstElementChild;
    prevLink.addEventListener("click", handlePrevClick)
    const nextLink = ulPage.lastElementChild.lastElementChild;
    nextLink.addEventListener("click", handleNextClick)

}

function initUrl() {
    const url = new URL(window.location)
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);
    history.pushState({}, '', url);
}
(async() => {
    try {
        init();
        initUrl();
        const queryParams = new URLSearchParams(window.location.search);
        // set default query params if not exitsted
        const { data, pagination } = await post.getAll(queryParams);
        console.log(pagination);
        renderPost(data);
        renderPage(pagination)
    } catch (error) {
        console.log('get all failed', error);
    }
})()