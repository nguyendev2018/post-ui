function showModal(modalElement) {
    const modal = new window.bootstrap.Modal(modalElement);
    modal.toggle();
}
export function registerLightBox({
    modalId,
    imageElement,
    prevElement,
    nextElement
}) {
    const modalElement = document.getElementById(modalId);
    //selectors
    const galleryImg = modalElement.querySelector(imageElement);
    const prev = modalElement.querySelector(prevElement);
    const next = modalElement.querySelector(nextElement);
    //lightBox 
    let currentIndex = 0;
    let imgList = [];

    function showImageIndex() {
        currentIndex == (imgList.length - 1);
        console.log(currentIndex);
        galleryImg.src = imgList[currentIndex].src;
    }
    document.addEventListener("click", (event) => {
        const { target } = event;
        imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`);
        currentIndex = [...imgList].findIndex((x) => x === target);
        showImageIndex(currentIndex);
        showModal(modalElement);
    })


    prev.addEventListener("click", () => {
        currentIndex != 0 ? currentIndex-- : undefined;
        showImageIndex(currentIndex);
    })

    next.addEventListener("click", () => {
        currentIndex != (imgList.length - 1) ? currentIndex++ : undefined;
        showImageIndex(currentIndex);
    })

}