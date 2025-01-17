// import { fetchImages } from './js/pixabay-api.js';
// import { renderGallery, clearGallery } from './js/render-functions.js';

// const form = document.querySelector('#search-form');
// const gallery = document.querySelector('#gallery');
// const loader = document.querySelector('#loader');
// const errorMessage = document.querySelector('#error-message');

// // Обробка сабміту форми
// form.addEventListener('submit', onSearchFormSubmit);

// function onSearchFormSubmit(event) {
//   event.preventDefault(); // Зупиняємо стандартну поведінку форми

//   const searchedQuery = form.querySelector('input[name="user_query"]').value.trim();
//   if (!searchedQuery) {
//     showErrorMessage('Please enter a search term.');
//     return;
//   }

//   // Очищаємо галерею перед новим запитом
//   clearGallery(gallery);
//   loader.classList.remove('hidden'); // Показуємо індикатор завантаження
//   errorMessage.classList.add('hidden'); // Приховуємо повідомлення про помилки

//   // Виконуємо запит на сервер
//   fetchImages(searchedQuery)
//     .then(images => {
//       if (images.length === 0) {
//         // Якщо зображень немає
//         showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
//       } else {
//         renderGallery(gallery, images); // Виводимо зображення
//       }
//     })
//     .catch(error => {
//       showErrorMessage('Sorry, there was an error fetching the images. Please try again!');
//       console.error(error);  // Виводимо помилку в консоль
//     })
//     .finally(() => {
//       loader.classList.add('hidden'); // Приховуємо індикатор завантаження
//     });
// }

// function showErrorMessage(message) {
//   // Використовуємо iziToast для показу повідомлення про помилку
//   iziToast.error({
//     title: 'Error',
//     message: message,
//     position: 'topRight',  // Можна вибрати позицію на сторінці
//     timeout: 5000,  // Час відображення повідомлення
//   });

//   // Якщо потрібно, відображати помилку на сторінці:
//   errorMessage.textContent = message;
//   errorMessage.classList.remove('hidden'); // Показуємо повідомлення
// }
// const API_KEY = '48269176-9eacf4bd75a8a580043143bd0';
// const BASE_URL = 'https://pixabay.com/api/';

// export function fetchImages(query, page = 1) {
//  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`;


//   return fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Failed to fetch images');
//       }
//       return response.json(); // Повертаємо результат як json
//     })
//     .then(data => {
//       console.log('API data:', data); // Перевіримо відповідь API
//       if (data.hits.length === 0) {
//         throw new Error('No images found');
//       }
//       return data.hits; // Повертаємо масив зображень
//     })
//     .catch(error => {
//       console.error('Error fetching images:', error);
//       throw error;
//     });
// }
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');
const errorMessage = document.querySelector('#error-message');
// Функція для показу індикатора завантаження
function showLoader() {
  document.getElementById('loader').classList.remove('hidden'); // Видаляємо клас hidden
}

// Функція для приховування індикатора завантаження
function hideLoader() {
  document.getElementById('loader').classList.add('hidden'); // Додаємо клас hidden
}


// Обробка сабміту форми
form.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  const searchedQuery = form.querySelector('input[name="user_query"]').value.trim();
  if (!searchedQuery) {
    showErrorMessage('Please enter a search term.');
    return;
  }

  // Очищаємо галерею перед новим запитом
  clearGallery(gallery);
  showLoader(); // Показуємо індикатор завантаження
  errorMessage.classList.add('hidden'); // Приховуємо повідомлення про помилки

  // Виконуємо запит на сервер
  fetchImages(searchedQuery)
    .then(images => {
      if (images.length === 0) {
        // Якщо зображень немає
        showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
      } else {
        renderGallery(gallery, images); // Виводимо зображення
      }
    })
    .catch(error => {
      showErrorMessage('Sorry, there was an error fetching the images. Please try again!');
      console.error(error);  // Виводимо помилку в консоль
    })
    .finally(() => {
      hideLoader(); // Приховуємо індикатор завантаження
    });
}

function showErrorMessage(message) {
  // Використовуємо iziToast для показу повідомлення про помилку
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',  // Можна вибрати позицію на сторінці
    timeout: 5000,  // Час відображення повідомлення
  });

  // Якщо потрібно, відображати помилку на сторінці:
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden'); // Показуємо повідомлення
}
