import { setFieldValue, setImgURL, setTextContent } from "./common";
import * as yup from 'yup';

function setFormValues(formId, formValues) {
    setFieldValue(formId, '[name="title"]', formValues.title);
    setFieldValue(formId, '[name="author"]', formValues.author);
    setFieldValue(formId, '[name="description"]', formValues.description);
    setFieldValue(formId, '[name="imageUrl"]', formValues.imageUrl);
    setImgURL(document, '#postHeroImage', formValues.imageUrl);
}

function getFormValues(form) {
    const formValues = {};
    //S2:using form data
    const data = new FormData(form)
    for (const [key, value] of data) {
        formValues[key] = value;
    }
    return formValues;

}

export function renderForm({ formId, defaultValues }) {
    const form = document.getElementById(formId);
    setFormValues(form, defaultValues);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        //get from values 
        const formValues = getFormValues(form);
        // validation
        // if valid trigger submit callback
        if (!validatePostForm(form)) return
            // otherwise, show validation errors
    })
}

function setFieldError(form, name, error) {
    const element = form.querySelector(`[name="${name}"]`);
    element.setCustomValidity(error)
    setTextContent(element.parentElement, '.invalid-feedback', error);
}
async function validatePostForm(form) {
    try {
        // reset previous error
        ['title', 'author'].forEach(name => setFieldError(form, name, ''))

        const schema = getPostSchema();
        await schema.validate(formValues, { abortEarly: false });
    } catch (error) {
        console.log(error.name);
        for (const validationError of error.inner) {
            const name = validationError.path
            setFieldError(form, name, validationError.message)
        }
    }
}

function getPostSchema() {
    return yup.object().shape({
        title: yup.string().require('Please enter title'),
        author: yup.string().required("please enter author"),
        description: yup.string()
    })
}