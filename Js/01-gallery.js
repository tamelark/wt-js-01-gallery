import { galleryItems } from './gallery-items.js';

const refs = {
  galleryListEl: document.querySelector('ul.gallery'),
  modalContainerEl: document.querySelector('div.lightbox'),
  lightboxOverlayEl: document.querySelector('div.lightbox__overlay'),
  modalImgEl: document.querySelector('img.lightbox__image'),
  modalCloseBtnEl: document.querySelector('[data-action="close-lightbox"]'),
};

function closeModal() {
  refs
    .modalContainerEl
    .classList
    .remove('is-open');

  // 6. Очищення значення атрибута src елемента img.lightbox__image.
  refs.modalImgEl.src = '';
  refs.modalImgEl.alt = '';

  document.removeEventListener('keydown', onEscPress);
  document.removeEventListener('keydown', onArrowPress);
}

function onEscPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}
refs.lightboxOverlayEl.addEventListener('click', closeModal);

function onGalleryItemClick(event) {
  event.preventDefault();


  const isGalleryEl = event
    .target
    .classList
    .contains('gallery__image');
  if (!isGalleryEl) {
    return;
  }
  refs
    .modalContainerEl
    .classList
    .add('is-open');


  refs.modalImgEl.src = event.target.dataset.source;
  refs.modalImgEl.alt = event
    .target
    .getAttribute('alt');

  document.addEventListener('keydown', onEscPress);
  document.addEventListener('keydown', onArrowPress);

}

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({preview, original, description}) => {
      return `<li class="gallery__item"> 
                    <a class="gallery__link" >
                        <img class="gallery__image" src="${preview}" data-source="${original}"  alt="${description}"/> 
                    </a>
                </li>`;
    })
    .join('');
}


const galleryMarkup = createGalleryMarkup(galleryItems)

refs.galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
refs.galleryListEl.addEventListener('click', onGalleryItemClick);
refs.modalCloseBtnEl.addEventListener('click', closeModal);
refs.lightboxOverlayEl.addEventListener('click', closeModal); // 7.

console.log(galleryItems);