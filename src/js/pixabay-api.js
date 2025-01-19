export function getPosts(searchQuery) {
    const BASE_URL = "https://pixabay.com/api";
    const params = new URLSearchParams({
        key: "48269176-9eacf4bd75a8a580043143bd0",
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    });

    const url = `https://api.allorigins.win/get?url=${encodeURIComponent('https://pixabay.com/api?' + params)}`;

    return fetch(url)
        .then(respond => {
            if (!respond.ok) {
                throw new Error(`HTTP error! status: ${respond.status}`);
            }
            return respond.json();  // Отримуємо JSON
        })
        .then(data => {
            // Парсимо рядок JSON з поля 'contents'
            const parsedData = JSON.parse(data.contents); // Парсимо contents як JSON
            console.log('Parsed Data:', parsedData); // Перевірка результату

            return parsedData;  // Повертаємо оброблені дані
        })
        .catch(error => {
            console.error(error);
            throw new Error(`Something went wrong: ${error.message}`);
        });
};
