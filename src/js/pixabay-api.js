// pixabay-api.js

export function getPosts(query) {
    const API_KEY = '48269176-9eacf4bd75a8a580043143bd0';  // Ваш API ключ
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            throw new Error(`Something went wrong: ${error.message}`);
        });
}
