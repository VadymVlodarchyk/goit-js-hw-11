// Функція для рендерингу галереї
export function renderGallery(galleryElement, images) {
  images.forEach((image, index) => {
    const card = document.createElement('div');
    card.classList.add('gallery-item');

    // Створюємо картинку
    const img = document.createElement('img');
    img.src = image.webformatURL; // Маленьке зображення для картки
    img.alt = image.tags; // Атрибут alt для зображення

    // Створюємо блок інформації для картки
    const info = document.createElement('div');
    info.classList.add('gallery-item-info');

    // Додаємо всі інформаційні елементи в окремі блоки
    const likesBlock = document.createElement('div');
    likesBlock.classList.add('item');
    likesBlock.innerHTML = `
      <i class="fa fa-thumbs-up"></i>
      <label>Likes:</label>
      <span>${image.likes}</span>
    `;
    info.appendChild(likesBlock);

    const viewsBlock = document.createElement('div');
    viewsBlock.classList.add('item');
    viewsBlock.innerHTML = `
      <i class="fa fa-eye"></i>
      <label>Views:</label>
      <span>${image.views}</span>
    `;
    info.appendChild(viewsBlock);

    const commentsBlock = document.createElement('div');
    commentsBlock.classList.add('item');
    commentsBlock.innerHTML = `
      <i class="fa fa-comment"></i>
      <label>Comments:</label>
      <span>${image.comments}</span>
    `;
    info.appendChild(commentsBlock);

    const downloadsBlock = document.createElement('div');
    downloadsBlock.classList.add('item');
    downloadsBlock.innerHTML = `
      <i class="fa fa-download"></i>
      <label>Downloads:</label>
      <span>${image.downloads}</span>
    `;
    info.appendChild(downloadsBlock);

    // Додаємо картку до галереї
    card.appendChild(img);
    card.appendChild(info);
    galleryElement.appendChild(card);

    // Обробка натискання на картку для відкриття великого зображення
    card.addEventListener('click', () => {
      openModal(images, index); // Відкриваємо модальне вікно, передаємо всі зображення та поточний індекс
    });
  });
}

// Функція для очищення галереї перед новим запитом
export function clearGallery(galleryElement) {
  galleryElement.innerHTML = ''; // Очищаємо вміст галереї
}

// Функція для відкриття модального вікна з великим зображенням
function openModal(images, currentIndex) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <img id="modal-image" src="${images[currentIndex].largeImageURL}" alt="${images[currentIndex].tags}" />
      <button id="prev-image" class="navigate-btn">&#8592;</button>
      <button id="next-image" class="navigate-btn">&#8594;</button>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector('#modal-image');
  const prevButton = modal.querySelector('#prev-image');
  const nextButton = modal.querySelector('#next-image');

  // Закриття модального вікна
  modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.remove();
  });

  // Закриття при натисканні на темну область
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });

  // Перемикання між зображеннями
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    modalImage.src = images[currentIndex].largeImageURL;
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    modalImage.src = images[currentIndex].largeImageURL;
  });
}
