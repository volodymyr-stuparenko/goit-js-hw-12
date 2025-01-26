import iziToast from 'izitoast';
import SimpleLightbox from "simplelightbox";

import { fetchPhotos } from './js/pixabay-api';
import { renderPhotoCards } from './js/render-functions';

const formEl = document.querySelector('.form-search');
const galleryContainer = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let page = 1;
let query = '';
let lightbox;

loader.style.display = 'none';

const onFormSubmit = async event => {
  try {
    event.preventDefault();
    galleryContainer.innerHTML = '';
    loader.style.display = 'block';

    query = event.currentTarget.elements.user_query.value.trim();

    if (query === '') {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search query!',
      });
      return;
    }

    page = 1;
    loadMoreBtn.classList.add('is-hidden');

    const { data } = await fetchPhotos(query, page);

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

    lightbox = new SimpleLightbox('.gallery-item', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();

    formEl.reset();

    if (data.totalHits > 1) {
      loadMoreBtn.classList.remove('is-hidden');

      loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = 'none';
  }
};

formEl.addEventListener('submit', onFormSubmit);

const onLoadMoreBtnClick = async event => {
  loader.style.display = 'block';
  page++;

  try {
    const { data } = await fetchPhotos(query, page);
    loader.style.display = 'none';

    const markup = renderPhotoCards(data.hits);
    galleryContainer.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();

    if (page * 16 >= data.totalHits) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreBtn.classList.add('is-hidden');
      loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again later.',
    });
  }
};

const smoothScroll = () => {
  const { height: cardHeight } = galleryContainer.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};