import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const btnLoadMore = document.querySelector('.load-more');
const API_KEY = '36214918-c54bf3212caa76f3a1fc6176b';
let page = 1;
const pixabayAPI = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  },
});
const axios = require('axios');

export async function getData(searchQuery) {
  try {
    const { data } = await pixabayAPI.get('', {
      params: { q: searchQuery, page },
    });

    if (data.hits.length === 0) {
      btnLoadMore.style.display = 'none';
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return [];
    }
    if (data.hits.length === 40) {
      btnLoadMore.style.display = 'flex';
    }
    return data.hits;
  } catch (error) {
    console.log(error);
  }
}
btnLoadMore.addEventListener('click', handleLoadMore);

function handleLoadMore() {
  page += 1;
  async function getData(searchQuery) {
    const { data } = await pixabayAPI.get('', {
      params: { q: searchQuery, page },
    });
  }
}
