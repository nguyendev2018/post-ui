import post from './api/post';
import { registerLightBox, setTextContent } from './utils';
import dayjs from 'dayjs';

function renderPostDetails(post_item) {
    //render tittle
    // render description
    // render updateAt
    setTextContent(document, "#postDetailTitle", post_item.title);
    setTextContent(document, "#postDetailAuthor", post_item.author);
    setTextContent(document, "#postDetailDescription", post_item.description);
    setTextContent(document, "#postDetailTimeSpan", dayjs(post.updateAt).format('DD/MM/YYYY- HH:mm'));
    // render heroimg URL
    const thumbnailImg = document.getElementById('postHeroImage');
    thumbnailImg.style.backgroundImage = `url("${post_item.imageUrl}")`;
    thumbnailImg.addEventListener("error", () => {
            thumbnailImg.style.backgroundImage = "https://image.freepik.com/free-vector/glitch-error-404-page_23-2148105404.jpg"
        })
        // render edit page link
    const editPageLink = document.getElementById("goToEditPageLink");
    editPageLink.href = `/add-edit-post.html?id=${post_item.id}`
}

(async() => {
    registerLightBox({
        modalId: 'lightBox',
        imageElement: 'img[data-id="lightBoxImg"]',
        prevElement: 'button[data-id="lightBoxPrev"]',
        nextElement: 'button[data-id="lightBoxNext"]'
    });
    try {

        const searchParam = new URLSearchParams(window.location.search);
        const postId = searchParam.get('id');
        const post_item = await post.getById(postId);
        renderPostDetails(post_item)
    } catch (error) {
        console.log('error');
    }
})()