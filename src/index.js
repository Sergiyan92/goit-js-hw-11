import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { getData } from './appi';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const Form = document.querySelector('#search-form');
const input = document.querySelector('[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const btnSubmit = document.querySelector('.submit');
const btnLoadMore = document.querySelector('.load-more');
btnLoadMore.addEventListener('click', handleLoadMore);
function handleLoadMore() {
  page += 1;
  getData(input.value, { page });
}
const Lightbox = new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionsData: 250,
});

Form.addEventListener('submit', async e => {
  e.preventDefault();
  const searchQuery = input.value.trim();
  if (!searchQuery) return;
  const data = await getData(input.value);

  createCard(data);
});

const createCard = data => {
  const li = data
    .map(
      card =>
        `<a class="gallery__link" href="${card.largeImageURL}" >
        <div class="photo-card">
           <img  class='gallery__image' src=${card.webformatURL} alt=${card.tags} title=${card.tags} loading="lazy" width='250' height = '100' />
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

  gallery.innerHTML = li;
  Lightbox.refresh();
};
