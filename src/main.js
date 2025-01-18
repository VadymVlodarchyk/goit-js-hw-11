document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#search-form');
  const gallery = document.querySelector('#gallery');
  const loader = document.querySelector('#loader');
  const errorMessage = document.querySelector('#error-message');

  // Функція для показу індикатора завантаження
  function showLoader() {
    document.getElementById('loader').classList.remove('hidden');
  }

  // Функція для приховування індикатора завантаження
  function hideLoader() {
    document.getElementById('loader').classList.add('hidden');
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
});
