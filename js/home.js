import post from './api/post';
import { initPage, initSearch, renderPost, renderPage } from './utils'




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



function getDefaultParams() {
    const url = new URL(window.location)
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);
    history.pushState({}, '', url);
    return url.searchParams;
}
(async() => {
    try {

        const queryParams = getDefaultParams();
        initPage({
            elementId: 'pagination',
            defaultParams: queryParams,
            onChange: page => handleFilterChange('_page', page)
        })
        initSearch({
                elementId: 'searchInput',
                defaultParams: queryParams,
                onChange: value => handleFilterChange('title_like', value)
            })
            // set default query params if not exitsted
        const { data, pagination } = await post.getAll(queryParams);
        renderPost(data);
        renderPage(pagination);
    } catch (error) {
        console.log('get all failed', error);
    }
})()