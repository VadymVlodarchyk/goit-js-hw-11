// render-functions.js

// Функція для рендерингу карток зображень
export function renderGallery(container, images) {
  const markup = images
    .map(({ webformatURL, largeImageURL, tags }) => {
      return `
        <a href="${largeImageURL}" class="gallery-item">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
      `;
    })
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
}

// Функція для очищення галереї перед новим пошуком
export function clearGallery(container) {
  container.innerHTML = '';
}
