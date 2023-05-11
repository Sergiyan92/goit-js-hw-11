import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { getData } from './appi';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let searchQuery = '';
let page = 1;
const Form = document.querySelector('#search-form');
const input = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const btnSubmit = document.querySelector('.submit');
const btnLoadMore = document.querySelector('.load-more');

btnLoadMore.addEventListener('click', handleLoadMore);
async function handleLoadMore() {
  page += 1;
  const data = await getData(searchQuery, page);
  createCard(data);
  // if (page * 40 >= res.totalHits) {
  //   Notify.info(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  // }
}
const Lightbox = new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionsData: 250,
});

Form.addEventListener('submit', async e => {
  e.preventDefault();
  searchQuery = input.value.trim();
  if (!searchQuery) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  const data = await getData(input.value);
  page = 1;
  createCard(data);
});

const createCard = data => {
  const li = data
    .map(
      card =>
        `<a class="gallery__link" href="${card.largeImageURL}" >
        <div class="photo-card">
           <img  class='gallery__image' src=${card.webformatURL} alt=${card.tags} title=${card.tags} loading="lazy" width='250' height = '150' />
             <div class="info">
            <p class="info-item">
               <b>Likes <span>${card.likes}</span></b>
            </p>
             <p class="info-item">
                 <b>Views <span>${card.views}</span></b>
             </p>
            <p class="info-item">
                 <b>Comments <span>${card.comments}</span></b>
            </p>
             <p class="info-item">
                 <b>Downloads <span>${card.downloads}</span> </b>
             </p>
          </div>
        </div>
     </a>

    `
    )
    .join('');
  if (page > 1) {
    gallery.insertAdjacentHTML('beforeend', li);
  } else {
    gallery.innerHTML = li;
  }
  Lightbox.refresh();
};
