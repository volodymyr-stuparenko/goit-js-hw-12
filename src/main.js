import iziToast from 'izitoast';
import SimpleLightbox from "simplelightbox";

import { fetchPhotos } from './js/pixabay-api';
import { renderPhotoCards } from './js/render-functions';

const formEl = document.querySelector('.form-search');
const galleryContainer = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

const onFormSubmit = event => {
  event.preventDefault();
  galleryContainer.innerHTML = '';
  loader.style.display = 'block';

  const query = event.currentTarget.elements.user_query.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  fetchPhotos(query)
    .then(data => {
      loader.style.display = 'none';

      if (!data.hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      const markup = renderPhotoCards(data.hits);
      galleryContainer.insertAdjacentHTML('beforeend', markup);

      const lightbox = new SimpleLightbox('.gallery-item', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });
      lightbox.refresh();

      formEl.reset();
    })
    .catch(error => {
      loader.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message: 'Failed to load images. Please try again later.',
      });
    });
};

formEl.addEventListener('submit', onFormSubmit);