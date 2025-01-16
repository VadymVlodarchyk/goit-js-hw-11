// pixabay-api.js

const API_KEY = '48269176-9eacf4bd75a8a580043143bd0';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      return response.json(); // Повертаємо результат як json
    })
    .then(data => {
      if (data.hits.length === 0) {
        throw new Error('No images found');
      }
      return data.hits; // Повертаємо масив зображень
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error; // Пробрасываем ошибку для обработки в других местах
    });
}
