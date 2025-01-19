export function getPosts(searchQuery) {
    const BASE_URL = "https://pixabay.com/api"; // Правильний базовий URL
    const params = new URLSearchParams({
        key: "48269176-9eacf4bd75a8a580043143bd0",
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    });

    const url = `${BASE_URL}?${params}`; // Формуємо правильний URL

    return fetch(url)
        .then(respond => {
            if (!respond.ok) { // Перевірка статусу відповіді
                throw new Error(`HTTP error! status: ${respond.status}`);
            }
            return respond.json();
        })
        .catch(error => {
            console.error(error);
            throw new Error(`Something went wrong: ${error.message}`);
        });
};
