// main.js

import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');
const errorMessage = document.querySelector('#error-message');

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
  loader.classList.remove('hidden'); // Показуємо індикатор завантаження
  errorMessage.classList.add('hidden'); // Приховуємо повідомлення про помилки

  // Виконуємо запит на сервер
  fetchImages(searchedQuery)
    .then(images => {
      renderGallery(gallery, images); // Виводимо зображення
    })
    .catch(error => {
      showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
      console.error(error);
    })
    .finally(() => {
      loader.classList.add('hidden'); // Приховуємо індикатор завантаження
    });
}

function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}
