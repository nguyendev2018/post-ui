import post from './api/post';
import { renderForm } from './utils/post-form';
(async() => {
    try {
        const searchParams = new URLSearchParams(window.location.search);
        const postId = searchParams.get("id");

        let defaultValues = {
            title: "",
            description: "",
            author: "",
            imageUrl: ""
        };
        defaultValues = await post.getById(postId);

        renderForm({
            formId: "postForm",
            defaultValues,
            onSubmit: (formValues) => console.log('submit', formValues)
        })
    } catch (error) {
        console.log(error);
    }

})()