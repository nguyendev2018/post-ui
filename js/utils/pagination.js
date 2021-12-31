export function renderPage(pagination) {
    const ulPage = getPagination();
    //calc totalPage
    const { _page, _limit, _totalRows } = pagination;
    const totalPages = Math.ceil(_totalRows / _limit);
    //save page and totalPage to ulPage
    ulPage.dataset.page = _page;
    ulPage.dataset.totalPages = totalPages;
    // check if enable/ disable prev/ next links
    (_page <= 1) ? ulPage.firstElementChild.classList.add("disabled"): ulPage.firstElementChild.classList.remove("disabled");
    (_page >= totalPages) ? ulPage.lastElementChild.classList.add("disabled"): ulPage.lastElementChild.classList.remove("disabled");
}
export function init() {
    // bind click event for prev/next link
    const ulPage = document.getElementById("pagination");
    // add click event for prev link  
    const prevLink = ulPage.firstElementChild.firstElementChild;
    prevLink.addEventListener("click", (e) => {
        e.preventDefault();
        const ulPage = getPagination();
        const page = Number.parseInt(ulPage.dataset.page)
        if (page <= 1) return;
        handleFilterChange('_page', page - 1)
    })
    const nextLink = ulPage.lastElementChild.lastElementChild;
    nextLink.addEventListener("click", (e) => {
        e.preventDefault();
        const ulPage = getPagination();
        const page = Number.parseInt(ulPage.dataset.page);
        const totalPages = ulPage.dataset.totalPages;
        if (page >= totalPages) return;
        handleFilterChange('_page', page + 1)
    })

}