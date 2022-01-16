export function setTextContent(parent, selector, text) {
    const element = parent.querySelector(selector);
    element.textContent = text;
}
export function setImg(parent, selector, text) {
    const element = parent.querySelector(selector);
    element.src = text;

}
export function setFieldValue(form, selector, value) {
    const field = form.querySelector(selector);
    field.value = value;
}
export function setImgURL(parent, selector, imgURL) {
    const element = parent.querySelector(selector);
    element.style.backgroundImage = `url("${imgURL}")`
}