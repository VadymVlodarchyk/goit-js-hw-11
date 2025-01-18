import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Основні змінні
const form = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const errorMessage = document.querySelector('#error-message');
const loader = document.querySelector('#loader');

// Функція для показу індикатора завантаження
function showLoader() {
  loader.classList.remove('hidden');
}

// Функція для приховування індикатора завантаження
function hideLoader() {
  loader.classList.add('hidden');
}

// Обробка сабміту форми
form.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(event) {
  event.preventDefault();

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
        showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
      } else {
        renderGallery(gallery, images); // Виводимо зображення
      }
    })
    .catch(error => {
      showErrorMessage('Sorry, there was an error fetching the images. Please try again!');
      console.error(error);
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
    position: 'topRight',
    timeout: 5000,
  });
}
